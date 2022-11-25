import Grid from "@mui/material/Grid";
//Components
import LostPetCard from "./LostPetCard";
//React Router
import { useLocation } from "react-router-dom";

function LostPetGrid({ lostPets, setLostPets }) {
  const location = useLocation();
  //Map over the incoming data and create an LostPetCard for every document
  const allLostPets = location.state.map((pet) => {
    return (
      <Grid item xs={2}>
        <LostPetCard
          key={pet._id}
          id={pet._id}
          petName={pet.petName}
          city={pet.city}
          email={pet.email}
        />
      </Grid>
    );
  });

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 5 }}
      columns={{ xs: 3, sm: 6, md: 9 }}
      justifyContent="center"
      sx={{
        py: 6,
        px: 6,
      }}
    >
      {allLostPets}
    </Grid>
  );
}

export default LostPetGrid;
