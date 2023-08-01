import { useEffect, useState, useCallback } from "react";
import { getAllBookings, deleteBooking, updateBooking} from "../../utility/api";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

function AdminPanel(props) {
  const [bookings, setBookings] = useState();
  const [idsToDelete, setIdsToDelete] = useState();

  const columns = [
    { field: "id", headerName: "ID", width: 70, editable: true },
    {field: "userId", headerName: "UserId", width: 130, editable: true,},
    { field: "boatId", headerName: "Boat", width: 130, editable: true },
    { field: "date", headerName: "Date", width: 130, editable: true },
    { field: "time", headerName: "Time", width: 130, editable: true },
    { field: "passengers", headerName: "Passengers", width: 130, editable: true },
  ];

  const rows = bookings;

  useEffect(() => {
    const getAllBookingData = async () => {
      const bookingData = await getAllBookings();
      setBookings(bookingData);
    };
    getAllBookingData();
  }, []);

  const handleDeleteBooking = async () => {
    
    Promise.allSettled(idsToDelete.map(async (id) => {
      return await deleteBooking(id)
    }))
    .then(async () => {
      const bookingData = await getAllBookings();
      setBookings(bookingData);
    });  
  };

  const processRowUpdate = useCallback(async (updatedRow) => {
    return await updateBooking(updatedRow);
  }, []);

  if (!bookings) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div style={{ height: 620, width: "100%" }}>
        <Button
          sx={{ margin: "10px" }}
          variant="contained"
          onClick={handleDeleteBooking}
        >
          Delete Selected
        </Button>
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
          checkboxSelection
          processRowUpdate={processRowUpdate}
          onRowSelectionModelChange={(ids) => {
            setIdsToDelete(ids);
          }}
        />
      </div>
    </>
  );
}

export default AdminPanel;