import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Icon, ThemeProvider } from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import "./MenuListItem.css";

// Importing the `createTheme` function from MUI
import { createTheme } from "@mui/material/styles";

// Creating a custom theme with the desired font and colors
const theme = createTheme({
  typography: {
    fontFamily: "trocchi, sans-serif", // Use "trocchi" as the font
  },
  palette: {
    text: {
      primary: "#4E4E59", // Font color
    },
    primary: {
      main: "#FFFCF1", // Color when hovering
    },
    background: {
      default: "#FFFCF1", // Background color
    },
  },
});

export default function MenuListItem({ menuItem }) {
  return (
    // Wrapping the component with the ThemeProvider and passing the custom theme
    <ThemeProvider theme={theme}>
      <Card className="MenuListItem">
        <CardMedia
          component="img"
          width="550"
          image={menuItem.image}
          alt={menuItem.name}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {/* Adding an icon using the Icon component */}
            <Icon>
              <GavelIcon />
            </Icon>
            Highest Bid: ${menuItem.bidCost.toFixed(2)}
          </Typography>
          <Typography variant="subtitle1" component="div">
            <Link to={`/details/${menuItem._id}`} className="details-link">
              {/* Adding an icon before the name */}
              <Icon>
                <GavelIcon />
              </Icon>{" "}
              <span className="menu-item-name">{menuItem.name}</span>
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
