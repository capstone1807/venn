const getLatLong = () => {
  const geocoder = new google.maps.Geocoder();
  const address = this.state.description;

  geocoder.geocode({ 'address': address }, function (results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
          const latitude = results[0].geometry.location.lat();
          const longitude = results[0].geometry.location.lng();

      }
  });
}

export default getLatLong
