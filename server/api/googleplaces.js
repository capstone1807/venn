const request = require('request-promise');
const places = "https://maps.googleapis.com/maps/api/place/details/json?"
const GOOGLE_API_KEY = require('../../secrets')

const getPlaceDetailsById = (placeId) => {
  return request({
  "method":"GET",
  "uri": `${places}placeid=${placeId}&key=${GOOGLE_API_KEY}`,
  "json": true,
  "headers": {
    "User-Agent": "Venn"
  }
}).then(response => {
  const latitude = response.result.geometry.location.lat;
  const longitude = response.result.geometry.location.lng;
  return {longitude, latitude}
});
}

module.exports = getPlaceDetailsById
