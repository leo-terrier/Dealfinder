import ApartmentIcon from "@mui/icons-material/Apartment";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HomeIcon from "@mui/icons-material/Home";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import {
  capitalizeFirstLetter,
  formatDate,
  formatPrice,
} from "../../util/helper";
import { style } from "./TooltipContent.stylesheet.js";

const TooltipContent = ({
  neighbors,
  deal,
  setDealOnMap,
  addDeal,
  savedDeals,
  removeDeal,
}) => {
  const notAdded =
    savedDeals.findIndex((savedDeal) => savedDeal.deal_id === deal.deal_id) ===
    -1;

  const index = neighbors.findIndex((neighbor) => neighbor === deal.deal_id);

  const handleNext = (e) => {
    e.stopPropagation();
    setDealOnMap(neighbors[index + 1]);
  };
  const handlePrev = (e) => {
    e.stopPropagation();
    setDealOnMap(neighbors[index - 1]);
  };
  const handleAction = (e) => {
    e.stopPropagation();
    if (notAdded) {
      addDeal(deal);
    } else {
      removeDeal(deal);
    }
  };

  const pageNumber = index + 1;

  const {
    gridContainer,
    gridItemIcon,
    gridItemFeatures,
    gridItemButton,
    gridItemArrows,
    houseIcon,
    apartmentIcon,
    gridAddress,
    typography,
    button,
  } = style;

  return (
    <Grid container sx={gridContainer} spacing={1}>
      <Grid item xs={4} sx={gridItemIcon}>
        <Box
          sx={{
            color: deal.joined
              ? "yellow"
              : deal.localType === "Appartement"
              ? "orange"
              : "turquoise",
          }}
        >
          {deal.joined ? (
            <MapsHomeWorkIcon sx={apartmentIcon} />
          ) : deal.localType == "Appartement" ? (
            <ApartmentIcon sx={apartmentIcon} />
          ) : (
            <HomeIcon sx={houseIcon} />
          )}
        </Box>
        <Typography variant="caption">
          {deal.joined
            ? "Complex"
            : deal.localType === "Appartement"
            ? "Apartment"
            : "House"}
        </Typography>
      </Grid>
      <Grid item xs={8} sx={gridAddress}>
        <Typography sx={typography.c}>
          {deal.streetNumber +
            " " +
            capitalizeFirstLetter(deal.streetName) +
            ", "}
        </Typography>
        <Typography sx={typography.c}>
          {deal.zipcode + " " + deal.city}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={gridItemFeatures}>
        <Typography variant="h6" sx={typography.a}>
          {deal.surface} m²
        </Typography>
        <Typography variant="h6" sx={typography.b}>
          {deal.price && formatPrice(deal.price)}
        </Typography>
        <Typography variant="h6" sx={typography.a}>
          {deal.nbOfRoom} Room{deal.nbOfRoom > 1 && "s"}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" sx={typography.c}>
          <span style={{ fontWeight: "lighter" }}>Deal date : </span>
          {formatDate(deal.date)}
        </Typography>
      </Grid>
      <Grid item xs={neighbors.length > 1 ? 6 : 12} sx={gridItemButton}>
        <Button
          variant={notAdded ? "buttonA" : "buttonD"}
          sx={{ ml: neighbors.length > 1 && 3 }}
          onClick={handleAction}
        >
          {notAdded ? "save" : "remove"}
        </Button>
      </Grid>
      {neighbors.length > 1 && (
        <Grid item xs={6} sx={gridItemArrows}>
          <IconButton
            disabled={pageNumber === 1}
            onClick={handlePrev}
            size="large"
            sx={button}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography>
            {pageNumber}/{neighbors.length}
          </Typography>
          <IconButton
            disabled={pageNumber === neighbors.length}
            onClick={handleNext}
            sx={button}
            size="large"
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};

export default TooltipContent;
