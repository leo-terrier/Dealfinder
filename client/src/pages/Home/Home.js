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
        Find real estate deals in any french neighborhood!
      </Typography>
    </Card>
  );
}
