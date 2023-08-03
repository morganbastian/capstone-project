import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { login } from '../../utility/api'
import { setToken } from '../../utility/utils'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login(props) {
	const [userData, setUserdata] = useState({
		username: '',
		password: '',
	})
	const [loginError, setLoginError] = useState()
	const navigate = useNavigate()

	const handleChange = (event) => {
		setUserdata({ ...userData, [event.target.name]: event.target.value })
	}

	const handleSubmit = async (event) => {
		// prevents the submit button from refreshing the page
		event.preventDefault()
		try {
			const response = await login(userData)
			console.log(response.token)
			setToken(response.token)
			navigate('/')
			//submit users token to jwt utility
			//redirect user to success page

			window.location.reload() // temp fix to rerender navbar
		} catch (error) {
			setLoginError(error)
		}
	}

	const checkLoginError = () => {
		if (loginError) {
			return (
				<Typography color={'red'}>
					Please enter a valid username and password
				</Typography>
			)
		}
	}

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					paddingBottom: 10,
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Login
				</Typography>
				<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin='normal'
						required
						fullWidth
						id='username'
						label='Username'
						name='username'
						value={userData.username}
						onChange={handleChange}
						autoFocus
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						onChange={handleChange}
						value={userData.password}
					/>

					<Button
						onSubmit={handleSubmit}
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
					>
						Login
					</Button>
					<Grid container>
						<Grid item>
							<Link to='/register' variant='body2'>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<div>{checkLoginError()}</div>
		</Container>
	)
}


export default Login
