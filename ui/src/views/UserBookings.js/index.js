import { useEffect, useState, useCallback } from "react";
import { getMe, getBookingByUserId, deleteUserBooking } from "../../utility/api";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

function UserBookings(props) {
  const [booking, setBooking] = useState();
  const [idsToDelete, setIdsToDelete] = useState();

  const columns = [
    { field: "id", headerName: "Booking ID", width: 200, editable: false },
    { field: "boatId", headerName: "Boat", width: 200, editable: false },
    { field: "date", headerName: "Date", width: 200,editable: false},
    { field: "time", headerName: "Time", width: 200, editable: false },
    { field: "passengers", headerName: "passengers", width: 200, editable: false },
    
  ];

  const rows = booking;

  useEffect(() => {
    const getUserBookingData= async () => {
        const userData = await getMe();
        const userId = userData.id
        const bookingData = await getBookingByUserId(userId);
        console.log('booking data: ', bookingData)
      setBooking(bookingData);
    };
    getUserBookingData();
  }, []);

  const handleDeleteUserBookings = async () => {
  
    Promise.allSettled(idsToDelete.map(async (id) => {
      return await deleteUserBooking(id)
    }))
    .then(async () => {
      const userData = await getMe();
      const userId = userData.id
      const bookingData = await getBookingByUserId(userId);
      setBooking(bookingData);
    }); 
  };

//   const processRowUpdate = useCallback(async (updatedRow) => {
//     return await updateUserBookings(updatedRow);
//   }, []);

  if (!booking) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div style={{ height: 620, width: "100%" }}>
        {/* <Button
          sx={{ margin: "10px" }}
          variant="contained"
          onClick={handleDeleteUserBookings}
        >
          Delete Selected
        </Button> */}
        <DataGrid
          editMode="row"
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
        //   checkboxSelection
        //   processRowUpdate={processRowUpdate}
        //   onRowSelectionModelChange={(ids) => {
        //     setIdsToDelete(ids);
        //   }}
        />
      </div>
    </>
  );
}

export default UserBookings;