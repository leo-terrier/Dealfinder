import { Grid, Paper, Typography, Button } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { reduceNumberSize } from "../../util/helper";
import { savedSearchStyleSheet } from "./SavedSearch.stylesheet.js";

export const SavedSearch = ({
  savedSearch, 
  removeSearch,
  clickSavedSearch, }) => {

  const handleDelete = async (e) => {
    e.stopPropagation();
    await removeSearch(savedSearch)
  }; 

  const {button, typography} = savedSearchStyleSheet; 

  return (
    
    <Paper  variant="savedSearch" onClick={() => {clickSavedSearch(savedSearch)}}>
      <Button  sx={button} onClick={handleDelete}><CloseRoundedIcon /></Button>
      <Grid container >
        <Grid item xs={12}>
          <Typography component="p"  sx={typography.a}><strong>Address</strong> : {savedSearch.address} </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="p" sx={typography.a}><strong>Zipcode</strong> : {savedSearch.zipcode}  </Typography>
        </Grid>

        {savedSearch.minSurface && <Grid item xs={6}><Typography  sx={typography.b} component="p"> <strong>Min surface</strong> : {savedSearch.minSurface }</Typography></Grid>}

        {savedSearch.maxSurface && <Grid item xs={6}><Typography sx={typography.b} component="p"> <strong>Max surface</strong> :  {savedSearch.maxSurface}</Typography></Grid>} 

        {savedSearch.minPrice && <Grid item xs={6}><Typography  sx={typography.b} component="p"> <strong>Min price</strong> : {reduceNumberSize(savedSearch.minPrice) }</Typography></Grid>}

        {savedSearch.maxPrice && <Grid item xs={6}><Typography  sx={typography.b} component="p"> <strong>Max price</strong> : {reduceNumberSize(savedSearch.maxPrice) }</Typography></Grid>}

        {savedSearch.specStreet && <Grid item xs={12}><Typography  sx={typography.b} component="p"> <strong>Specific street</strong>: {savedSearch.specStreet}</Typography></Grid>}
        
        </Grid>
      </Paper>
)
}; 

