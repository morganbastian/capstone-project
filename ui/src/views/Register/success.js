import { Alert} from '@mui/material'


function Success(props) {
  return (
    <Alert severity="success" variant="filled" >
      Registration Successful! Please Log In!
    </Alert>
  );
}

export default Success;
