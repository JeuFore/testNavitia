var Promise = require('bluebird');
var request = require('request');
const shared = require('./shared.js');

module.exports = function get(options){

	return new Promise(function(resolve, reject) {

		// Calcul de la position de départ

		if (options.origin) {
			from = options.origin
			from = from.replace(/\s/g, "%20").replace(/,/g,"%2C").replace(/é/g,"%C3%A9");

			request('http://photon.komoot.de/api/?q='+from, function(err, result, body) {
				from = JSON.parse(body);

				from = (`${from.features[0].geometry.coordinates[0]};${from.features[0].geometry.coordinates[1]}`)

			})
		} else {

		gladys.location.getUser({id: 1})
		.then((location) => {

			from = (`${location.longitude};${location.latitude}`)

		})
	}


		// Calcul de la position d'arrivée

		if (options.destination) {

			to = options.destination
			to = to.replace(/\s/g, "%20").replace(/,/g,"%2C").replace(/é/g,"%C3%A9");
			request('http://photon.komoot.de/api/?q='+to, function(err, result, body) {
				to = JSON.parse(body);

				destination = (`${to.features[0].geometry.coordinates[0]};${to.features[0].geometry.coordinates[1]}`)

			})
		}
	})
.then((from,destination) => {

	console.log("ok")

	console.log(from)

	console.log(destination)

		// Vérification de l'utilisation de coverage

		var url = 'https://'+shared.api+'@api.navitia.io/v1/journeys?from='+origin+'&to='+destination+'&first_section_mode[]='+options.mode

		if (options.coverage) {

			url = 'https://'+shared.api+'@api.navitia.io/v1/coverage/'+options.coverage+'/journeys?from='+origin+'&to='+destination+'&first_section_mode[]='+options.mode

		}

		// Requête auprès de l'API Navitia

		request(url, function(err, response, body) {
			result = JSON.parse(body);

			// Affichage du départ et de l'arrivée

			depart = result.journeys[0].departure_date_time.split("T")[1]

			arrive = result.journeys[0].arrival_date_time.split("T")[1]

			console.log(depart)
			resolve(depart)
		
			});
		})
}