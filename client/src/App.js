import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import "./App.css";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/RegisterLogin/Login.js";
import Register from "./pages/RegisterLogin/Register.js";
import { Results } from "./pages/Results/Results.js";
import { SearchBox } from "./pages/SearchBox/SearchBox.js";
import NavBar from "./presentationals/NavBar";
import { containerStyle, theme } from "./styles.js";

import { About } from "./pages/About/About.js";
import { SavedDeals } from "./pages/SavedDeals/SavedDeals";
import { addToDeals, addToSearches, fetchResults, fetchResultsFromCoordinates, fetchSavedDeals, fetchSavedSearches, removeFromDeals, removeFromSearches } from "./util/callingServer.js";

function App() {
  const [results, setResults] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [savedDeals, setSavedDeals] = useState([]);

  const [address, setAddress] = useState("33 quai de Bourbon");
  const [zipcode, setZipcode] = useState("75004");
  const [isMoreFields, setIsMoreFields] = useState(false);
  const [minSurface, setMinSurface] = useState("");
  const [maxSurface, setMaxSurface] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [specStreet, setSpecStreet] = useState("");

  const [mapCenter, setMapCenter] = useState({});
  const [dealOnMap, setDealOnMap] = useState("");

  const [firstName, setFirstName] = useState("");

  const [resultsRequested, setResultsRequested] = useState(false);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [wrongLocationInput, setWrongLocationInput] = useState(false);

  const scrollRef = useRef(null);

  const getResults = async (data) => {
    setIsLoadingResults(true);
    setWrongLocationInput(false);
    const response = await fetchResults(data);
    setIsLoadingResults(false);
    setResultsRequested(true);
    if (response.status !== 200) {
      setResults([]);
      setWrongLocationInput(true);
      return;
    }
    setMapCenter({
      lng: response.coordinates[0],
      lat: response.coordinates[1],
    });
    setResults(response.deals);
  };

  const getResultsFromCoordinates = async (lon, lat, maxPrice, minPrice, maxSurface, minSurface) => {
    const response = await fetchResultsFromCoordinates({
      lon,
      lat,
      maxPrice,
      minPrice,
      maxSurface,
      minSurface,
      specStreet,
    });
    setResults(response);
  };

  const addSearch = (search) => {
    setSavedSearches([search, ...savedSearches]);
    if (firstName) {
      addToSearches(search);
    }
  };

  const addDeal = (deal) => {
    if (savedDeals.every((savedDeal) => savedDeal.deal_id !== deal.deal_id)) {
      setSavedDeals([deal, ...savedDeals]);
    }
    if (firstName) {
      addToDeals(deal);
    }
  };

  const getSavedSearches = async () => {
    if (firstName) {
      const response = await fetchSavedSearches();
      setSavedSearches(response);
    }
  };

  const getSavedDeals = async () => {
    if (firstName) {
      const response = await fetchSavedDeals();
      setSavedDeals(response);
    }
  };

  const removeSearch = (search) => {
    setSavedSearches((prev) => prev.filter((s) => s.search_id !== search.search_id));
    if (firstName) {
      removeFromSearches(search);
    }
  };

  const removeDeal = (deal) => {
    setSavedDeals((prev) => prev.filter((d) => d.deal_id !== deal.deal_id));
    if (firstName) {
      removeFromDeals(deal);
    }
  };

  useEffect(() => {
    getSavedSearches();
    getSavedDeals();
  }, [firstName]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView(false, { behavior: "smooth" });
  }, [isLoadingResults]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavBar firstName={firstName} setFirstName={setFirstName} />
        <main>
          <Container component="section" maxWidth={false} disableGutters sx={containerStyle}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="dealfinder"
                element={
                  <SearchBox
                    getResults={getResults}
                    addSearch={addSearch}
                    removeSearch={removeSearch}
                    savedSearches={savedSearches}
                    isLoadingResults={isLoadingResults}
                    wrongLocationInput={wrongLocationInput}
                    setWrongLocationInput={setWrongLocationInput}
                    address={address}
                    setAddress={setAddress}
                    zipcode={zipcode}
                    setZipcode={setZipcode}
                    isMoreFields={isMoreFields}
                    setIsMoreFields={setIsMoreFields}
                    minSurface={minSurface}
                    setMinSurface={setMinSurface}
                    maxSurface={maxSurface}
                    setMaxSurface={setMaxSurface}
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                    specStreet={specStreet}
                    setSpecStreet={setSpecStreet}
                  />
                }
              />
              <Route path="about" element={<About />} />
              <Route path="register" element={<Register setFirstName={setFirstName} />} />
              <Route path="login" element={<Login setFirstName={setFirstName} />} />
              <Route path="saveddeals" element={<SavedDeals removeDeal={removeDeal} savedDeals={savedDeals} />} />
            </Routes>
          </Container>
          <Results
            addDeal={addDeal}
            deals={results}
            mapCenter={mapCenter}
            dealOnMap={dealOnMap}
            setDealOnMap={setDealOnMap}
            savedDeals={savedDeals}
            removeDeal={removeDeal}
            scrollRef={scrollRef}
            resultsRequested={resultsRequested}
            isLoadingResults={isLoadingResults}
            wrongLocationInput={wrongLocationInput}
            getResultsFromCoordinates={getResultsFromCoordinates}
            minSurface={minSurface}
            maxSurface={maxSurface}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
