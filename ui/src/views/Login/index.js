import { Grid, Typography} from "@mui/material";
import { login } from "../../utility/api";
import { setToken } from "../../utility/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [userData, setUserdata] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUserdata({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    try {
      const response = await login(userData);
      console.log(response.token);
      setToken(response.token);
      navigate("/");
      //submit users token to jwt utility
      //redirect user to success page

      window.location.reload() // temp fix to rerender navbar
    } catch (error) {
      setLoginError(error);
    }
  };

  const checkLoginError = () => {
    if (loginError) {
      return (
        <Typography color={"red"}>
          Please enter a valid username and password
        </Typography>
      );
    }
  };

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        padding={"20px"}
        sx={{ border: "solid black 2px" }}
      >
        <form onSubmit={handleSubmit}>
          <Grid item xs={8}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
              />
            </label>
          </Grid>
          <Grid item xs={8}>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            </label>
          </Grid>
          <input type="submit" value="Submit" />
        </form>
        <div>{checkLoginError()}</div>
      </Grid>
    </div>
  );
}

export default Login;