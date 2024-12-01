import { Stack } from '@mui/material';
import AddNoteStatusOptions from '@features/Notes/AddNote/AddNoteStatusOptions';

export default {
  title: 'Notes/AddNoteStatusOptions',
  component: AddNoteStatusOptions,
  tags: ['autodocs'],
};

const Template = (args) => (
  <Stack>
    <AddNoteStatusOptions {...args} />
  </Stack>
);

export const AddNoteStatusOptionsDefault = Template.bind({});

AddNoteStatusOptionsDefault.args = {
  label: 'Selected Status Label',
  value: 'value',
  name: 'name',
  handleStatus: () => {},
};
