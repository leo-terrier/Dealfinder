import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { Box, Button, Card, Fab, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from 'react';
import { neighborDealsCoordinates } from "../../util/helper";
import TooltipContent from '../TooltipContent/TooltipContent';
import { style } from "./Map.stylesheet.js";

const { boxContainer, mapCard,
  OutterInputBox, fieldBox, input, filterButton, innerInputBox, fabFilter, refreshBox, refreshButton, fiberIcon, tooltip } = style;

const Marker = ({deal, dealOnMap, setDealOnMap, neighborDealsPerCoordinates, addDeal, savedDeals, removeDeal, key, setMarkersMounting, markersMounting, isLoadingMap, dragCount}) => {

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

  useEffect(() => { 
    !isLoadingMap && setMarkersMounting(false)}, [markersMounting, dragCount])
  

  return (
    <Tooltip title={title} open={isDealOnMap} arrow sx={tooltip} key={key}>
     <FiberManualRecordIcon key={key} sx={{...fiberIcon, display: markersMounting && "none"}}  color= {neighbors.findIndex(neighbor => neighbor===dealOnMap) !== -1 ? "secondary" : "primary"} fontSize="small" 
      onClick={(e)=> {
      e.stopPropagation()
      setDealOnMap(deal.deal_id)}}/>
    </Tooltip>
  );
};

const Map = ({coordinates, 
  deals, 
  setDealOnMap, 
  dealOnMap, 
  addDeal, 
  savedDeals, 
  removeDeal, 
  getResultsFromCoordinates,
  minSurface,
  maxSurface,
  minPrice,
  maxPrice}) => {

  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [markersMounting, setMarkersMounting] = useState(false)
  const [isLoadingMap, setIsLoadingMap] = useState(false)
  const [mapCenter, setMapCenter] = useState([coordinates.lng, coordinates.lat]);
  const [dragCount, setDragCount] = useState(0);

  const [maxPriceMap, setMaxPriceMap] = useState(maxPrice);
  const [minPriceMap, setMinPriceMap] = useState(minPrice);
  const [maxSurfaceMap, setMaxSurfaceMap] = useState(maxSurface);
  const [minSurfaceMap, setMinSurfaceMap] = useState(minSurface);
  
  const fetchResultsFromMap = async () => {
    setIsLoadingMap(true)
    await getResultsFromCoordinates(mapCenter[0], mapCenter[1], maxPriceMap, minPriceMap, maxSurfaceMap, minSurfaceMap)
    setIsLoadingMap(false)
    setMarkersMounting(false)

  }
    
  const neighborDealsPerCoordinates = neighborDealsCoordinates(deals)

    useEffect(() => {
      fetchResultsFromMap()
    }, [mapCenter])

  return (
  <Box sx={boxContainer}>
    <Fab  variant="fabMap" sx={fabFilter} onClick={() => {setIsFiltersOpen(prev => prev ? false : true)}}> {isFiltersOpen ? <FilterAltOffOutlinedIcon sx={filterButton} /> : <TuneOutlinedIcon sx={filterButton} />}</Fab> 
      <Box sx={{...OutterInputBox, display: isFiltersOpen ? "flex" : "none"}}>
        <Typography variant="h4"sx={{fontFamily:"Rampart One", color:"primary.main"}}>Filters</Typography>
        <Box sx={innerInputBox} component="form">
          <Box sx={fieldBox}>
            <label htmlFor="inPrice">Min Price :</label>
            <input style={input} name="minPrice" id="minPrice" type="number"  variant="outlined" value={minPriceMap} onChange={(e)=>{
              setMinPriceMap(e.target.value)} }/></Box>
          <Box sx={fieldBox}>
            <label htmlFor="maxPrice">Max Price :</label>
            <input  style={input} name="maxPrice" id="maxPrice" type="number" variant="outlined" value={maxPriceMap} onChange={(e)=>setMaxPriceMap(e.target.value) }/></Box>
          <Box sx={fieldBox}>
            <label htmlFor="minSurface">Min Surface :</label>
            <input  id="minSurface" style={input} name="minSurface" type="number"  variant="outlined" value={minSurfaceMap} onChange={(e)=>setMinSurfaceMap(e.target.value) }/></Box>
          <Box sx={fieldBox}>
            <label htmlFor="maxSurface">Max Surface :</label>
            <input  style={input} name="maxSurface" id="maxSurface" type="number" variant="outlined" value={maxSurfaceMap} onChange={(e)=>setMaxSurfaceMap(e.target.value) }/></Box>
        </Box>
        <Box sx={refreshBox}><Button size="small" variant="outlined"sx={refreshButton} onClick={()=> fetchResultsFromMap()}>Refresh</Button></Box>
      </Box>
    <Card sx={mapCard}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDylTkSkfDpio-UOcJo85sGrLkMJsZytpU"}}
        center={{
          lat: coordinates.lat,
          lng: coordinates.lng}}
        defaultZoom={16}
        hoverDistance={15}
        onClick={()=> {
          dealOnMap && setDealOnMap('')
          console.log("click")
        }}
        onChange={(e)=> { 
          console.log('change')
          dealOnMap && setDealOnMap('')
          const isDiff = mapCenter[0] !== e.center.lng || mapCenter[1] !== e.center.lat
          isDiff && setMapCenter([e.center.lng, e.center.lat])
        }}

        onDrag= {()=> {
          console.log('drag ++')
          setDealOnMap('')
          setMarkersMounting(true)
          setDragCount(prev => prev ++)
        }}
        onDragEnd= {()=> {
          setDragCount(prev => prev ++)
        }}
        >
            
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
          removeDeal={removeDeal}
          mapCenter={mapCenter}
          markersMounting={markersMounting}
          setMarkersMounting={setMarkersMounting}
          isLoadingMap={isLoadingMap}
          dragCount={dragCount}

          />))}
      </GoogleMapReact>
    </Card>
  </Box>
  )
}

export default Map