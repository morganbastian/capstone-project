import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useState, useEffect } from 'react'
import { getAllBoats, updateBoat } from '../../utility/api'
import { parseISO } from 'date-fns'

function FleetManagement(props) {
	const [boats, setBoats] = useState()
	const [selectedBoat, setSelectedBoat] = useState({})
	const [newDate, setNewDate] = useState(new Date())
	const [note, setNote] = useState('')

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
			id: selectedBoat.id,
			name: selectedBoat.name,
			capacity: selectedBoat.capacity,
			serviceDate: newDate,
			serviceNotes: note,
		}
		try {
			await updateBoat(updatedData)
			console.log('newboatdata:', updatedData)
		} catch (error) {
			console.log(error)
		}
	}
	if (!boats) {
		return <div>Loading...</div>
	}
	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<Typography
				align='center'
				component='h1'
				variant='h5'
				sx={{ paddingBottom: 3, paddingTop: 2 }}
			>
				Fleet Management
			</Typography>

			<FormControl fullWidth sx={{ marginBottom: 2 }}>
				<InputLabel id='boat-select-label'>Select Boat</InputLabel>
				<Select
					labelId='boat-select-label'
					value={selectedBoat ? boats.indexOf(selectedBoat) : ''}
					onChange={(e) => setSelectedBoat(boats[e.target.value])}
					label='Select Boat'
				>
					{boats.map((boat, index) => (
						<MenuItem value={index} key={boat.id}>
							{boat.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<br></br>
			<Typography variant='h6'>
				Boat: <strong>{selectedBoat.name}</strong>
			</Typography>
			<br></br>
			<Typography variant='h6'>
				Last serviced: <strong>{selectedBoat.serviceDate}</strong>
			</Typography>
			<br></br>
			<Typography variant='h6'>
				Service notes: <strong>{selectedBoat.serviceNotes}</strong>
			</Typography>
			<br></br>
			<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<LocalizationProvider
					dateAdapter={AdapterDateFns}
				>
					<Typography variant='h6'>Update service info:</Typography>
					<br></br>
					<DatePicker
						label='Serviced on'
						value={parseISO(newDate)}
						onChange={(newDate) => setNewDate(newDate)}
					/>
					{console.log('newDate:', newDate)}
				</LocalizationProvider>

				<TextField
					sx={{ paddingTop: 2 }}
					id='note'
					label='Service Notes'
					multiline
					rows={4}
					onChange={(e) => setNote(e.target.value)}
				/>
				{console.log('note: ', note)}
				<Button
					onSubmit={handleSubmit}
					type='submit'
					fullWidth
					variant='contained'
					sx={{ mt: 3, mb: 2 }}
				>
					submit
				</Button>
			</Box>
		</Container>
	)
}
export default FleetManagement
