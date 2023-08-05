import { useEffect, useState, useCallback } from 'react'
import { getAllBookings, deleteBooking, updateBooking } from '../../utility/api'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'

function AdminPanel(props) {
	const [bookings, setBookings] = useState()
	const [idsToDelete, setIdsToDelete] = useState()
	
	const columns = [
		{ field: 'id', headerName: 'ID', width: 70, editable: true },
		{ field: 'userId', headerName: 'UserId', width: 130, editable: true },
		{ field: 'boatId', headerName: 'Boat', width: 130, editable: true },
		{ field: 'date', headerName: 'Date', width: 130, editable: true },
		{ field: 'time', headerName: 'Time', width: 130, editable: true },
		{
			field: 'passengers',
			headerName: 'Passengers',
			width: 130,
			editable: true,
		},
	]

	const rows = bookings
	//get all booking data
	useEffect(() => {
		const getAllBookingData = async () => {
			const bookingData = await getAllBookings()
			setBookings(bookingData)
		}
		getAllBookingData()
	}, [])
	//deleting ids from page and in the backend
	const handleDeleteBooking = async () => {
		Promise.allSettled(
			idsToDelete.map(async (id) => {
				return await deleteBooking(id)
			})
		).then(async () => {
			const bookingData = await getAllBookings()
			setBookings(bookingData)
		})
	}
	//useCallBack to update the rows
	const processRowUpdate = useCallback(async (updatedRow) => {
		return await updateBooking(updatedRow)
	}, [])
	//if no booking data return the message loading
	if (!bookings) {
		return <div>Loading...</div>
	}
	return (
		<div style={{ height: '80%', width: '100%' }}>
			<Button
				sx={{ margin: '10px' }}
				variant='contained'
				onClick={handleDeleteBooking}
			>
				Delete Selected
			</Button>
			<Link to="/fleetmanagement">
			<Button
			sx={{ margin: '10px' }}
			variant='contained'>
				Fleet Management 
			</Button>
			</Link>
			<DataGrid
				editMode='row'
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 10 },
					},
				}}
				pageSizeOptions={[5, 10]}
				checkboxSelection
				processRowUpdate={processRowUpdate}
				onProcessRowUpdateError={(error) => console.log(error)}
				onRowSelectionModelChange={(ids) => {
					setIdsToDelete(ids)
				}}
			/>
		</div>
	)
}

export default AdminPanel
