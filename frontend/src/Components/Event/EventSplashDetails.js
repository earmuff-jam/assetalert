import React from 'react';
import { Avatar, Box, Button, Input, makeStyles } from '@material-ui/core';
import EventDetailsCard from './EventDetailsCard';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  editContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

const EventSplashDetails = ({
  editMode,
  eventID,
  handleRemove,
  handleSubmit,
  selectedImage,
  setSelectedImage,
  uploadedImage,
  setUploadedImage,
  toggleEditMode,
}) => {
  const classes = useStyles();

  return (
    <>
      {editMode ? (
        <Box>
          {selectedImage && (
            <div>
              <img alt="not found" width={'250px'} src={selectedImage && `data:image/png;base64,${selectedImage}`} />
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
            <Button onClick={handleRemove}>Remove</Button>

            <Button
              disabled={!uploadedImage}
              onClick={() => {
                handleSubmit(eventID);
              }}
            >
              Upload
            </Button>
          </form>
        </Box>
      ) : null}
    </>
  );
};

export default EventSplashDetails;
