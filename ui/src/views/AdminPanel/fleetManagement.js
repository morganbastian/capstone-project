import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { MenuItem, Select } from '@mui/base'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useState, useEffect } from 'react'
import { getAllBoats, updateBoat } from '../../utility/api'
import { parseISO } from 'date-fns'

function FleetManagement(props) {
	const [boats, setBoats] = useState()
	const [selectedBoat, setSelectedBoat] = useState({})
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
			id: selectedBoat.id,
			name: selectedBoat.name,
			capacity: selectedBoat.capacity,
			serviceDate: newDate.toISOString(),
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
			
				<select onChange={(e) => setSelectedBoat(boats[e.target.value])}>
      {boats.map((boat, index) => (
        <option value={index} key={boat.id}>
          {boat.name}
        </option>
      ))}
    </select>
			<br></br>
			<br></br>
			<Typography variant='h6'>{selectedBoat.name}</Typography>
			<Typography variant='h6'>
				Last serviced: {selectedBoat.serviceDate}
			</Typography>
			<Typography variant='h6'>
				Service due on: {selectedBoat.serviceDate}
			</Typography>
			<Typography variant='h6'>
				Service notes: {selectedBoat.serviceNotes}
			</Typography>
			<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<Typography variant='h6'>Update service info:</Typography>
					<DatePicker
						label='Serviced on'
						value={parseISO(newDate)}
						onChange={(newDate) => setNewDate(newDate)}
					/>
					{console.log('newDate:', newDate)}
				</LocalizationProvider>
				<TextField
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