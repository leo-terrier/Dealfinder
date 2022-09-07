import { useEffect, useRef, useState } from "react";
import { Route, Routes } from 'react-router-dom';

import { Container } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';

import './App.css';
import { Home } from "./pages/Home/Home";
import { Login } from './pages/RegisterLogin/Login.js';
import Register from './pages/RegisterLogin/Register.js';
import { Results } from "./pages/Results/Results.js";
import { SearchBox } from "./pages/SearchBox/SearchBox.js";
import NavBar from "./presentationals/NavBar";
import { containerStyle, theme } from "./styles.js";

import { About } from "./pages/About/About.js";
import { SavedDeals } from "./pages/SavedDeals/SavedDeals";
import { addToDeals, addToSearches, fetchResults, fetchSavedDeals, fetchSavedSearches, removeFromDeals, removeFromSearches } from "./util/callingServer.js";

function App() {

  const [results, setResults] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [savedDeals, setSavedDeals] = useState([]);

  const [mapCenter, setMapCenter] = useState({});
  const [dealOnMap, setDealOnMap] = useState("");

  const [firstName, setFirstName] = useState("");

  const [resultsRequested, setResultsRequested] = useState(false);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [wrongInput, setWrongInput] = useState(false)

  const scrollRef = useRef(null)

  const setDealOnMapAndCenter = (deal) => {
    setMapCenter({lng: deal.geo_point.lon, lat: deal.geo_point.lat})
    setDealOnMap(deal.deal_id)
  }

  const getResults = async (data) => {
    setIsLoadingResults(true)
    setWrongInput(false)
    const response = await fetchResults(data); 
    setIsLoadingResults(false)
    setResultsRequested(true)
    if(response.status !==200){
      setResults([])
      setWrongInput(true)
      return
    }
    setMapCenter({lng: response.coordinates[0], lat: response.coordinates[1]})
    setResults(response.deals)
  };

  const addSearch = (search) => {
    setSavedSearches([search, ...savedSearches]);
    if (firstName){
      addToSearches(search);
    }
  };

  const addDeal = (deal) => {
    if (savedDeals.every(savedDeal => savedDeal.deal_id !== deal.deal_id)){
      setSavedDeals([deal, ...savedDeals ]);
    }
    if (firstName){
      addToDeals(deal);
    }
  };

  const getSavedSearches = async() => {
    if (firstName){
      const response = await fetchSavedSearches();
      setSavedSearches(response)}
  }

  const getSavedDeals = async() => {
    if (firstName){
      const response = await fetchSavedDeals();
      setSavedDeals(response)
    }
  }

  const removeSearch = (search) => {
    setSavedSearches((prev) => prev.filter(s => s.search_id !== search.search_id));
    if (firstName){
      removeFromSearches(search);

    }
  };

  const removeDeal = (deal) => {
    setSavedDeals((prev) => prev.filter(d => d.deal_id !== deal.deal_id));
    if (firstName){
      removeFromDeals(deal);
    }
  }
  
  useEffect(() => { 
    getSavedSearches();
    getSavedDeals(); }, [firstName]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView(false, {behavior: "smooth"});
  }, [isLoadingResults])

  return (
  <ThemeProvider theme={theme}>
    <div className="App" >
      <NavBar firstName={firstName} setFirstName={setFirstName}/>
      <main>
        <Container component="section" maxWidth={false} disableGutters sx={containerStyle}>
          <Routes>
            <Route path="/" element= {<Home/>}/> 
            <Route path="dealfinder" element= {<SearchBox getResults={getResults} addSearch={addSearch} removeSearch={removeSearch} savedSearches={savedSearches} isLoadingResults={isLoadingResults} wrongInput={wrongInput} setWrongInput={setWrongInput}/>}/>
            <Route path="about" element={<About/>} /> 
            <Route path="register" element={<Register setFirstName={setFirstName}/>} />
            <Route path="login" element={<Login setFirstName={setFirstName}/>} />
            <Route path="saveddeals" element={<SavedDeals removeDeal={removeDeal} savedDeals={savedDeals}/>} />
          </Routes>
        </Container>
        <Results 
          addDeal={addDeal}
          deals={results}
          setDealOnMapAndCenter={setDealOnMapAndCenter}
          mapCenter={mapCenter}
          dealOnMap={dealOnMap} 
          setDealOnMap={setDealOnMap} 
          savedDeals={savedDeals}
          removeDeal={removeDeal}
          scrollRef={scrollRef}
          resultsRequested={resultsRequested}
          isLoadingResults={isLoadingResults}
          />
      </main>
    </div>
  </ThemeProvider>
  );
}

export default App;
