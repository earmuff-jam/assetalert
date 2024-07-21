import { store } from './Store';
import { Provider } from 'react-redux';
import { primary_theme } from './util/Theme';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/styles';
import ApplicationValidator from './ApplicationValidator';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={primary_theme}>
    <Provider store={store}>
      <ApplicationValidator />
    </Provider>
  </ThemeProvider>
);
