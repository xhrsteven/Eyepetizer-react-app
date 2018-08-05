import React from 'react'
import MainRouter from './MainRouter'
import {BrowserRouter} from 'react-router-dom'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'
import {indigo, orange} from 'material-ui/colors'
import { hot } from 'react-hot-loader'
import Paper from 'material-ui/Paper'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#6573c3",
      main: "#3f51b5",
      dark: "#2c387e",
      contrastText: "#fff"
  },
  secondary: {
    light: "##33bfff",
    main: "#00b0ff",
    dark: "#007bb2",
    contrastText: "#000"
  },
    typography: {
      // Use the system font over Roboto.
      fontFamily: 'Avenir Next, Roboto,"Helvetica Neue",Arial,sans-serif',
      htmlFontSize: 16,
    },
    openTitle: indigo['900'],
    protectedTitle: orange['700'],
    type: 'light'
  }
})

const styles = {
  paperContainer: {
    backgroundImage: `url(${"/client/assets/images/loginBackground.jpg"})`
  }
}
const App = () => (
  <BrowserRouter>
    
      <MuiThemeProvider theme={theme}>
        <MainRouter />
      </MuiThemeProvider>
    
  </BrowserRouter>
)

export default hot(module)(App)
