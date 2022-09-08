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


const Marker = ({deal, dealOnMap, setDealOnMap, neighborDealsPerCoordinates, addDeal, savedDeals, removeDeal, setMarkersMounting, markersMounting, mapCenter}) => {

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

    setMarkersMounting(false)}, []
  )

  return (
  
    <Tooltip title={title} open={isDealOnMap} arrow sx={{width:"150px"}}>
     <FiberManualRecordIcon sx={{cursor: 'pointer', width: '10px', display : markersMounting && "none"}}  color= {neighbors.findIndex(neighbor => neighbor===dealOnMap) !== -1 ? "secondary" : "primary"} fontSize="small" 
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
  const [mapCenter, setMapCenter] = useState([coordinates.lng, coordinates.lat]);
  const [maxPriceMap, setMaxPriceMap] = useState(maxPrice);
  const [minPriceMap, setMinPriceMap] = useState(minPrice);
  const [maxSurfaceMap, setMaxSurfaceMap] = useState(maxSurface);
  const [minSurfaceMap, setMinSurfaceMap] = useState(minSurface);
  
  const fetchResultsFromMap = async () => {
    setMarkersMounting(true)
      setTimeout(() => {
        getResultsFromCoordinates(mapCenter[0], mapCenter[1], maxPriceMap, minPriceMap, maxSurfaceMap, minSurfaceMap)}
      )
    }

  const neighborDealsPerCoordinates = neighborDealsCoordinates(deals)
  
  const { boxContainer, mapCard,
    OutterInputBox, fieldBox, input, filterButton, innerInputBox, fabFilter} = style;

    useEffect(() => {
      fetchResultsFromMap()
      console.log(mapCenter)
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
              console.log(e.target.value)
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
        
          {/* <TextField  sx={{width:"120px", backgroundColor:"white"}}id="outlined-basic" type="number" label="Max Price" variant="outlined" />
          <TextField  sx={{width:"120px", backgroundColor:"white"}}id="outlined-basic" type="number" label="Min Surface" variant="outlined" />
          <TextField  sx={{width:"120px", backgroundColor:"white"}}id="outlined-basic" type="number" label="Max Surface" variant="outlined" /> */}
        </Box>
        <Box sx={{height:"20px", display:"flex", justifyContent:"left", marginTop:"12px"}}><Button size="small" variant="outlined"sx={{ backgroundColor:"white", padding:1.5}} onClick={()=> fetchResultsFromMap()}>Refresh</Button></Box>
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
        }}
        /* onmousemove={()=> {  
          console.log(e.lng)
          console.log('hey')
          }} */
          onChange={(e)=> { 
            console.log('change')
            /* console.log(mapCenter)
            console.log(e.center) */
            dealOnMap && setDealOnMap('')
            
            setMapCenter(prev => {
              const isDiff = prev[0] !== e.center.lng && prev[1] !== e.center.lat
              //console.log(isDiff)
              if(prev[0] !== e.center.lng || prev[1] !== e.center.lat){
                return ([e.center.lng, e.center.lat])
              }else{
                return prev}
            }) 
            }}
            ///REFACTO ICI

          onDrag={(e) => {
            console.log('drag')
            setDealOnMap('')
            setMarkersMounting(true)
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
          setMarkersMounting={setMarkersMounting}
          markersMounting={markersMounting}
          mapCenter={mapCenter}
          />))}
      </GoogleMapReact>
    </Card>
  </Box>
  )
}

export default Map