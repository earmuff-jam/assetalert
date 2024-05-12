import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import { DonutLargeRounded, LibraryBooksRounded, TrackChangesRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: '0.975rem',
    letterSpacing: '0.0125rem',
    marginBottom: theme.spacing(2),
    fontFamily: 'Roboto',
  },
  container: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(3, 0),
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    letterSpacing: '0.0125rem',
    fontFamily: 'Poppins, sans-serif',
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
}));

const InviteSection = () => {
  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.container}>
      <Typography variant="h6" className={classes.header}>
        <LibraryBooksRounded />
        Learn what you can offer.
      </Typography>
      <ul>
        <Typography className={classes.text}>
          Contribute your skills and time to make a positive impact on your community. Track them and maintain
          inventories of items. Volunteer for local events, help those in need, and be a part of meaningful initiatives.
        </Typography>
        <Typography className={classes.text}>
          Keep track of your community engagement activities, volunteer hours, and contributions. Monitor your impact on
          the community and identify areas where you can further contribute or improve.
        </Typography>
      </ul>

      <Typography variant="h6" className={classes.header}>
        <TrackChangesRounded />
        Target inventory management.
      </Typography>
      <ul>
        <Typography className={classes.text}>
          Utilize our digital platform to trace and track your inventories effectively. Set up maintenance plans and
          threshold limits for inventory items to ensure smooth operations. Enjoy easy access to all your inventory
          items, enabling seamless management and optimization of resources.
        </Typography>
        <Typography className={classes.text}>
          Setup maintenance plans, threshold limits and enjoy easy access to all your inventory items.
        </Typography>
      </ul>

      <Typography variant="h6" className={classes.header}>
        <DonutLargeRounded />
        Visualize expense reports.
      </Typography>
      <ul>
        <Typography className={classes.text}>
          Visualize, analyze, and monitor spending habits with customizable graphs on demand. Log spending on events,
          projects, or initiatives, get approvals when necessary, and view comprehensive spending habits to make
          informed decisions and optimize resource allocation effectively.
        </Typography>
      </ul>
    </Paper>
  );
};

export default InviteSection;
