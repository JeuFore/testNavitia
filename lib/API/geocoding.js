var request = require('request');

module.exports = function(location){

  return new Promise(function(resolve) {

    location = location.replace(/\s/g, "%20").replace(/,/g,"%2C").replace(/é/g,"%C3%A9")

    request(`http://photon.komoot.de/api/?q=${location}`, function(err, result, body) {

      return resolve(`${JSON.parse(body).features[0].geometry.coordinates[0]};${JSON.parse(body).features[0].geometry.coordinates[1]}`)
      
    })
  })
}  