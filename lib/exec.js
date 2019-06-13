var Promise = require('bluebird');
var request = require('request');
const shared = require('./shared.js');

module.exports = function get(options){

	return new Promise(function(resolve, reject) {

		// Calcul de la position de départ

		if (options.depart) {
			options.depart = options.depart.replace(/\s/g, "%20").replace(/,/g,"%2C").replace(/é/g,"%C3%A9");

			request('http://photon.komoot.de/api/?q='+options.depart, function(err, result, body) {
				options.depart = JSON.parse(body);

				from = (`${options.depart.features[0].geometry.coordinates[0]};${options.depart.features[0].geometry.coordinates[1]}`)

			})
		} else {

		gladys.location.getUser({id: 1})
		.then((location) => {

			from = (`${location.longitude};${location.latitude}`)

		})

	}

		// Calcul de la position d'arrivée

		if (options.destination) {

			options.destination = options.destination.replace(/\s/g, "%20").replace(/,/g,"%2C").replace(/é/g,"%C3%A9");
			request('http://photon.komoot.de/api/?q='+options.destination, function(err, result, body) {
				options.destination = JSON.parse(body);

				to = (`${to.features[0].geometry.coordinates[0]};${to.features[0].geometry.coordinates[1]}`)

			})
		}

	console.log('origin = '+origin)
	console.log('destination = '+destination)

	// Vérification de l'utilisation de coverage
	var urlSansToken =  'https://TOKEN@api.navitia.io/v1/journeys?from='+origin+'&to='+destination+'&first_section_mode[]='+options.mode
	var url = 'https://'+shared.api+'@api.navitia.io/v1/journeys?from='+origin+'&to='+destination+'&first_section_mode[]='+options.mode

	if (options.coverage) {

		url = 'https://'+shared.api+'@api.navitia.io/v1/coverage/'+options.coverage+'/journeys?from='+origin+'&to='+destination+'&first_section_mode[]='+options.mode
		urlSansToken = 'https://TOKEN@api.navitia.io/v1/coverage/'+options.coverage+'/journeys?from='+origin+'&to='+destination+'&first_section_mode[]='+options.mode
	}

	console.log(urlSansToken);

	// Requête auprès de l'API Navitia

	request(url, function(err, response, body) {
		result = JSON.parse(body);
		// Affichage du départ et de l'arrivée
		var depart = result.journeys[0].departure_date_time.split("T")[1];
		var arrivee = result.journeys[0].arrival_date_time.split("T")[1];
		depart = depart.slice(0,2) + ":" + depart.slice(2,4) + ":" + depart.slice(4,6); 
		arrivee = arrivee.slice(0,2) + ":" + arrivee.slice(2,4) + ":" + arrivee.slice(4,6); 
		console.log('depart = '+ depart);
		console.log('arrive = '+ arrivee);

		resolve(depart)
		
	})
})
}

