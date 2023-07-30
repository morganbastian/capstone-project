import { useState, useEffect, useRef, useMemo } from 'react'
import { Grid, Typography, Box, TextField, Button } from '@mui/material'
import { createNewBooking } from '../../utility/api'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { debounce } from '@mui/material/utils'
import { getToken } from '../../utility/utils'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { getMe } from '../../utility/api'
import { isUserLoggedIn } from '../../utility/utils'
import { getAllBoats } from '../../utility/api'

function Booking(props) {

	const [boatId, setBoatId] = useState({})
	const [isCompleted, setIsCompleted] = useState()
	const [passengers, setPassengers] = useState()
	const [date, setDate] = useState()
	const [time, setTime] = useState()
  const [user, setUser] = useState();
	const [value, setValue] = useState(null)
	const [inputValue, setInputValue] = useState('')
	const [options, setOptions] = useState([])
	const loaded = useRef(false)

  useEffect(() => {
    if (isUserLoggedIn()) {
      const fetchData = async () => {
        const user = await getMe();
        setUser(user);
      };
      fetchData();
    }
  }, []);

  // useEffect(() => {
  //   const getBoats = async () => {
  //     const boats = await getAllBoats();
  //     setBoatId(boats);
  //     return boats;
  //   };
  //   getBoats();
  // }, []);
 

	//Function Logic
	const handleSubmit = async (event) => {
  const boatId = await getAllBoats();
		const bookingData = {
			boatId: boatId.id,
			userId: user.id,
			passengers: passengers,
			time: time,
			date: date,
			isCompleted: isCompleted,
		}
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
					labelId='boat-label'
					id='boatId'
					label='boatId s'
					onChange={(e) => setBoatId(e.target.value)}
				>
					<MenuItem value={(boatId.id)}>Harbor Cruise</MenuItem>
					<MenuItem value={(boatId.id)}>Eco-Tour</MenuItem>
				</Select>
			</FormControl>
			<br></br>
			<br></br>
			<FormControl fullWidth>
				<InputLabel id='time-label'>Choose your time slot</InputLabel>
				<Select
					labelId='time-label'
					id='time'
					label='time'
					onChange={(e) => setTime(e.target.value)}
				>
					<MenuItem value={(time)}>1:00PM-4:00PM</MenuItem>
					<MenuItem value={(time)}>5:00PM-8:00PM</MenuItem>
				</Select>
			</FormControl>
			<br></br>
			<br></br>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DemoContainer components={['DateTimePicker']}>
					<DateTimePicker
						label='Basic date time picker'
						onChange={(event) => setDate(event)}
					/>
				</DemoContainer>
			</LocalizationProvider>
			<br></br>
			<Button variant='contained' type='submit' onClick={() => handleSubmit()}>
				Submit
			</Button>
		</Box>
	)
}

export default Booking
