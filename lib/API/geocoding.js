var request = require('request');

function extfun(location) {
  
        location = location.replace(/\s/g, "%20").replace(/,/g,"%2C").replace(/é/g,"%C3%A9")

        request('http://photon.komoot.de/api/?q='+location, function(err, result, body) {
    
            location = JSON.parse(body)
            return location = `${location.features[0].geometry.coordinates[0]};${location.features[0].geometry.coordinates[1]}`
    
        })
    }  