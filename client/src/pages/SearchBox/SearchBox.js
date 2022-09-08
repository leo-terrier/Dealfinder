import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, Card, Fab, Grid, TextField, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

import { SavedSearches } from "../../components/SavedSearches/SavedSearches.js";
import { searchBoxStyleSheet } from "./SearchBox.stylesheet.js";
const { card, boxOut, boxIn, typography, grid, gridField, gridLabel,gridLabelOptional, gridWrongInput, gridOptionalPhrase, gridFab,textField, button } = searchBoxStyleSheet;

export const SearchBox = ({
  getResults, 
  addSearch, 
  removeSearch, 
  savedSearches, 
  isLoadingResults, 
  wrongLocationInput, 
  setWrongLocationInput,
  address,
  setAddress,
  zipcode,
  setZipcode,
  isMoreFields,
  setIsMoreFields,
  minSurface,
  setMinSurface,
  maxSurface,
  setMaxSurface,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  specStreet,
  setSpecStreet}) => {

  
  const handleSubmit = () => {
    getResults({address, 
      zipcode, 
      minSurface,
      maxSurface,
      minPrice,
      maxPrice, 
      specStreet});
  }; 

  const handleSavingSearch = () => {
    //client side validation only
    if(!address || !zipcode){
      setWrongLocationInput(true)
    }else{
      setWrongLocationInput(false)
      const newId = uuid();
      const newSearch = {search_id: newId, 
                      address,
                      zipcode,
                      minSurface,
                      maxSurface,
                      minPrice,
                      maxPrice, 
                      specStreet, 
                      }
    addSearch(newSearch)
    }    
  }

  const clickSavedSearch = (search) => {
   
    console.log(search)
    setAddress(search.address)
    setZipcode(search.zipcode)
    setMinSurface(search.minSurface)
    setMaxSurface(search.maxSurface)
    setMinPrice(search.minPrice)
    setMaxPrice(search.maxPrice)
    setSpecStreet(search.specStreet)
  };

  return (
    <Card sx={{...card, height: isLoadingResults ? "70vh": "auto"}}>
      {isLoadingResults ?  <CircularProgress />:
       <Box sx={boxOut}>
          <Typography component="h1" sx={typography.a}>
              DealFinder</Typography>
          <Typography component="h2" sx={typography.b}>
              Search around this address <span style={{fontWeight:"lighter"}}>(within 300 meters):</span></Typography>
        <Box component="form" sx={boxIn}>
          <Grid container sx={grid}>
            <Grid item xs={12} md={6} sx={gridLabel}>
              <label htmlFor="address" > Address <span style={{fontWeight:"lighter"}}>(number and street):</span> </label>
            </Grid>
            <Grid item xs={12} md={6} sx={gridField}>
              <TextField name="adresse"  id="address" type="text"  value={address}  onChange={(e)=> {setAddress(e.target.value)}} placeholder="e.g., 33 quai de Bourbon" required fullWidth sx={textField}/>
            </Grid>
            <Grid item xs={12} md={6} sx={gridLabel}>
              <label htmlFor= "zipcode">Zipcode <span style={{fontWeight:"lighter"}}>(5 digits):</span></label>
            </Grid>
              <Grid item xs={12} md={6} sx={gridField}>
                <TextField name="zipcode"  id="zipcode" type="text"  value={zipcode}  onChange={(e)=> {setZipcode(e.target.value)}} fullWidth placeholder="e.g., 75004" required sx={textField}/>
            </Grid>
            <Grid item xs={12}  sx={{ ...gridWrongInput, display: !wrongLocationInput && "none"}} >
                <Typography>
                  Invalid address or zipcode
                </Typography>
              </Grid>
            <Grid item xs={12} sx={{...gridOptionalPhrase, display: !isMoreFields ? "none": "flex"}}>
              <Typography component="h3" sx={typography.c}>Specify the kind of deals that interests you: </Typography>
            </Grid>
            <Grid item xs={12} md={6}  sx={{ ...gridLabelOptional, display: !isMoreFields ? "none": "flex"}}>
              <label htmlFor="minSurface">Min surface (m²):</label>
            </Grid>
            <Grid item xs={12} md={6} sx={{...gridField, display: !isMoreFields ? "none": "flex"}}>
              <TextField type="number" onWheel={event => { event.target.blur() }} name="minSurface" id="minSurface" value={minSurface} onChange={(e)=> {setMinSurface(e.target.value)}}  fullWidth required sx={textField}/>
            </Grid>
            <Grid item xs={12} md={6}  sx={{ ...gridLabelOptional, display: !isMoreFields ? "none": "flex"}}>
              <label htmlFor="maxSurface">Max surface (m²):</label>
            </Grid >
            <Grid item xs={12} md={6} sx={{...gridField,display: !isMoreFields ? "none": "flex"}}>
                <TextField type="number" onWheel={event => { event.target.blur() }} name="maxSurface" id="maxSurface" value={maxSurface} onChange={(e)=> {setMaxSurface(e.target.value)}}  fullWidth required sx={textField}/>
            </Grid>
            <Grid item xs={12} md={6}  sx={{ ...gridLabelOptional, display: !isMoreFields ? "none": "flex"}}>
              <label htmlFor="minPrice">Min price (€):</label>
            </Grid>
              <Grid item xs={12} md={6} sx={{...gridField,  display: !isMoreFields ? "none": "flex"}}>
                <TextField type="number" onWheel={event => { event.target.blur() }} name="minPrice" id="minPrice" value={minPrice} onChange={(e)=> {setMinPrice(e.target.value)}}  fullWidth required sx={textField}/>
            </Grid>
            <Grid item xs={12} md={6}  sx={{ ...gridLabelOptional, display: !isMoreFields ? "none": "flex"}}>
              <label htmlFor="maxPrice">Max price (€):</label>
            </Grid>
              <Grid item xs={12} md={6} sx={{...gridField,display: !isMoreFields ? "none": "flex"}}>
                <TextField type="number" onWheel={event => { event.target.blur() }} name="maxPrice" if="maxPrice" value={maxPrice} onChange={(e)=> {setMaxPrice(e.target.value)}}  fullWidth required sx={textField}/>
            </Grid>
            <Grid item xs={12} md={6}  sx={{ ...gridLabelOptional, display: !isMoreFields ? "none": "flex"}}>
              <label htmlFor="specStreet">Add a specific street:</label>
            </Grid>
            <Grid item xs={12} md={6} sx={{...gridField,  display: !isMoreFields ? "none": "flex"}}>
              <TextField type="text"  name="specStreet" id="specStreet" value={specStreet} onChange={(e)=> {setSpecStreet(e.target.value)}}  fullWidth required placeholder="e.g., rue des Ecoliers" sx={textField}/>
            </Grid>
            <Grid item xs={12} sx={gridFab}>
              <Fab size={'small'} variant="fab" onClick={()=> {setIsMoreFields((prev)=> prev ? false: true)}}> {isMoreFields? <RemoveIcon/>: <AddIcon />}</Fab>
            </Grid>
            <Grid item xs={12}>
              <Button size="medium"  sx={button} variant="noHover" onClick={handleSavingSearch}> Add to favorites</Button>
            </Grid>
            <Grid item xs={12}>
              <Button  variant="contained"  size="large"  sx={button} onClick={handleSubmit}>Find Deals Now</Button>
            </Grid> 
          </Grid>
          {savedSearches.length ?  
            <SavedSearches 
              savedSearches={savedSearches}
              removeSearch={removeSearch}
              clickSavedSearch={clickSavedSearch}
            />: null}
        </Box>
      </Box>}
    </Card>


  )
}
  
  


  











