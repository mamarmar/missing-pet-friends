import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
//Components
import FilterBar from "./FilterBar";
import LostPetCard from "./LostPetCard";
import MessagePopUp from "../MessagePopUp";

function LostPetGrid({ lostPets, setLostPets, popUp, setPopUp }) {
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
          setPopUp={setPopUp}
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
      {popUp.isOpen && <MessagePopUp popUp={popUp} setPopUp={setPopUp}/>}
    </Box>
  );
}

export default LostPetGrid;
