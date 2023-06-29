import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import DrawerComponent from "./DrawerComponent";
import { Link } from "react-router-dom";
import { Box, Button, Menu, MenuItem } from "@mui/material";

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        {/* <Typography variant="h6">Navbar</Typography> */}
        {/* {isMobile ? (
          <DrawerComponent />
        ) : ( */}
          <Box sx={{ flexGrow: 1, display:'flex' }}>
              <Link to="/" style={{ textDecoration: "none", color:'white' }}>
                <MenuItem style={{ paddingLeft: 13 }}>Spending</MenuItem>
              </Link>

              <Link to="/file" style={{ textDecoration: "none", color:'white'  }}>
                <MenuItem style={{ paddingLeft: 13 }}>File</MenuItem>
              </Link>
          </Box>
        {/* )} */}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
