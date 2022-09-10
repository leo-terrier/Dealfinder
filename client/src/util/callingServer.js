import { serialize } from "./helper.js";

export const fetchResults = async (params) => {
  const response = await fetch("/results?" + serialize(params), {
    credentials: "include",
  });
  const responseJson = await response.json();
  if (response.status !== 200) {
    response.status === 404 && console.log("invalid location");
    response.status === 400 && console.log("wrong inputs");
    return response;
  }
  return {
    deals: responseJson.deals,
    coordinates: responseJson.coordinates,
    status: response.status,
  };
};

export const fetchResultsFromCoordinates = async (params) => {
  const response = await fetch("/location?" + serialize(params), {
    credentials: "include",
  });
  const responseJson = await response.json();
  return responseJson;
};

export const addToSearches = async (search) => {
  /* try{ */
  const response = await fetch("/searches", {
    headers: { "Content-Type": "application/json", accept: "application/json" },
    credentials: "include",
    method: "POST",
    body: JSON.stringify(search),
  });
  //Adding sys error management
  /* if (response.status!==200){
      throw new Error(`Query error : ${response.status}`)
    } */
  const responseJson = await response.json();
  console.log("Adding this search to database : ");
  console.log(responseJson);
  /* }catch{
    console.log('error sys')
    } */
};

export const addToDeals = async (deal) => {
  const response = await fetch("/deal", {
    headers: { "Content-Type": "application/json", accept: "application/json" },
    credentials: "include",
    method: "POST",
    body: JSON.stringify(deal),
  });
  const responseJson = await response.json();
  console.log("Adding this deal to database : ");
  console.log(responseJson);
};

export const fetchSavedSearches = async () => {
  const response = await fetch("/searches", { credentials: "include" });
  const responseJson = await response.json();
  const searches = responseJson.map((search) => ({
    search_id: search.search_id,
    user_id: search.user_id,
    address: search.address,
    zipcode: search.zipcode,
    minSurface: search.minsurface,
    maxSurface: search.maxsurface,
    minPrice: search.minprice,
    maxPrice: search.maxprice,
    specStreet: search.specstreet,
  }));
  console.log("The saved searches of the user are :");
  console.log(searches);
  return searches;
};

export const fetchSavedDeals = async () => {
  const response = await fetch("/deals", { credentials: "include" });
  const responseJson = await response.json();
  const deals = responseJson.map((deal) => ({
    deal_id: deal.deal_id,
    date: deal.date,
    streetNumber: deal.streetnumber,
    streetName: deal.streetname,
    zipcode: deal.zipcode,
    city: deal.city,
    price: deal.price,
    surface: deal.surface,
  }));
  console.log("The saved deals of the user are :");
  console.log(deals);
  return deals;
};

export const removeFromSearches = (search) => {
  fetch(`/searches/${search.search_id}`, {
    method: "DELETE",
    credentials: "include",
  });
  console.log("Search deleted from database : ");
  console.log(search);
};

export const removeFromDeals = (deal) => {
  fetch(`/deals/${deal.deal_id}`, {
    method: "DELETE",
    credentials: "include",
  });
  console.log("Search deleted from database : ");
  console.log(deal);
};


