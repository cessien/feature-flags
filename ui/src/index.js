import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { blue, red } from '@material-ui/core/colors';
import store from './redux/store';
import './index.css';
import App from './App';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#ffffff',
    },
    primary: {
      main: blue[500],
    },
    secondary: {
      main: red[500],
    }
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);
