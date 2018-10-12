const getLatLong = () => {
  const geocoder = new google.maps.Geocoder();
  const address = this.state.description;

  geocoder.geocode({ 'address': address }, function (results, status) {

      
  });
}

export default getLatLong
