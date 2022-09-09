import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { capitalizeFirstLetter, formatDate, formatPrice } from "../../util/helper";
import {style} from "./DealsContainerSm.stylesheet.js"

const {box, paper, typography} = style; 

export const DealsContainerSm = ({addDeal,
  savedDeals,
  removeDeal,
  deals,
  setDealOnMap}) => {

    const dealAction = (notAdded, deal) => {
      if (notAdded){
        addDeal(deal)
      }else{
        removeDeal(deal)
      }
    }
    return (
      <Box  sx={box}> 
        <Grid container spacing={2}>
        {deals.map(deal=> {

          const notAdded = savedDeals.findIndex(savedDeal => savedDeal.deal_id ===deal.deal_id) === -1

          return(
          <Grid item xs={12} sm={6} key={deal.deal_id}>
            <Paper sx={paper}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography component="p" variant="body1"sx={typography}> {deal.streetNumber + " " + capitalizeFirstLetter(deal.streetName)}</Typography>
                  <Typography component="p" variant="body1">{deal.zipcode +' '+ deal.city}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography component="p" variant="body1"sx={typography}>{deal.surface} m²</Typography>
                </Grid> 
                <Grid item xs={6}>
                  <Typography component="p" variant="body1"sx={typography}>{deal.price && formatPrice(deal.price)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography component="p" variant="body1"sx={typography}><strong>Rooms</strong> : {deal.nbOfRoom}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{formatDate(deal.date)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Button onClick={(e)=> {
                    e.stopPropagation()
                    dealAction(notAdded, deal)
                   }}
                   variant= {notAdded ? "buttonA" : "buttonD"}>
                    {notAdded ? "Save" : "Remove"}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button color="success"
                  onClick={(e) => {
                    e.stopPropagation()
                    setDealOnMap(deal.deal_id)}}>
                    Show on map
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>)
        })}
        </Grid>
      </Box>
    )

}