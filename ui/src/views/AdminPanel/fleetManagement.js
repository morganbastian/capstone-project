import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useState, useEffect } from 'react'
import { getAllBoats } from '../../utility/api'

function FleetManagement(props) {
	const [boats, setBoats] = useState()
	const [newDate, setNewDate] = useState('')
	const [note, setNote] = useState('')

	useEffect(() => {
		const getBoatData = async () => {
			const boatData = await getAllBoats()
			console.log('boat data:', boatData)
			setBoats(boatData)
		}
		getBoatData()
	}, [])

	if (!boats) {
    return <div>Loading...</div>;
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
				<Typography component='h1' variant='h5'>
					Fleet Management
				</Typography>
				{/* <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
				<Box component='form' noValidate sx={{ mt: 1 }}>
					<Typography variant='h6'>{boats[0].name}</Typography>
					<Typography variant='h6'>
						Last serviced: {boats[0].serviceDate}
					</Typography>
					<Typography variant='h6'>
						Service due on: {boats[0].serviceDate}
					</Typography>
					<Typography variant='h6'>
						Service notes: {boats[0].serviceNotes}
					</Typography>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<Typography variant='h6'>Update service info:</Typography>
						<DatePicker
							label='Serviced on'
							value={newDate}
							onChange={(newDate) => setNewDate(newDate)}
						/>
					</LocalizationProvider>
					<TextField
						id='outlined-multiline-static'
						label='Service Notes'
						multiline
						rows={4}
						onChange={(e) => setNote(e.target.value)}
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
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					paddingBottom: 10,
				}}
			>
				{/* <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
				<Box component='form' noValidate sx={{ mt: 1 }}>
					{console.log(boats)}
					<Typography variant='h6'>{boats[1].name}</Typography>
					<Typography variant='h6'>
						Last serviced: {boats[1].serviceDate}
					</Typography>
					<Typography variant='h6'>
						Service due on: {boats[1].serviceDate}
					</Typography>
					<Typography variant='h6'>
						Service notes: {boats[1].serviceNotes}
					</Typography>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<Typography variant='h6'>Update service info:</Typography>
						<DatePicker
							label='Serviced on'
							value={newDate}
							onChange={(newDate) => setNewDate(newDate)}
						/>
					</LocalizationProvider>
					<TextField
						id='outlined-multiline-static'
						label='Service Notes'
						multiline
						rows={4}
						onChange={(e) => setNote(e.target.value)}
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
