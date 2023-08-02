import { useEffect, useState } from 'react'
import { getAllTimeslots } from '../../utility/api'
import { AppointmentPicker } from 'react-appointment-picker'
import { DayPicker } from 'react-day-picker'
import { getDay, format } from 'date-fns'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Grid } from '@mui/material'
import { Box } from '@mui/system'

function Calendar() {
	const [loading, setLoading] = useState(false)
	const [date, setDate] = useState(new Date(new Date().setHours(8, 0, 0, 0)))
  const [appointment, setAppointment] = useState('')

	// const handleDateSelect = (date) => {
	// 	setDate(date)
	// }
	useEffect(() => {
		if (date != null) {
			console.log('getting appointments')
			const days = [
				[
					,
					null,
					null,
					{
						id: 1,
						number: 1,
					},
					{
						id: 2,
						number: 2,
					},
				],
			]

			setAppointment(
				<AppointmentPicker
					addAppointmentCallback={addAppointmentCallbackContinuousCase}
					removeAppointmentCallback={removeAppointmentCallbackContinuousCase}
					initialDay={date}
					days={days}
					maxReservableAppointments={1}
					visible
					selectedByDefault
					unitTime={10800000}
					loading={loading}
					continuous
				/>
			)
		}
	}, [date, loading])

	// useEffect(() => {
	//   console.log(appointments)
	//   if (appointments.length > 0) {
	//     setDays(appointments)
	//   }
	// }, [appointments])

	async function addAppointmentCallbackContinuousCase({
		addedAppointment: { day, number, time, id },
		addCb,
		removedAppointment: params,
		removeCb,
	}) {
		setLoading(true)
		if (removeCb) {
			//await removeAppointment({ params });
			console.log(
				`Removed appointment ${params.number}, day ${params.day}, time ${params.time}, id ${params.id}`
			)
			removeCb(params.day, params.number)
		}

		//await addAppointment({ id, number, day, time });
		//console.log(error);
		addCb(day, number, time, id)
		setLoading(false)
	}

	async function removeAppointmentCallbackContinuousCase(
		{ day, number, time, id },
		removeCb
	) {
		setLoading(true)
		let params = { id, number, day, time }
		//await removeAppointment({ params });
		console.log(
			`Removed appointment ${number}, day ${day}, time ${time}, id ${id}`
		)
		removeCb(day, number)
		setLoading(false)
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DateCalendar
				disablePast={true}
				value={date}
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
						{appointment}
					</Grid>
				</Grid>
			</Box>
		</LocalizationProvider>
		// <Box>
		// 	<DayPicker
		//   mode="single"
		//   selected={date}
		//   onSelect={handleDateSelect}
		//   />
		//   <div>{appointment}</div>
		// </Box>
	)
}

export default Calendar
