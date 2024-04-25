import PropTypes from 'prop-types';
import { Avatar, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

const EditImageComponent = ({ selectedImage, setSelectedImage, setUploadedImage, toggleEditImage, submit, id }) => {
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
        buttonSubmitText={'submit'}
        cancelButtonStyles={classes.buttonContainer}
        disableCancelButton={false}
        submitButtonStyles={classes.buttonContainer}
        disableSubmitButton={false}
        onSubmitClick={() => submit(id)}
        onCancelClick={toggleEditImage}
        onChange={onChange}
      />
    </Box>
  );
};

EditImageComponent.defaultProps = {
  selectedImage: '',
  setSelectedImage: () => {},
  setUploadedImage: () => {},
  toggleEditImage: () => {},
  submit: () => {},
  id: '',
};

EditImageComponent.propTypes = {
  selectedImage: PropTypes.string,
  setSelectedImage: PropTypes.func,
  setUploadedImage: PropTypes.func,
  toggleEditImage: PropTypes.func,
  submit: PropTypes.func,
  id: PropTypes.string,
};

export default EditImageComponent;
