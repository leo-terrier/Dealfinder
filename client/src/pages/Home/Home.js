import { Card, Typography } from "@mui/material";
import { HomeStyleSheet } from "./Home.stylesheet.js";

const { card, typography } = HomeStyleSheet;

export function Home() {
  return (
    <Card sx={card}>
      <Typography component="h1" variant="h3" color="white" sx={typography.a}>
        DealFinder
      </Typography>
      <Typography variant="h6" component="h2" sx={typography.b}>
        The history of real estate transactions, like never before!
      </Typography>
    </Card>
  );
}
