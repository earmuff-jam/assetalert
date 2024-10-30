import { lightTheme } from '../../util/Theme';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Provider } from 'react-redux';
import { store } from '../../Store';
import NotesList from '../../features/Notes/NotesList';

export default {
  title: 'Notes/NotesList',
  component: NotesList,
  decorators: [
    withRouter,
    (Story) => (
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={lightTheme}>
            <Story />
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    ),
  ],
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
