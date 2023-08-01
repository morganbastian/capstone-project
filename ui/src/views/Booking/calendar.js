import { useEffect, useState } from 'react'
import { AppointmentPicker } from 'react-appointment-picker'
import { DayPicker } from 'react-day-picker'
import { getDay, format } from 'date-fns'
import { Box } from '@mui/system'

function Calendar() {
	const [loading, setLoading] = useState(false)
	const [date, setDate] = useState(new Date(new Date().setHours(8, 0, 0, 0)))
	const [days, setDays] = useState([[]])
	const [appointment, setAppointment] = useState('')

	const modifiers = {
		disabled: (date) => getDay(date) < date, //disable previous dates
	}

	useEffect(() => {
		if (date != null) {
			console.log('getting appointments')
			const days = [
				[
					{
						id: 1,
						number: 1,
						isReserved: true,
					},
					{
						id: 2,
						number: 2,
						isReserved: true,
					},
					{
						id: 3,
						number: 3,
					},
					{
						id: 4,
						number: 4,
						isSelected: true,
					},
					{
						id: 5,
						number: 5,
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
					unitTime={3600000}
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
		<Box>
			<DayPicker date={date} onDateChange={setDate} modifiers={modifiers} />
			<div>{appointment}</div>
		</Box>
	)
}

export default Calendar
