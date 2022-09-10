import { Card, Typography } from "@mui/material";
import { aboutStylesheet } from "./About.stylesheet";

const { card, typography } = aboutStylesheet;

export function About() {
  return (
    <Card sx={card}>
      {
        <Typography variant="h2" component="h1" sx={typography.a}>
          About this project...
        </Typography>
      }
      <Typography variant="body2" sx={typography.b}>
        This project aims at helping people browse real estate deals around a
        given location. Entering a valid address and zipcode will retreive up to
        100 deals within 300 meters.
      </Typography>
      <Typography variant="body2" sx={typography.b}>
        Filters such as surface, price, and specific street have also been
        implemented to narrow down search results to your needs.
      </Typography>
      <Typography component="p" sx={typography.c}>
        Data source :{" "}
        <a href="https://public.opendatasoft.com/explore/dataset/demande-de-valeurs-foncieres/table/?flg=fr&sort=date_mutation">
          https://public.opendatasoft.com/explore/dataset/demande-de-valeurs-foncieres/table/?flg=fr&sort=date_mutation
        </a>
      </Typography>
    </Card>
  );
}
