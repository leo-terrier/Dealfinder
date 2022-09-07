import { DealsContainer } from "../../components/DealsContainer/DealsContainer";
import { DealsContainerSm } from "../../components/DealsContainer/DealsContainerSm";
import Map from "../../components/Map/Map.js";

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import {style} from "./Results.stylesheet.js"; 

export const Results = ({
addDeal,
deals,
setDealOnMapAndCenter,
mapCenter,
dealOnMap,
setDealOnMap,
savedDeals,
removeDeal,
resultsRequested,
isLoadingResults,
scrollRef,

}) => {

  const searchTitle = !isLoadingResults && (deals.length === 0 ? "0 deals found" : deals.length + " deals found for "+ deals[0].city + " (" + deals[0].zipcode+ ")")

  const theme = useTheme();

  const greaterThanLg = useMediaQuery(theme.breakpoints.up("lg"));
  const greaterThanMd = useMediaQuery(theme.breakpoints.up("md"));

  const {box, typography} = style;

  if (resultsRequested) {

  return (
  <Box sx={box.a} component="section">
      <Typography variant="h6" component="p" sx={typography}>{searchTitle}</Typography>
      <div ref={scrollRef}/>
      {deals.length>0 && 
      <Box sx={box.b}>
        {greaterThanMd ?   
        <DealsContainer
          addDeal={addDeal}
          savedDeals={savedDeals}
          removeDeal={removeDeal}
          deals={deals}
          isResults ={true}
          setDealOnMapAndCenter={setDealOnMapAndCenter}
          greaterThanLg={greaterThanLg}
          isLoadingResults={isLoadingResults}
          />: <DealsContainerSm 
            addDeal={addDeal}
            savedDeals={savedDeals}
            removeDeal={removeDeal}
            deals={deals}
            setDealOnMapAndCenter={setDealOnMapAndCenter}/>}
          <Map coordinates={mapCenter} deals={deals}  dealOnMap={dealOnMap} setDealOnMap={setDealOnMap} setDealOnMapAndCenter={setDealOnMapAndCenter} addDeal={addDeal}
          savedDeals={savedDeals}
          removeDeal={removeDeal}
          />
      </Box>}
    </Box>
);}
  
}