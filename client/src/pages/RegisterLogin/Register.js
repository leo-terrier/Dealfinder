import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { style } from "./styleSheet.js";

const Register = ({ setFirstName }) => {
  let navigate = useNavigate();
  const [firstNameForm, setFirstNameForm] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordB, setPasswordB] = useState();
  const [invalidValues, setInvalidValues] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordB) {
      setInvalidValues(true);
      return;
    }
    const response = await fetch("/register", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstNameForm,
        lastName,
        username,
        password,
      }),
    });

    if (response.status !== 200) {
      console.log("Signing up failed");
      setInvalidValues(true);
    } else {
      const responseJson = await response.json();
      console.log("Successfull signup");
      setFirstName(responseJson.first_name);
      navigate("/", { replace: true });
      setInvalidValues(false);
    }
  };

  const { card, box, typography, button, textField } = style;

  return (
    <Card component="form" sx={card}>
      <Typography component="h1" variant="h5" sx={typography.a}>
        Sign up
      </Typography>
      <TextField
        sx={textField}
        fullWidth
        type="text"
        id="firstNameForm"
        name="firstNameForm"
        onChange={(e) => setFirstNameForm(e.target.value)}
        label="First name"
        required
      />
      <TextField
        sx={textField}
        fullWidth
        type="text"
        id="lastName"
        name="lastName"
        label="Last Name"
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <TextField
        sx={textField}
        fullWidth
        type="email"
        id="username"
        name="username"
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
        onChange={(e) => setPassword(e.target.value)}
        label="Password (min. 5 char)"
        required
      />
      <TextField
        sx={textField}
        fullWidth
        type="password"
        id="passwordB"
        name="passwordB"
        onChange={(e) => setPasswordB(e.target.value)}
        label="Confirm password"
        required
      />

      <Button
        variant="contained"
        component="button"
        size="large"
        sx={button}
        onClick={handleSubmit}
      >
        Register
      </Button>
      <Typography
        mt={typography.b}
        sx={{
          ...typography.b,
          display: !invalidValues && "none",
          color: "red",
        }}
      >
        The credentials chosen are invalid
      </Typography>
    </Card>
  );
};
export default Register;
