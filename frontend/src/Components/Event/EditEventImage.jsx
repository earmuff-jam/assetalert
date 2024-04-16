import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Button, Input } from '@material-ui/core';
import UploadData from '../DrawerListComponent/UploadData';

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
  buttonContainer: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: theme.spacing(1.2),
  },
}));

const EditEventImage = ({
  selectedImage,
  setSelectedImage,
  uploadedImage,
  setUploadedImage,
  toggleEditImage,
  submit,
  eventID,
}) => {
  const classes = useStyles();

  const onChange = (event) => {
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
  };

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
      <UploadData
        buttonCancelText={'cancel'}
        cancelButtonStyles={classes.buttonContainer}
        disableCancelButton={false}
        buttonSubmitText={'upload'}
        submitButtonStyles={classes.buttonContainer}
        disableSubmitButton={!uploadedImage}
        onChange={onChange}
        onCancelClick={toggleEditImage}
        onSubmitClick={() => submit(eventID)}
      />
    </Box>
  );
};

EditEventImage.defaultProps = {
  selectedImage: '',
  setSelectedImage: () => {},
  uploadedImage: {},
  setUploadedImage: () => {},
  toggleEditImage: () => {},
  submit: () => {},
  eventID: '',
};

EditEventImage.propTypes = {
  selectedImage: PropTypes.string,
  setSelectedImage: PropTypes.func,
  uploadedImage: PropTypes.object,
  setUploadedImage: PropTypes.func,
  toggleEditImage: PropTypes.func,
  submit: PropTypes.func,
  eventID: PropTypes.string,
};

export default EditEventImage;
