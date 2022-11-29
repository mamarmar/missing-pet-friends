import * as React from "react";
import axios from "axios";
//MUI
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
//Form Validation
import { useForm } from "react-hook-form";
//Greek cities
import citiesArray from "../../json-files/cities.json";

function FilterBar({ setLostPets }) {
  //City value state for MUI Autocomplete
  const [cityValue, setCityValue] = React.useState(null);

  const cities = citiesArray.map((item) => {
    return `${item.city}, ${item.admin_name}`;
  });

  const { register, handleSubmit, reset } = useForm();

  //Render inly pets lost in specific city
  async function filterPets(data) {
    let config = {
      params: {
        city: data.city,
      },
    };
    //Only apply filter if input is provided
    if (data.city) {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/lostpets/filtered`,
          config
        );
        if (res.data.length > 0) {
          setLostPets(res.data);
        } else {
          alert(`No reports of missing pets in ${data.city.split(",")[0]}`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  //Clear filters and render all pets
  async function clearFilters() {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/lostpets/`);
      setLostPets(res.data);
    } catch (err) {
      console.lof(err);
    }
  }

  return (
      <Stack
        component="form"
        onSubmit={handleSubmit(filterPets)}
        noValidate
        direction={"row"}
        spacing={2}
        sx={{
          pt: { xs: 2, md: 1 },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Autocomplete
          disablePortal
          id="city"
          options={cities}
          value={cityValue}
          onChange={(e, newValue) => {
            setCityValue(newValue);
          }}
          sx= {{
            textAlign:"left"
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="City"
              {...register("city")}
              sx={{
                minWidth: { md: 200 }
              }}
            />
          )}
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />
        <Tooltip title="Apply filters">
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor:"primary.main"
            }}
          >
            Apply
          </Button>
        </Tooltip>
        <Tooltip title="Clear filters">
          <Button
            type="button"
            variant="outlined"
            sx={{
              mt: 3,
              mb: 2,
              borderColor: "grey.500",
              color: "grey.500",
            }}
            onClick={clearFilters}
          >
            Clear
          </Button>
        </Tooltip>
      </Stack>
  );
}

export default FilterBar;
