import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
//Components
import FilterBar from "./FilterBar";
import LostPetCard from "./LostPetCard";

function LostPetGrid({ lostPets, setLostPets }) {
  //Map over the incoming data and create an LostPetCard for every document
  const allLostPets = lostPets.map((pet) => {
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
    <Box>
        <FilterBar 
            setLostPets={setLostPets}
        />
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
    </Box>
  );
}

export default LostPetGrid;
