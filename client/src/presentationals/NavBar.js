import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar, Box, Button, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import { NavBarStyleSheet } from "./NavBar.styleSheet";

const { toolbar, box, boxRight, button, iconButton, typography } = NavBarStyleSheet;

const NavBar = ({ setFirstName, firstName }) => {
  const theme = useTheme();

  const greaterThanSm = useMediaQuery(theme.breakpoints.up("sm"));
  const greaterThanMd = useMediaQuery(theme.breakpoints.up("md"));

  const logout = async () => {
    try {
      const response = await fetch("/logout");
      if (response.status === 200) {
        document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setFirstName("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loginAndOut = () => {
    if (!greaterThanSm && !firstName) {
      return (
        <IconButton component={Link} to="login" sx={iconButton}>
          <LoginIcon />
        </IconButton>
      );
    }
    if (!greaterThanSm && firstName) {
      return (
        <IconButton sx={iconButton}>
          <LogoutIcon onClick={logout} />
        </IconButton>
      );
    }
    if (firstName) {
      return (
        <Typography sx={{}}>
          Welcome {firstName} (
          <a href="#" onClick={logout}>
            log out
          </a>
          )
        </Typography>
      );
    } else {
      return (
        <Box sx={boxRight}>
          <Button sx={button} to="register" component={Link}>
            Register
          </Button>
          {greaterThanMd && <Typography sx={typography}>|</Typography>}
          <Button sx={button} component={Link} to="login">
            Log in
          </Button>
        </Box>
      );
    }
  };

  return (
    <AppBar sx={{ position: "absolute" }}>
      <Toolbar variant="dense" sx={toolbar} component="nav">
        <Box sx={box}>
          <Button sx={{ ...button, display: greaterThanSm ? "auto" : "none" }} to="/" component={Link}>
            Home
          </Button>
          {greaterThanMd && <Typography sx={typography}>|</Typography>}
          <Button sx={button} to="dealfinder" component={Link}>
            Find Deals
          </Button>
          {greaterThanMd && <Typography sx={typography}>|</Typography>}
          <Button sx={button} to="saveddeals" component={Link}>
            Saved Deals
          </Button>
          {greaterThanMd && <Typography sx={typography}>|</Typography>}
          <Button sx={button} to="about" component={Link}>
            About
          </Button>
          {!greaterThanSm && loginAndOut()}
        </Box>
        {greaterThanSm && loginAndOut()}
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
