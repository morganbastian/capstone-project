import { Grid, Typography } from '@mui/material'
import { register } from '../../utility/api'
import { setToken } from '../../utility/utils'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register(props) {
	const [userData, setUserdata] = useState({
		username: '',

		email: '',
		password: '',
	})
	const [validationErrorArray, setValidationErrorArray] = useState([])
	const navigate = useNavigate()

	const handleChange = (event) => {
		setUserdata({ ...userData, [event.target.name]: event.target.value })
	}

	const validateInput = () => {
		//check email is valid using regex
		const validationArray = []
		const validEmailRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		if (userData.username.length < 3) {
			const errorMsg = 'Please enter a username with more than 3 characters'
			validationArray.push(errorMsg)
		}
		//check password meets requirments
		if (userData.password.length === 0) {
			const errorMsg = 'Password must contain at least 8 Characters'
			validationArray.push(errorMsg)
		}
		//check email is valid using regex
		if (!userData.email.match(validEmailRegex)) {
			const errorMsg = 'Please enter valid email'
			validationArray.push(errorMsg)
		}
		if (validationArray.length > 0) {
			setValidationErrorArray(validationArray)
			return false
		} else {
			return true
		}
	}

	const handleSubmit = async (event) => {
		// prevents the submit button from refreshing the page
		event.preventDefault()
		setValidationErrorArray([])
		let validatedInput = validateInput()
		if (validatedInput === true) {
			try {
				const response = await register(userData)
				//submit users token to jwt utility
				console.log(response.token)
				setToken(response.token)
				//redirect user to success page
			} catch (error) {
				console.log(error)
			}
			//if api post works, redirect to success page
			navigate('/register/success')
		}
	}

	return (
		<div>
			<Grid
				container
				spacing={0}
				direction='column'
				alignItems='center'
				justifyContent='center'
				padding={'20px'}
				sx={{ border: 'solid black 2px' }}
			>
				<form onSubmit={handleSubmit}>
					<Grid item xs={8}>
						<label>
							Username:
							<input
								type='text'
								name='username'
								value={userData.username}
								onChange={handleChange}
							/>
						</label>
					</Grid>
					<Grid item xs={8}>
						<label>
							Email:
							<input
								type='text'
								name='email'
								value={userData.email}
								onChange={handleChange}
							/>
						</label>
					</Grid>
					<Grid item xs={8}>
						<label>
							Password:
							<input
								type='password'
								name='password'
								value={userData.password}
								onChange={handleChange}
							/>
						</label>
					</Grid>
					<input type='submit' value='Register' />
				</form>
				<Grid item xs={8}>
					{validationErrorArray.map((e) => {
						return <Typography color={'red'}>{e}</Typography>
					})}
				</Grid>
			</Grid>
		</div>
	)
}

export default Register
