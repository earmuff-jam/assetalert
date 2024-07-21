import { Box } from '@mui/material';
import { WarningRounded } from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles';
import TextComponent from '../TextFieldComponent/TextComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20rem',
    minHeight: '20rem',
  },
  subtitle: {
    fontSize: '0.925rem',
    fontWeight: 'lighter',
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  icon: {
    color: theme.palette.primary.main,
  },
}));

const EmptyNotificationCard = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box>
        <WarningRounded className={classes.icon} />
      </Box>
      <TextComponent gutterBottom={false} loading={false} textStyle={classes.subtitle} value={'No new notifications'} />
    </Box>
  );
};

export default EmptyNotificationCard;
