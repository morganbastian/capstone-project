import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useState, useEffect } from 'react'
import { getAllBoats } from "../../utility/api";

function FleetManagement(props) {
	const [boatData, setBoatData] = useState({
		username: '',
		email: '',
		password: '',
	})

  useEffect(() => {
    const getBoatData= async () => {
        const boatData = await getAllBoats();
        console.log ('boat data:', boatData)
        setBoatData(boatData);
    };
    getBoatData();
  }, []);


	

	
	

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
				<Typography component='h1' variant='h5'>
					Fleet Management
				</Typography>
				{/* <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
        <Box component='form' noValidate sx={{ mt: 1 }}>
          <Typography variant='h3'>
          
          </Typography>
					<TextField
						margin='normal'
						required
						fullWidth
						id='username'
						label='Username'
						name='username'
						// value={userData.username}
						// onChange={handleChange}
						autoFocus
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email'
						name='email'
						// value={userData.email}
						// onChange={handleChange}
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
						// onChange={handleChange}
						// value={userData.password}
					/>
					<Button
						// onSubmit={handleSubmit}
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
					>
						Register
					</Button>
				</Box>
			</Box>
		</Container>
	)
}

export default FleetManagement