var Promise = require('bluebird');
var request = require('request');
const shared = require('./shared.js');

module.exports = function get(options){

	return new Promise(function(resolve, reject) {

		console.log(options)

		if(!options.origin){
			gladys.location.getUser({id: 1})
			.then((location) => {				
				origin(`${location.longitude};${location.latitude}`)
			})
		} else {
			from = options.origin
			from = from.replace(/\s/g, "%20").replace(/,/g,"%2C").replace(/é/g,"%C3%A9");

			request('http://photon.komoot.de/api/?q='+from, function(err, result, body) {
				from = JSON.parse(body);

				origin(`${from.features[0].geometry.coordinates[0]};${from.features[0].geometry.coordinates[1]}`)
			})
		}

		if(options.coverage){
			console.log(options.coverage)
		}

		if(options.mode){
			console.log(options.mode)
		}

		if(options.destination){
			console.log(options.destination)
		}

	})
}

