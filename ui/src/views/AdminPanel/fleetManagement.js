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
import { getAllBoats, updateBoat } from '../../utility/api'
import { parseISO } from 'date-fns'


function FleetManagement(props) {
	const [boats, setBoats] = useState()
	// const [name, setName] = useState('')
	const [newDate, setNewDate] = useState()
	const [note, setNote] = useState('')
	// const [capacity, setCapacity] = useState()
	// const [id, setId] = useState()


	useEffect(() => {
		const getBoatData = async () => {
			const boatData = await getAllBoats()
			console.log('boat data:', boatData)
			setBoats(boatData)
		}
		getBoatData()
	}, [])
	const handleSubmit = async (event) => {
		const updatedData = {
			id: boats[0].id,
			name: boats[0].name,
			capacity: boats[0].capacity,
			serviceDate: newDate.toISOString(),
			serviceNotes:note
		}
		try {
			await updateBoat(updatedData);
			console.log('newboatdata:', updatedData)
			
		} catch (error) {
			console.log(error);
		}
	};
	if (!boats) {
    return <div>Loading...</div>;
  }
	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			{/* <Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					paddingBottom: 10,
				}}
			> */}
				<Typography component='h1' variant='h5'>
					Fleet Management
				</Typography>
				
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
					<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<Typography variant='h6'>Update service info:</Typography>
						<DatePicker
							label='Serviced on'
							value={parseISO(newDate)}
							onChange={(newDate) => setNewDate(newDate)}
						/>{console.log('newDate:' , newDate)}
					</LocalizationProvider>
					<TextField
						id='note'
						label='Service Notes'
						multiline
						rows={4}
						onChange={(e) => setNote(e.target.value)}
					/>{console.log('note: ', note)}
					<Button
						onSubmit={handleSubmit}
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
					>
						Register
					</Button>
				</Box>
			</Container>
	)
}
export default FleetManagement