import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { style } from "./styleSheet.js";

export const Login = ({ setFirstName }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [wrongPassword, setWrongPassword] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch("/login", {
        credentials: "include",
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.status !== 200) {
        console.log("Authentication failed");
        setWrongPassword(true);
      } else {
        const responseJson = await response.json();
        console.log("Successfull login");
        setFirstName(responseJson.first_name);
        navigate("/", { replace: true });
        setWrongPassword(false);
      }
    } catch (err) {
      //console.log('error (sys)')
      //console.log(err)
    }
  };

  const { card, box, typography, button, textField } = style;

  return (
    <Card component="form" sx={card}>
      <Typography component="h1" variant="h5" sx={typography.a}>
        Log in
      </Typography>
      <TextField
        sx={textField}
        fullWidth
        type="email"
        id="username"
        name="username"
        color="black"
        onChange={(e) => setUsername(e.target.value)}
        label="Email"
        required
      />
      <TextField
        sx={textField}
        fullWidth
        type="password"
        id="password"
        name="password"
        color="black"
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        required
      />
      <Typography
        sx={{
          ...typography.d,
          display: !wrongPassword && "none",
          color: "red",
        }}
      >
        Invalid password or username
      </Typography>
      <Button
        variant="contained"
        component="button"
        size="large"
        sx={button}
        onClick={handleSubmit}
      >
        Log in
      </Button>
      <Box sx={box}>
        <Typography sx={typography.c} component={Link} to="../register">
          <a>No account? Create an account</a>
        </Typography>
        <Typography sx={typography.c}>
          <a href="#">Forgotten password ?</a>
        </Typography>
      </Box>
    </Card>
  );
};
