import { useState, useEffect } from 'react'
import { Grid, Box, Button, TextField, Typography } from '@mui/material'
import { createNewBooking } from '../../utility/api'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { AppointmentPicker } from 'react-appointment-picker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateCalendar } from '@mui/x-date-pickers'
import Alert from '@mui/material/Alert';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { getMe } from '../../utility/api'
import { isUserLoggedIn } from '../../utility/utils'

function Booking(props) {
	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState({ show: false, severity: '', message: '' });
	const [date, setDate] = useState(new Date(new Date().setHours(13, 0, 0, 0))) //starts appointments at 1:00PM
	const [days, setDays] = useState([
		[
			{
				id: 1,
				number: 1,
			},
			{
				id: 2,
				number: 2,
			},
		],
	])
	const [boatId, setBoatId] = useState('')
	const [passengers, setPassengers] = useState('')
	const [time, setTime] = useState()
	const [user, setUser] = useState()

	//fetch user
	useEffect(() => {
		if (isUserLoggedIn()) {
			const fetchData = async () => {
				const user = await getMe()
				setUser(user)
			}
			fetchData()
		}
	}, [])
	//useEffect for Appointment Picker
	useEffect(() => {
		if (date != null) {
			
			
		}
	}, [date, loading])
	async function addAppointmentCallbackContinuousCase({
		addedAppointment: { day, number, time, id },
		addCb,
	}) {
		setTime(time)
		setLoading(true)
		addCb(day, number, time, id)
		setLoading(false)
	}

	async function removeAppointmentCallbackContinuousCase(
		{ day, number, time, id },
		removeCb
	) {
		setLoading(true)
		removeCb(day, number, time, id)
		setLoading(false)
	}
	//Function Logic
	//submit data to the backend onClick with createNewBooking
	const handleSubmit = async (event) => {
		const bookingData = {
			boatId: boatId,
			userId: user.id,
			passengers: passengers,
			time: time,
			date: date,
			isCompleted: true,
		}
		try {
			const result = await createNewBooking(bookingData);
			console.log(bookingData)
			if (result && result.success) {
				setAlert({ show: true, severity: 'success',message: 'Your booking was successful!' });
			} else {
				setAlert({ show: true, severity: 'error', message: result ? result.error : 'An unexpected error occurred.' });
			}
		} catch (error) {
			setAlert({ show: true, severity: 'error', message: 'Please complete form before submitting.' });
		}
	};
	//if no user is found, a message will appear
	if (!user) {
		return  <Box
		display="flex"
		justifyContent="center"
		alignItems="center"
		minHeight="10px"
	>
		<Typography align='center'>Please Login to Book</Typography>
	</Box>
	}
	return (
		<Box sx={{ width: '500', height: '300', padding: '20px' }}>
			<FormControl fullWidth required>
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
			<FormControl fullWidth required>
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
			{/* calendar */}
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DateCalendar
					disablePast={true}
					value={date}
					required
					onChange={(date) => setDate(date)}
				/>
				<Box>
					<Grid
						container
						spacing={0}
						direction='column'
						alignItems='center'
						justifyContent='center'
						sx={{ minHeight: '20vh' }}
					>
						<Grid item xs={3}>
						<AppointmentPicker
					addAppointmentCallback={addAppointmentCallbackContinuousCase}
					removeAppointmentCallback={removeAppointmentCallbackContinuousCase}
					initialDay={date}
					days={days}
					maxReservableAppointments={1}
					visible
					selectedByDefault
					unitTime={14400800}
					loading={loading}
					continuous
				/>
						</Grid>
					</Grid>
				</Box>
			</LocalizationProvider>
			{alert.show && (
      <Alert severity={alert.severity}  onClose={() => setAlert({ ...alert, show: false })}>
        {alert.message}
      </Alert>
    )}
			<Grid
				container
				spacing={0}
				direction='column'
				alignItems='center'
				justifyContent='center'
				sx={{ minHeight: '15vh' }}
			>
				<Grid item xs={3}>
					<Button
						variant='contained'
						type='submit'
						onClick={() => handleSubmit()}
					>
						Submit
					</Button>
				</Grid>
			</Grid>
		</Box>
	)
}

export default Booking
