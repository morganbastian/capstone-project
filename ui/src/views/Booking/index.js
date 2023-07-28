import { useState, useEffect, useRef, useMemo } from "react";
import { Grid, Typography, Box, TextField, Button } from "@mui/material";
import {
  createNewReport,
} from "../../utility/api";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { debounce } from "@mui/material/utils";
import { getToken } from "../../utility/utils";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { getMe } from "../../utility/api";
import { isUserLoggedIn } from "../../utility/utils";

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };
//Create Text fields to Report Crime within
function Booking(props) {
  //Hold the users input data
  const [crimeTypeId, setCrimeTypeId] = useState({});
  const [addressData, setAddressData] = useState("");
  const [cityData, setCityData] = useState("");
  const [stateData, setStateData] = useState("");
  const [zipData, setZipData] = useState("");
  const [countyData, setCountyData] = useState("");
  const [details, setDetails] = useState("");
  const [ongoing, setOngoing] = useState();
  const [crimes, setCrimes] = useState();
  const [user, setUser] = useState();
  // const [lat, setLat] = useState();
  // const [lon, setLon] = useState();
  const [dateTime, setDateTime] = useState();

  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const loaded = useRef(false);

  const GOOGLE_MAPS_API_KEY = "AIzaSyBsezpIvmRg4k2fsrIqbm4DAVuKuHiP_ZY";

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const fetch = useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    []
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  //Get all crimes
  useEffect(() => {
    if (isUserLoggedIn()) {
      const fetchData = async () => {
        const user = await getMe();
        setUser(user);
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    const getCrimes = async () => {
      const crimes = await getAllCrimes();
      setCrimes(crimes);
      return crimes;
    };
    getCrimes();
  }, []);

  const handleAddressChange = (newValue) => {
    if (newValue) {
      const addressArray = newValue.description.split(",");
      setAddressData(addressArray[0]);
      setCityData(addressArray[1]);
      setStateData(addressArray[2]);
    }
  };

  //Function Logic
  const handleSubmit = async (event) => {
    const coords = await getCoordsByAddress(addressData, cityData, stateData);
    const county = await getCountyByCoords(coords.lat, coords.lon);
    const zipcode = await getZipByCoords(coords.lat, coords.lon);

    console.log(county);
    console.log(zipcode);

    const reportData = {
      address: addressData,
      zipcode: zipcode,
      city: cityData,
      county: county,
      state: stateData,
      userId: user.id,
      lat: coords.lat,
      lon: coords.lon,
      description: details,
      isOngoing: ongoing,
      crimeId: crimeTypeId,
      datetime: dateTime,
    };
    createNewReport(reportData);
  };
  if (!crimes) {
    return <>Loading Crimes...</>;
  }
  return (
    <Box sx={{ width: "500", height: "300", padding: "20px" }}>
      <div>
        <h1> Submit a Crime Tip </h1>
        <Autocomplete
          id="google-map-demo"
          sx={{ width: 300 }}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.description
          }
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          value={value}
          noOptionsText="No locations"
          onChange={(event, newValue) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setValue(newValue);
            handleAddressChange(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label={'Street Address'} fullWidth />
          )}
          renderOption={(props, option) => {
            const matches =
              option.structured_formatting.main_text_matched_substrings || [];

            const parts = parse(
              option.structured_formatting.main_text,
              matches.map((match) => [
                match.offset,
                match.offset + match.length,
              ])
            );

            return (
              <li {...props}>
                <Grid container alignItems="center">
                  <Grid item sx={{ display: "flex", width: 44 }}>
                    <LocationOnIcon sx={{ color: "text.secondary" }} />
                  </Grid>
                  <Grid
                    item
                    sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
                  >
                    {parts.map((part, index) => (
                      <Box
                        key={index}
                        component="span"
                        sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                      >
                        {part.text}
                      </Box>
                    ))}
                    <Typography variant="body2" color="text.secondary">
                      {option.structured_formatting.secondary_text}
                    </Typography>
                  </Grid>
                </Grid>
              </li>
            );
          }}
        />
        <TextField
          label="Description of Crime"
          onChange={(e) => setDetails(e.target.value)}
          value={details}
          id="description"
          name="additionalInformation"
          fullWidth
          sx={{ m: 1, marginLeft: "-1px" }}
        />
        <FormControl fullWidth>
          <InputLabel id="ongoing-label">Is this crime ongoing?</InputLabel>
          <Select
            labelId="ongoing-label"
            id="ongoing"
            label="ongoing"
            onChange={(e) => setOngoing(e.target.value)}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
        <br></br>
        <br></br>
        <FormControl fullWidth>
          <InputLabel id="type-label">What type of crime?</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            label="ongoing"
            onChange={(e) => setCrimeTypeId(e.target.value)}
          >
            {crimes.map((crime) => {
              return <MenuItem value={crime.id}>{crime.subtype}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <br></br>
        <br></br>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              label="Basic date time picker"
              onChange={(event) => setDateTime(event)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <br></br>
      <Button variant="contained" type="submit" onClick={() => handleSubmit()}>
        Submit
      </Button>
    </Box>
  );
}

export default Booking;