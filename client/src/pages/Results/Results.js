import { DealsContainer } from "../../components/DealsContainer/DealsContainer";
import { DealsContainerSm } from "../../components/DealsContainer/DealsContainerSm";
import Map from "../../components/Map/Map.js";

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import {style} from "./Results.stylesheet.js"; 

export const Results = ({
addDeal,
deals,
mapCenter,
dealOnMap,
setDealOnMap,
savedDeals,
removeDeal,
resultsRequested,
isLoadingResults,
scrollRef,
getResultsFromCoordinates,
wrongLocationInput,
minSurface,
maxSurface,
minPrice,
maxPrice,

}) => {

  const searchTitle = !isLoadingResults && (deals.length === 0 ? "0 deals found" : deals.length + " deals found for "+ deals[0].city + " (" + deals[0].zipcode+ ")")

  const theme = useTheme();

  const greaterThanXl = useMediaQuery(theme.breakpoints.up("xl"));
  const greaterThanMd = useMediaQuery(theme.breakpoints.up("md"));

  const {box, typography} = style;

  if (resultsRequested) {

  return (
  <Box sx={box.a} component="section">
      <Typography variant="h6" component="p" sx={typography}>{searchTitle}</Typography>
      <div ref={scrollRef}/>
      {!wrongLocationInput && !isLoadingResults &&
      <Box sx={box.b}>
        {greaterThanMd ?   
        <DealsContainer
          addDeal={addDeal}
          savedDeals={savedDeals}
          removeDeal={removeDeal}
          deals={deals}
          isResults ={true}
          setDealOnMap={setDealOnMap}
          greaterThanXl={greaterThanXl}
          isLoadingResults={isLoadingResults}
          />: <DealsContainerSm 
            addDeal={addDeal}
            savedDeals={savedDeals}
            removeDeal={removeDeal}
            deals={deals}
            setDealOnMap={setDealOnMap}/>}
          <Map 
          coordinates={mapCenter} 
          deals={deals}  
          dealOnMap={dealOnMap} 
          setDealOnMap={setDealOnMap} 
          addDeal={addDeal} 
          savedDeals={savedDeals}
          removeDeal={removeDeal}
          getResultsFromCoordinates={getResultsFromCoordinates}
          minSurface = {minSurface}
          maxSurface = {maxSurface}
          minPrice = {minPrice}
          maxPrice = {maxPrice}
          />
      </Box>}
    </Box>
);}
  
}