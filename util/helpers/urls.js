import { abreviations_voie } from "./streetAbreviation.js";

export const coordinatesURL = ({ address, zipcode }) => {
  address = address.replace(/ /g, "+");
  const url = `https://api-adresse.data.gouv.fr/search/?q=${address}&postcode=${zipcode}`;
  return url;
};

export const formatAddress = (str) => {
  str = str
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  for (let key in abreviations_voie) {
    if (str.split(" ")[0].includes(key)) {
      str = str.replace(key, abreviations_voie[key]);
      break;
    }
  }
  str = str.replace(/ |-/g, "%20");
  console.log(str);
  return str;
};

export const dealsURL = ({
  coordinates_1,
  coordinates_2,
  minPrice = null,
  maxPrice = null,
  minSurface = null,
  maxSurface = null,
  specStreet = null,
}) => {
  specStreet = specStreet
    ? `%20and%20adresse_nom_voie%20%3D%20%22${formatAddress(specStreet)}%22`
    : "";
  minPrice = minPrice ? `%20and%20valeur_fonciere%3E${minPrice}` : "";
  maxPrice = maxPrice ? `%20and%20valeur_fonciere%3C${maxPrice}` : "";
  minSurface = minSurface ? `%20and%20surface_reelle_bati%3E${minSurface}` : "";
  maxSurface = maxSurface ? `%20and%20surface_reelle_bati%3C${maxSurface}` : "";

  const url = `https://public.opendatasoft.com/api/v2/catalog/datasets/buildingref-france-demande-de-valeurs-foncieres-geolocalisee-millesime/records?sort%28date_mutation%29&select=%20exclude%28reg_name%29%2Cexclude%28code_type_local%29%2Cexclude%28epci%2A%29%2Cexclude%28latitude%29%2Cexclude%28com_code%29%2Cexclude%28dep_code%29%2Cexclude%28id_parcelle%29%2C%20exclude%28numero_disposition%29%2C%20exclude%28adresse_code_voie%29%2C%20exclude%28com_code%29%2C%20exclude%28ancien%2A%29%2C%20exclude%28id_parcelle%29%2C%20exclude%28numero_volume%29%2C%20exclude%28nombre_lots%29%2C%20exclude%28code_type_local%29%2C%20exclude%28code_nature_culture%29%2C%20exclude%28code_nature_culture_speciale%29%2C%20exclude%28nature_culture_speciale%29%2C%20exclude%28code_type_local%29&where=distance%28geo_point%2C%20GEOM%27POINT%28${coordinates_1}%20${coordinates_2}%29%27%2C0.3km%29${maxPrice}${minPrice}${minSurface}${maxSurface}${specStreet}%20and%20%28type_local%3D%22Maison%22%20or%20type_local%3D%22Appartement%22%29and%28nature_mutation%3D%22Vente%22%29%20%20&limit=100&offset=0&timezone=UTC&order_by=date_mutation desc`;

  return url;
};
