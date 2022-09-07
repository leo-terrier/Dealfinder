import { Card } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import GoogleMapReact from 'google-map-react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TooltipContent from '../TooltipContent/TooltipContent';
import { neighborDealsCoordinates } from "../../util/helper";  
import {style} from "./Map.stylesheet.js"

const Marker = ({deal, dealOnMap, setDealOnMap, neighborDealsPerCoordinates, addDeal, savedDeals, removeDeal}) => {

  const isDealOnMap = deal.deal_id == dealOnMap ;

  const neighbors = []

  neighborDealsPerCoordinates.forEach(dealsPerCoordinates => {
    if (dealsPerCoordinates.geo_point.lat===deal.geo_point.lat && dealsPerCoordinates.geo_point.lon===deal.geo_point.lon){
      neighbors.push(dealsPerCoordinates.deal_id)
    }
  })

  if (!neighbors.length){
    neighbors.push(deal.deal_id)
  }
    
  const title = (
   <TooltipContent neighbors={neighbors.reverse()} deal={deal} setDealOnMap={setDealOnMap} addDeal={addDeal} savedDeals={savedDeals} removeDeal={removeDeal}/>
  );

  return (
  
    <Tooltip title={title} open={isDealOnMap} arrow sx={{width:"100px"}}>
      <FiberManualRecordIcon sx={{cursor: 'pointer', width: '10px'}}  color= {neighbors.findIndex(neighbor => neighbor===dealOnMap) !== -1 ? "secondary" : "primary"} fontSize="small" 
      onClick={(e)=> {
      e.stopPropagation()
      setDealOnMap(deal.deal_id)}}/>
    </Tooltip>
  );
};

const Map = ({coordinates, deals, setDealOnMap, dealOnMap, addDeal, savedDeals, removeDeal}) => {

  const neighborDealsPerCoordinates = neighborDealsCoordinates(deals)

  return (
    <Card sx={style.card}  >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDylTkSkfDpio-UOcJo85sGrLkMJsZytpU"}}
        center={{
          lat: coordinates.lat,
          lng: coordinates.lng}}
        zoom={16}
        hoverDistance={15}
        onClick={()=> {  
          setDealOnMap('')}}>
        {deals.map(deal => (
          <Marker 
          deal={deal}
          key={deal.deal_id}
          lat={deal.geo_point.lat}
          lng={deal.geo_point.lon}
          setDealOnMap={setDealOnMap}
          dealOnMap={dealOnMap}
          neighborDealsPerCoordinates={neighborDealsPerCoordinates}
          addDeal={addDeal}
          savedDeals={savedDeals}
          removeDeal={removeDeal}/>))}
      </GoogleMapReact>
    </Card>

  )
}

export default Map