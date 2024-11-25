import { AccordionDetails } from '@mui/material';
import RecentActivity from "@/ActivityDetails/RecentActivity";

export default function ActivityAccordionDetails({ index, activity }) {
  return (
    <AccordionDetails>
      <RecentActivity key={index} index={index} activity={activity} />
    </AccordionDetails>
  );
}
