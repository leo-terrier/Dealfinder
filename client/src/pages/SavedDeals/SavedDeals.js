import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Button, Card, Grid, Paper, Typography } from "@mui/material";
import {
  capitalizeFirstLetter,
  formatDate,
  formatPrice,
} from "../../util/helper";
import { style } from "./SavedDeals.stylesheet.js";

const { card, typography, box, paper, button } = style;

export function SavedDeals({ savedDeals, removeDeal }) {
  return (
    <Card
      sx={{
        ...card,
        maxWidth: savedDeals.length ? "70%" : { md: "40%", xs: "70%" },
      }}
    >
      <Typography component="h1" sx={typography.a}>
        {savedDeals.length ? "Saved Deals" : "You don't have any saved deals"}
      </Typography>
      {savedDeals.length ? (
        <Box sx={box}>
          {savedDeals.map((savedDeal) => {
            return (
              <Paper sx={paper} key={savedDeal.deal_id}>
                <Button
                  className="closeButton"
                  sx={button}
                  onClick={() => {
                    removeDeal(savedDeal);
                  }}
                >
                  <CloseRoundedIcon />
                </Button>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body1" sx={typography.b}>
                      {savedDeal.streetNumber +
                        " " +
                        capitalizeFirstLetter(savedDeal.streetName)}
                    </Typography>
                    <Typography variant="body1">
                      {savedDeal.zipcode + " " + savedDeal.city}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" sx={typography.b}>
                      {savedDeal.surface} m²
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" sx={typography.b}>
                      {savedDeal.price && formatPrice(savedDeal.price)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" sx={typography.b}>
                      Rooms : {savedDeal.nbOfRoom}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{formatDate(savedDeal.date)}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
        </Box>
      ) : (
        ""
      )}
    </Card>
  );
}
