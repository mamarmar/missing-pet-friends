import * as React from "react";
import axios from "axios";
//React Router
import { Link } from "react-router-dom";
//MUI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import Stack from "@mui/material/Stack";
//Images
import dog from "../../images/dog.jpeg";

export default function LostPetCard({ id, petName, city, email, setPopUp}) {
    const [currentPet, setCurrentPet] = React.useState();

    React.useEffect(() => {
        handleClick();
    },[]);

    //Go to pet page
    async function handleClick() {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/lostpets/${id}`);
            setCurrentPet(res.data[0]);
        }catch(err) {
            console.log(err)
        }
    }

    function openMessagePopUp() {
      setPopUp((prevValue) => {
        return {
          ...prevValue,
          isOpen:true,
          petName:petName,
          toEmail:email
        }
      });
    }

  return (
    <Card sx={{ width: 200, height: 350 }}>
      <Link
        component={CardActionArea}
        to={`/lostpets/${id}`}
        style={{ textDecoration: "none", color: "black" }}
        onClick={handleClick}
        state={currentPet}
      >
        <CardMedia
          component="img"
          height="160"
          image={dog}
          alt="dog"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ textTransform:"uppercase"}}>
            {petName}
          </Typography>
          <Stack
            variant="body2"
            direction="row"
            alignItems="center"
            sx= {{
              color:"grey.500",
              mb:0,
              alignSelf:"center"
            }}
          >
            <PlaceIcon/>
          <Typography >
            {city.split(",")[0]}
          </Typography>
          </Stack>
          
        </CardContent>
      </Link>
      <CardActions
        sx={{
            display:"flex",
            justifyContent:"center"
        }}
      >
        <Button variant="contained" onClick={openMessagePopUp}>
            Contact Owner
        </Button>
      </CardActions>
    </Card>
  );
}
