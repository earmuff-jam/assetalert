import { useSelector } from 'react-redux';
import RecentActivity from './RecentActivity';
import { ExpandMoreRounded } from '@mui/icons-material';

import EmptyComponent from '../../util/EmptyComponent';
import LoadingSkeleton from '../../util/LoadingSkeleton';
import TextComponent from '../TextFieldComponent/TextComponent';
import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
  colorVariant: {
    backgroundColor: theme.palette.secondary.main,
  },
  text: {
    fontSize: '0.925rem',
    overflowWrap: 'anywhere',
    marginTop: theme.spacing(1),
  },
}));

const RecentActivities = () => {
  const classes = useStyles();

  const { loading, recentActivities } = useSelector((state) => state.profile);

  if (loading) {
    return <LoadingSkeleton width={`calc(100% - 1rem)`} height={'20rem'} />;
  }
  if (recentActivities.length <= 0) {
    return <EmptyComponent shouldRedirect={true} path={'/'} subtitle="Create or volunteer for any event" />;
  } else {
    return (
      <Box className={classes.root}>
        {recentActivities.map((event, index) => (
          <Accordion key={index} elevation={0} className={classes.colorVariant}>
            <AccordionSummary expandIcon={<ExpandMoreRounded />}>
              <TextComponent value={event.title} loading={false} textStyle={classes.text} />
            </AccordionSummary>
            <AccordionDetails>
              <RecentActivity key={index} index={index} activity={event} />
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  }
};

export default RecentActivities;
