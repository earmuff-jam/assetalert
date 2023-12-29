import { Avatar, Box, Button, Input, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  spanContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1),
    gap: theme.spacing(2),
  },
  editContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  btn: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: theme.spacing(1.2),
  },
}));

const EditProfileImage = ({
  selectedImage,
  setSelectedImage,
  uploadedImage,
  setUploadedImage,
  toggleEditImage,
  submit,
  profileDetails,
}) => {
  const classes = useStyles();
  return (
    <Box>
      {selectedImage && (
        <div>
          <Avatar
            alt="not found"
            className={classes.avatar}
            src={selectedImage && `data:image/png;base64,${selectedImage}`}
          />
        </div>
      )}
      <form className={classes.editContainer}>
        <Input
          type="file"
          onChange={(event) => {
            const file = event.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                setSelectedImage(base64String);
              };
              reader.readAsDataURL(file);
            }
            setUploadedImage(file);
          }}
        />
      </form>
      <div className={classes.spanContainer}>
        <Button className={classes.btn} onClick={toggleEditImage}>
          Back
        </Button>
        <Button
          className={classes.btn}
          disabled={!uploadedImage}
          onClick={() => {
            submit(profileDetails.id);
          }}
        >
          Upload
        </Button>
      </div>
    </Box>
  );
};

export default EditProfileImage;
