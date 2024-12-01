import NoteAccordionSummary from '@features/Notes/NoteAccordion/NoteAccordionSummary';

export default {
  title: 'Notes/NoteAccordionSummary',
  component: NoteAccordionSummary,
  tags: ['autodocs'],
};

export const NoteAccordionDefault = {
  args: {
    title: 'Recently Edited',
    totalNotes: 1,
    color: 'primary',
  },
};

export const NoteAccordionLastWeekCategory = {
  args: {
    title: 'Edited within last week',
    totalNotes: 20,
    color: 'secondary',
  },
};

export const NoteAccordionLastMonthAndBeyondCategory = {
  args: {
    title: 'Edited couple of months ago',
    totalNotes: 122,
    color: 'default',
  },
};
