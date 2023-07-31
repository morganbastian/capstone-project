import { useState, useEffect } from 'react'
import { Grid, Typography, Box, TextField, Button } from '@mui/material'
import { createNewBooking } from '../../utility/api'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { getMe } from '../../utility/api'
import { isUserLoggedIn } from '../../utility/utils'

function Booking(props) {
	const [boatId, setBoatId] = useState('')
	const [passengers, setPassengers] = useState('')
	const [date, setDate] = useState()
	const [time, setTime] = useState()
	const [user, setUser] = useState()

	useEffect(() => {
		if (isUserLoggedIn()) {
			const fetchData = async () => {
				const user = await getMe()
				setUser(user)
			}
			fetchData()
		}
	}, [])

	//Function Logic
	const handleSubmit = async (event) => {
		const bookingData = {
			boatId: boatId,
			userId: user.id,
			passengers: passengers,
			time: time.format('HH:mm:ss'),
			date: date.format('YYYY-MM-DD'),
			isCompleted: true,
		}
		console.log(bookingData)
		createNewBooking(bookingData)
	}
	if (!user) {
		return <>Loading..</>
	}
	return (
		<Box sx={{ width: '500', height: '300', padding: '20px' }}>
			<FormControl fullWidth>
				<InputLabel id='boat-label'>Choose Your Charter</InputLabel>
				<Select
					defaultValue=''
					labelId='boat-label'
					id='boatId'
					label='boatId'
					value={boatId}
					onChange={(e) => setBoatId(e.target.value)}
				>
					<MenuItem value={1}>Harbor Cruise</MenuItem>
					<MenuItem value={2}>Eco-Tour</MenuItem>
				</Select>
			</FormControl>
			<br></br>
			<br></br>
			<FormControl fullWidth>
				<InputLabel id='passengers-label'>How many passengers?</InputLabel>
				<Select
					labelId='passengers-label'
					id='passengers'
					label='passengers'
					value={passengers}
					onChange={(e) => setPassengers(e.target.value)}
				>
					<MenuItem value={1}>1</MenuItem>
					<MenuItem value={2}>2</MenuItem>
					<MenuItem value={3}>3</MenuItem>
					<MenuItem value={4}>4</MenuItem>
					<MenuItem value={5}>5</MenuItem>
					<MenuItem value={6}>6</MenuItem>
				</Select>
			</FormControl>
			<br></br>
			<br></br>
			<LocalizationProvider dateAdapter={AdapterMoment}>
				<DemoContainer components={['DatePicker', 'TimePicker']}>
					<DatePicker value={date} onChange={(event) => setDate(event)} />
					<TimePicker value={time} onChange={(event) => setTime(event)} />
				</DemoContainer>
			</LocalizationProvider>
			<br></br>
			<br></br>
			<Button variant='contained' type='submit' onClick={() => handleSubmit()}>
				Submit
			</Button>
		</Box>
	)
}

export default Booking
