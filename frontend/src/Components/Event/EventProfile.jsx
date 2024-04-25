import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import EditImageComponent from './EditImageComponent';
import { Avatar, Box, makeStyles } from '@material-ui/core';
import { eventActions } from '../../Containers/Event/eventSlice';
import { CardMembershipRounded, GroupRounded } from '@material-ui/icons';
import CardTitleComponent from '../CardTitleComponent/CardTitleComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1.2rem',
    textOverflow: 'ellipsis',
    textWrap: 'wrap',
    width: `calc(100% - 40rem)`,
    [theme.breakpoints.down('sm')]: {
      width: `26rem`,
    },
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  gutterBottom: {
    marginBottom: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

const EventProfile = ({ userDetail, isLoading }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [editImage, setEditImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const toggleEditImage = () => {
    setEditImage(!editImage);
    const input = document.querySelector('input[type="file"]');
    if (input) {
      input.value = ''; // Reset the value of the input to clear the selected file (if possible)
    }
  };

  const handleSubmitImage = async (id) => {
    dispatch(eventActions.updateEventImage({ selectedImage: uploadedImage, eventID: id }));
    toggleEditImage();
    setEditImage(!editImage);
  };

  useEffect(() => {
    setSelectedImage(userDetail?.imageUrl);
  }, [userDetail?.imageUrl]);

  return (
    <Box className={classes.root}>
      <Box className={classNames(classes.rowContainer, classes.gutterBottom)}>
        {editImage ? (
          <EditImageComponent
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            toggleEditImage={toggleEditImage}
            submit={handleSubmitImage}
            id={userDetail.id}
          />
        ) : (
          <Avatar
            data-tour="0"
            alt="event avatar"
            src={(selectedImage && `data:image/png;base64,${selectedImage}`) || 'blank_canvas.png'}
            className={classes.avatar}
            onClick={toggleEditImage}
          />
        )}
      </Box>
      <CardTitleComponent
        firstIcon={<CardMembershipRounded />}
        firstLabel={`${userDetail?.sharable_groups.length || 0}`}
        firstToolTipLabel={'Current members'}
        secondIcon={<GroupRounded />}
        secondLabel={` ${userDetail?.attendees.length || 0}`}
        secondTooltipLabel={'Anticipated members'}
        titleText={userDetail?.title || ''}
        titleTooltip={userDetail?.title || ''}
        extraSubtitle={userDetail?.description || 'Edit event details to add description'}
        isLoading={isLoading}
      />
    </Box>
  );
};

EventProfile.defaultProps = {
  userDetail: {},
  isLoading: true,
};

EventProfile.propTypes = {
  userDetail: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default EventProfile;
