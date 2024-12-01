import AddNoteLocationPicker from '@features/Notes/AddNote/AddNoteLocationPicker';
import { Stack } from '@mui/material';

export default {
  title: 'Notes/AddNoteLocationPicker',
  component: AddNoteLocationPicker,
  tags: ['autodocs'],
};

const Template = (args) => (
  <Stack>
    <AddNoteLocationPicker {...args} />
  </Stack>
);

export const AddNoteLocationPickerDefault = Template.bind({});
export const AddNoteLocationPickerEditMode = Template.bind({});
export const AddNoteLocationPickerLongSubtitle = Template.bind({});

AddNoteLocationPickerDefault.args = {
  subtitle: 'Lorem Ipsum is simply dummy text.',
  location: {
    lat: 42.1268992,
    lon: -107.3602816,
  },
  setLocation: () => {},
  editMode: false,
  displayLocationPicker: true,
};

AddNoteLocationPickerLongSubtitle.args = {
  subtitle:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  location: {
    lat: 42.1268992,
    lon: -107.3602816,
  },
  setLocation: () => {},
  editMode: false,
  displayLocationPicker: true,
};

AddNoteLocationPickerEditMode.args = {
  subtitle: 'Click anywhere on the map to set the new location',
  location: {
    lat: 42.1268992,
    lon: -107.3602816,
  },
  setLocation: () => {},
  editMode: true,
  displayLocationPicker: true,
};
