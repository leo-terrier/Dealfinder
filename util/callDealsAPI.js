import fetch from "node-fetch";
import { stripArrondissement } from "./helpers/helpers.js";
import { coordinatesURL, dealsURL } from "./helpers/urls.js";

export const callDealsAPI = async (query) => {
  const { address, zipcode, minSurface, maxSurface, minPrice, maxPrice, specStreet } = query;

  const getCoordinates = await fetch(coordinatesURL({ address, zipcode }));
  const getCoordinatesJson = await getCoordinates.json();

  if (!getCoordinatesJson.features.length) {
    const error = new Error("Location not found");
    error.statusCode = 404;
    console.log("error.message | error.statusCode :");
    console.log(error.message + " | " + error.statusCode);
    return error;
  }

  const coordinates = [getCoordinatesJson.features[0].geometry.coordinates[0], getCoordinatesJson.features[0].geometry.coordinates[1]];

  const fetchDealsURL = dealsURL({
    coordinates_1: coordinates[0],
    coordinates_2: coordinates[1],
    minSurface,
    maxSurface,
    minPrice,
    maxPrice,
    specStreet,
  });

  const getDeals = await fetch(fetchDealsURL);

  const getDealsJson = await getDeals.json();
  /* const jsonToString = await JSON.stringify(getDealsJson)
  fs.writeFileSync('./rawData.js', jsonToString);  */

  let dealsJson = getDealsJson.records.map((elt) => elt.record.fields);
  console.log("first deals fetched");
  console.log(dealsJson[0]);
  console.log(dealsJson[1]);
  console.log(dealsJson[2]);

  let deals = []; //selecting information here

  const count = {}; //counting the number of building per transaction (ID)

  //selecting information
  dealsJson.forEach((dealJson) => {
    const deal = {
      deal_id: dealJson.id_mutation,
      date: dealJson.date_mutation,
      price: !dealJson.valeur_fonciere ? 0 : dealJson.valeur_fonciere,
      streetNumber: dealJson.adresse_numero,
      streetName: dealJson.adresse_nom_voie,
      zipcode: dealJson.code_postal,
      city: stripArrondissement(dealJson.com_name),
      localType: dealJson.type_local,
      surface: dealJson.surface_reelle_bati,
      nbOfRoom: dealJson.nombre_pieces_principales,
      geo_point: dealJson.geo_point,
      joined: false,
    };
    deals.push(deal);

    count[deal.deal_id] = (count[deal.deal_id] || 0) + 1;
  });

  //aggregation of transaction info that belong to the same transactions (ID)

  Object.keys(count).forEach((elt) => {
    if (count[elt] > 1) {
      const agregatedDeal = {};
      deals.forEach((deal) => {
        if (deal.deal_id === elt) {
          (agregatedDeal.deal_id = elt),
            (agregatedDeal.date = deal.date),
            (agregatedDeal.price = deal.price),
            (agregatedDeal.streetName = deal.streetName),
            (agregatedDeal.zipcode = deal.zipcode),
            (agregatedDeal.city = deal.city),
            (agregatedDeal.streetNumber = deal.streetNumber),
            (agregatedDeal.localType = deal.localType),
            (agregatedDeal.surface = (agregatedDeal.surface || 0) + deal.surface),
            (agregatedDeal.nbOfRoom = (agregatedDeal.nbOfRoom || 0) + deal.nbOfRoom),
            (agregatedDeal.geo_point = deal.geo_point),
            (agregatedDeal.joined = true);
        }
      });
      deals = deals.filter((deal) => deal.deal_id !== elt);
      deals.push(agregatedDeal);
    }
  });

  deals.sort((a, b) => new Date(b.deal_id) - new Date(a.deal_id));

  return { deals, coordinates };
};
export const callDealsAPIFromLocation = async (query) => {
  const { lon, lat, minSurface, maxSurface, minPrice, maxPrice, specStreet } = query;

  const fetchDealsURL = dealsURL({
    coordinates_1: lon,
    coordinates_2: lat,
    minSurface,
    maxSurface,
    minPrice,
    maxPrice,
    specStreet,
  });
  const getDeals = await fetch(fetchDealsURL);

  const getDealsJson = await getDeals.json();

  /* const jsonToString = await JSON.stringify(getDealsJson)
  fs.writeFileSync('./rawData.js', jsonToString);  */

  let dealsJson = getDealsJson.records.map((elt) => elt.record.fields);

  let deals = []; //selecting information here

  const count = {}; //counting the number of building per transaction (ID)

  //selecting information
  dealsJson.forEach((dealJson) => {
    const deal = {
      deal_id: dealJson.id_mutation,
      date: dealJson.date_mutation,
      price: !dealJson.valeur_fonciere ? 0 : dealJson.valeur_fonciere,
      streetNumber: dealJson.adresse_numero,
      streetName: dealJson.adresse_nom_voie,
      zipcode: dealJson.code_postal,
      city: stripArrondissement(dealJson.com_name),
      localType: dealJson.type_local,
      surface: dealJson.surface_reelle_bati,
      nbOfRoom: dealJson.nombre_pieces_principales,
      geo_point: dealJson.geo_point,
      joined: false,
    };
    deals.push(deal);

    count[deal.deal_id] = (count[deal.deal_id] || 0) + 1;
  });

  //aggregation of transaction info that belong to the same transactions (ID)

  Object.keys(count).forEach((elt) => {
    if (count[elt] > 1) {
      const agregatedDeal = {};
      deals.forEach((deal) => {
        if (deal.deal_id === elt) {
          (agregatedDeal.deal_id = elt),
            (agregatedDeal.date = deal.date),
            (agregatedDeal.price = deal.price),
            (agregatedDeal.streetName = deal.streetName),
            (agregatedDeal.zipcode = deal.zipcode),
            (agregatedDeal.city = deal.city),
            (agregatedDeal.streetNumber = deal.streetNumber),
            (agregatedDeal.localType = deal.localType),
            (agregatedDeal.surface = (agregatedDeal.surface || 0) + deal.surface),
            (agregatedDeal.nbOfRoom = (agregatedDeal.nbOfRoom || 0) + deal.nbOfRoom),
            (agregatedDeal.geo_point = deal.geo_point),
            (agregatedDeal.joined = true);
        }
      });
      deals = deals.filter((deal) => deal.deal_id !== elt);
      deals.push(agregatedDeal);
    }
  });

  deals.sort((a, b) => new Date(b.deal_id) - new Date(a.deal_id));

  return deals;
};
