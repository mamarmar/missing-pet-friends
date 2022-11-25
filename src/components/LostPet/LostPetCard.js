import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from "@mui/material";
//Images
import dog from "../../images/dog.jpeg";

export default function LostPetCard({ petName, city, email}) {
  return (
    <Card sx={{ width: 200, height: 350 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image={dog}
          alt="dog"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {petName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {petName} got lost in {city}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained">
            Contact Owner
        </Button>
      </CardActions>
    </Card>
  );
}
