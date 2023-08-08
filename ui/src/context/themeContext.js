import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#233265',
      dark: '#a3d0e5',
    },
    secondary: {
      main: '#a4cae0',
    },
    background: {
      default: '#f3e9ca',
    },
  },
    typography: {
      fontFamily: 'Oswald',
    },
    
    
  }
)


const ThemeContextProvider = (props) => {
	const { children } = props

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	)
}

export default ThemeContextProvider
