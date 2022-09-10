export const formatPrice = (price) => {
  return price.toLocaleString() + " €";
};

export function capitalizeFirstLetter(string) {
  return string
    .toLowerCase()
    .split(" ")
    .map((str) => str[0].toUpperCase() + str.slice(1))
    .join(" ");
}

export function neighborDealsCoordinates(deals) {
  //get the set of coordinates per deal, inside an array
  const coordinates = deals.map((deal) => [
    deal.geo_point.lon,
    deal.geo_point.lat,
  ]);

  //Get all deals which have neighbors in their coordinates in an array of object
  const neighborDeals = [];
  deals.forEach((deal) => {
    const arr = [deal.geo_point.lon, deal.geo_point.lat];
    const firstIndex = coordinates.findIndex(
      (c) => c[0] === arr[0] && c[1] === arr[1]
    );
    const lastIndex = coordinates
      .reverse()
      .findIndex((c) => c[0] === arr[0] && c[1] === arr[1]);
    const isUnique = firstIndex === deals.length - 1 - lastIndex;
    if (!isUnique) {
      neighborDeals.push({ geo_point: deal.geo_point, deal_id: deal.deal_id });
    }
  });
  return neighborDeals;
}

export function reduceNumberSize(num) {
  if (num > 999 && num < 1000000) {
    return num / 1000 + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num >= 1000000) {
    return num / 1000000 + "M"; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
}

export function formatDate(str) {
  let arr = str.split("-");
  const year = +arr[0];
  const month = +arr[1];
  const day = +arr[2];
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString();
}

export const serialize = function (obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};
