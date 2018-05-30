import geolib from "geolib";

export const foundCity = (data, place) => data.some(i => i.name === place);

export const foundMunicipality = (data, place) =>
  data.some(i => i.municipality === place);

export const foundProvince = (data, place) =>
  data.some(i => i.province === place);

export const filterCitys = (data, place) => data.filter(i => i.name === place);

export const filterMunicipalities = (data, place) =>
  data.filter(i => i.municipality === place);

export const filterProvinces = (data, place) =>
  data.filter(i => i.province === place);

export default (data, item) => {
  let found = false;
  let places = null;

  let title = item.title.split(", ");
  let place = title.slice(-1)[0].toLowerCase();
  let incident = title.slice(1)[0];

  if (place.includes("s län")) {
    place = place.split("s län")[0];
  } else if (place.includes(" län")) {
    place = place.split(" län")[0];
  }

  if (foundCity(data, place)) {
    places = filterCitys(data, place);
  } else if (foundMunicipality(data, place)) {
    places = filterMunicipalities(data, place);
  } else if (foundProvince(data, place)) {
    places = filterProvinces(data, place);
  }

  return {
    ...item,
    incident,
    found,
    place,
    center: geolib.getCenter(places)
  };
};
