import NotesList from '../../features/Notes/NotesList';

export default {
  title: 'Notes/NotesList',
  component: NotesList,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const EmptyListNoteMode = {
  args: {},
};
