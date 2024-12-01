import Note from '@features/Notes/Note/Note';

export default {
  title: 'Notes/Note',
  component: Note,
  tags: ['autodocs'],
};

export const NoteDefault = {
  args: {
    notes: [
      {
        noteID: '9be9dc52-7c8a-43da-b28e-ff17d88b6478',
        title: 'Buy kitty litter for four of my kittens',
        description: 'Do not buy the brand from walmart, buy from a generic well known place',
        status: '80d99cd2-b3d5-480f-9108-8bbc6e3f12d0',
        status_name: 'draft',
        status_description: 'items under this bucket are in draft state',
        color: '#2a6dbc',
        location: {
          lat: 42.203217,
          lon: -72.625481,
        },
        created_at: '2024-11-29T13:19:16.748084Z',
        created_by: 'fa956520-fc6c-4783-acc6-4ba743fae9dc',
        creator: 'John Doe',
        updated_at: '2024-11-29T13:19:16.748084Z',
        updated_by: 'fa956520-fc6c-4783-acc6-4ba743fae9dc',
        updator: 'John Doe',
        sharable_groups: null,
      },
    ],
    loading: false,
    setEditMode: () => {},
    setSelectedNoteID: () => {},
  },
};

export const NoteEmpty = {
  args: {
    notes: [],
    loading: false,
    setEditMode: () => {},
    setSelectedNoteID: () => {},
  },
};

export const NoteLoading = {
  args: {
    notes: [],
    loading: true,
    setEditMode: () => {},
    setSelectedNoteID: () => {},
  },
};
