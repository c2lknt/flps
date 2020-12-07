import React from 'react';
import languages from './data/langs.json'
import './App.css'
import pyCodes from './data/py_codes.json'
import ResponsiveDrawer from './components/sidebar'

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
function App() {
  return (
  <div>
    <ResponsiveDrawer codes={pyCodes} langs={languages} />
  </div>
  );
}
 export default App