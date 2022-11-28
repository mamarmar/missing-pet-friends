import React from "react";
//EmailJS
import { send } from "emailjs-com";
//MUI
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function MessagePopUp({ popUp, setPopUp }) {
  const [toSend, setToSend] = React.useState({
    message: "",
    to_email: "",
    reply_to: "",
  });
  const [successfulSubmit, setSuccessfulSubmit] = React.useState(false);
  const [unsuccessfulSubmit, setUnsuccessfulSubmit] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");


  React.useEffect(() => {
    updateState();
  }, []);

  function handleChange(e) {
    setToSend((prevToSend) => {
      return {
        ...prevToSend,
        [e.target.name]: e.target.value,
      };
    });
  }
  //Update State
  async function updateState() {
    try {
      setToSend((prevToSend) => {
        return {
          ...prevToSend,
          to_email: popUp.toEmail,
          reply_to: popUp.fromEmail,
        };
      });
    } catch (err) {
        setErrorMessage(err);
    }
  }

  //Send email when form is submitted
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (toSend.message.length > 0 && toSend.reply_to.length > 0) {
        updateState();
      await send(
        "service_qcr9lmj",
        "template_c7nz378",
        toSend,
        "U4lyXW3Xf0PetCy_K"
      );
      setUnsuccessfulSubmit(false);
        setSuccessfulSubmit(true);
        setTimeout(() => {
          closePopUp();
        }, 1000);
      } else if (toSend.reply_to.length === 0){
        setSuccessfulSubmit(false);
        setUnsuccessfulSubmit(true);
        setErrorMessage("Please provide your email address");
      } else {
        setSuccessfulSubmit(false);
        setUnsuccessfulSubmit(true);
        setErrorMessage("Please type a message");
      }
    } catch (err) {
      setUnsuccessfulSubmit(true);
      setErrorMessage(err.response.data);
    }
  }

  function closePopUp() {
    setPopUp((prevValue) => {
        return {
          ...prevValue,
          isOpen:false
        }
      });
  }

  return (
      <Box
      sx={{
        borderRadius: 1,
        position: "fixed",
        top: { xs: "50%", md: "45%" },
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: 320, md: 480 },
        height: { xs: 480, md: 480 },
        bgcolor: "common.white",
        boxShadow: 24,
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Tooltip title="Exit">
        <CloseIcon
          onClick={closePopUp}
          sx={{
            fontSize: { xs: 32, md: 30 },
            alignSelf: "end",
            cursor: "pointer",
            position: "absolute",
            top: { xs: -15, md: 5 },
            right: { xs: -15, md: 2 },
          }}
        ></CloseIcon>
      </Tooltip>
      <Typography
        variant="h3"
        sx={{
          pb: 0,
          fontSize: 20,
          mt: 5,
        }}
      >
        Have you spotted {popUp.petName}?
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "spaceBetween",
          gap:2,
          height: { xs: 300, md: 300 },
          mt:3
        }}
      >
        <TextField
            autoFocus
            placeholder="Type your email address"
            name="reply_to"
            value={toSend.reply_to}
            onChange={handleChange}
        >
            
        </TextField>
        <TextField
          multiline
          placeholder="Type your message..."
          rows={6}
          name="message"
          value={toSend.message}
          onChange={handleChange}
          sx={{
            width: 300,
            height: 340
          }}
        ></TextField>
        <Button
          variant="contained"
          type="submit"
          sx={{
            color: "common.white",
          }}
        >
          {" "}
          Send
        </Button>
      </Box>
      {/* Conditionally render success or error message */}
      {successfulSubmit && (
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{ color: "success.main", alignSelf: "center", mt: 2 }}
        >
          <CheckCircleOutlineIcon />
          <Typography> Your message has been sent! </Typography>
        </Stack>
      )}
      {unsuccessfulSubmit && (
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{ color: "error.main", alignSelf: "center", mt: 2 }}
        >
          <ErrorOutlineIcon />
          <Typography>
            {" "}
            {errorMessage || "An error occurred. Please try again later."}{" "}
          </Typography>
        </Stack>
      )}
    </Box>
  );
}

export default MessagePopUp;
