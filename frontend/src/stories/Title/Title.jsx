import classNames from 'classnames';
import { EmojiPeopleRounded } from '@material-ui/icons';
import { Typography, makeStyles } from '@material-ui/core';
import Subtitle from '../Subtitle/Subtitle';

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: '1.2rem',
    fontWeight: 'lighter',
    marginBottom: theme.spacing(2),
  },
  header: {
    fontSize: '1.6rem',
    letterSpacing: '0.0125rem',
    fontFamily: 'Poppins, sans-serif',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  errorText: {
    color: theme.palette.error.dark,
  },
}));

const Title = () => {
  const classes = useStyles();

  return (
    <>
      <Typography className={classNames(classes.header, classes.errorText)}>Find meaning to volunteer</Typography>
      <Subtitle
        subtitle={'Sign up to be updated with events around your community. You can lend a hand, or even ask for one.'}
        showIcon={true}
        icon={<EmojiPeopleRounded />}
      />
    </>
  );
};

export default Title;
