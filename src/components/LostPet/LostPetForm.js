import * as React from "react";
import axios from "axios";
//MUI
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import Textarea from '@mui/joy/Textarea';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//Form Validation
import { useForm } from "react-hook-form";
//Greek cities
import citiesArray from "../../json-files/cities.json";

const theme = createTheme();

export default function LostPetForm() {
  const [successfulSubmit, setSuccessfulSubmit] = React.useState(false);
  const [unsuccessfulSubmit, setUnsuccessfulSubmit] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  //City value state for MUI Autocomplete
  const [cityValue, setCityValue] = React.useState(null);

  const cities = citiesArray.map((item) => {
    return `${item.city}, ${item.admin_name}`;
  });
  let today = new Date();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Create new lost pet listing when form is submitted
  async function createLostPetListing(data) {
    data.city = cityValue;
    try {
      await axios.post(`http://localhost:5000/lostpets/new`, data);
      setUnsuccessfulSubmit(false);
      setSuccessfulSubmit(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setUnsuccessfulSubmit(true);
      setErrorMessage(err.response.data);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Lost Pet Form
          </Typography>
          {/* Conditionally render success or error message */}
          {successfulSubmit && (
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              sx={{ color: "success.main", mt: 2 }}
            >
              <CheckCircleOutlineIcon />
              <Typography>
                {" "}
                Your listing has been successfully submitted!{" "}
              </Typography>
            </Stack>
          )}
          {unsuccessfulSubmit && (
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              sx={{ color: "error.main", mt: 2 }}
            >
              <ErrorOutlineIcon />
              <Typography>
                {" "}
                {errorMessage ||
                  "An error occurred. Please try again later."}{" "}
              </Typography>
            </Stack>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(createLostPetListing)}
            // onSubmit={submitForm}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="pet-name"
                  name="petName"
                  required
                  fullWidth
                  id="petName"
                  label="Pet Name"
                  autoFocus
                  {...register("petName", { required: "Required field" })}
                  error={!!errors?.petName}
                  helperText={errors?.petName ? errors.petName.message : null}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="date"
                  required
                  fullWidth
                  id="date"
                  type="date"
                  label="Date"
                  InputLabelProps={{ shrink: true }}
                  {...register("date", {
                    required: "Required field",
                    validate: (val) => {
                      if (Date.parse(val) > Date.parse(today)) {
                        return "Please select a valid date";
                      }
                    },
                  })}
                  error={!!errors?.date}
                  helperText={errors?.date ? errors.date.message : null}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="city"
                  options={cities}
                  value={cityValue}
                  onChange={(e, newValue) => {
                    setCityValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="City*"
                      {...register("city", {
                        required: "Please select a city",
                      })}
                      error={!!errors?.city}
                      helperText={errors?.city ? errors.city.message : null}
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  {...register("email", {
                    required: "Required field",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please provide a valid email",
                    },
                  })}
                  error={!!errors?.email}
                  helperText={errors?.email ? errors.email.message : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  id="description"
                  label="Description"
                  autoComplete="description"
                  { ...register("description") }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}