var Promise = require('bluebird');
var request = require('request');
const shared = require('../shared.js');
var geocoding = require('./geocoding.js');

module.exports = function get(options){

	return new Promise(function(resolve, reject) {

	new Promise(function(result, reject) {

			if (options.origin) {
			
				geocode(options.origi)

			} else {
				gladys.location.getUser({id: 1})
				.then((location) => {

					location = `${location.longitude};${location.latitude}`
				})
			}

			var url = 'https://'+shared.api+'@api.navitia.io/v1/journeys?from='+location

			if (options.coverage) {

				url = 'https://'+shared.api+'@api.navitia.io/v1/coverage/'+options.coverage+'/journeys?from='+location
			}

				if (!options.destination) {
					reject(new Error('Navitia : Pas de destination.'))
				}

				geocode(options.destination)

				url = url + +'&to='+location+'&first_section_mode[]='+options.mode

				request(url, function(err, response, body) {

					if((JSON.parse(body)).error){
						reject(new Error('Navitia : '+(JSON.parse(body)).error.message+'.')); 
					}
					result(JSON.parse(body))
				})
			})
			.then((result) => {

				var url = 'https://'+shared.api+'@api.navitia.io/v1/journeys?from='+origin+'&to='+destination+'&first_section_mode[]='+options.mode

				if (options.coverage) {

					url = 'https://'+shared.api+'@api.navitia.io/v1/coverage/'+options.coverage+'/journeys?from='+origin+'&to='+destination+'&first_section_mode[]='+options.mode
				}

					depart = result.journeys[0].departure_date_time.split("T")[1]
					
					arrive = result.journeys[0].arrival_date_time.split("T")[1]

					// Affichage du départ et de l'arrivée

					let totalSeconds = result.journeys[0].duration
					let min = result.journeys[0].duration %= 3600

					var duration = {
						"hours" : Math.floor(totalSeconds / 3600),
						"minutes" : Math.floor(min / 60),
						"seconds" : min % 60
					}	

					var data = {
						"origin" : origin,
						"destination" : destination,
						"url" : url,
						"depart" : {
							"hours" : depart.slice(0,2),
							"minutes" : depart.slice(2,4),
							"seconds" : depart.slice(4,6)
						},
						"arrive" : {
							"hours" : arrive.slice(0,2),
							"minutes" : arrive.slice(2,4),
							"seconds" : arrive.slice(4,6)
						},
						"distance" : result.journeys[0].distances,
						"duration" : duration
					}

			   		resolve(data)
				});
			})
}