var Promise = require('bluebird');
var request = require('request');
const shared = require('./shared.js');

module.exports = function get(options){

	return new Promise(function(resolve, reject) {

		new Promise(function(origin, reject) {

			// Calcul de la position de départ

			if (options.origin) {
				from = options.origin
				from = from.replace(/\s/g, "%20").replace(/,/g,"%2C").replace(/é/g,"%C3%A9")

				request('http://photon.komoot.de/api/?q='+from, function(err, result, body) {

					origin(`${(JSON.parse(body)).features[0].geometry.coordinates[0]};${(JSON.parse(body)).features[0].geometry.coordinates[1]}`)
				})
			} else {

				gladys.location.getUser({id: 1})
				.then((location) => {

					origin(`${location.longitude};${location.latitude}`)

				})
			}
		})
		.then((origin) => {

			if(!origin){
				return Promise.reject(new Error('AutoWakeUp : Localisation Gladys à échouée.')); 
			}

			new Promise(function(destination, reject) {

				// Calcul de la position d'arrivée

				if (options.destination) {

					to = options.destination
					to = to.replace(/\s/g, "%20").replace(/,/g,"%2C").replace(/é/g,"%C3%A9")

					request('http://photon.komoot.de/api/?q='+to, function(err, result, body) {

						destination(`${(JSON.parse(body)).features[0].geometry.coordinates[0]};${(JSON.parse(body)).features[0].geometry.coordinates[1]}`)
					})
				}
			})
			.then((destination) => {

				if(!destination){
					return Promise.reject(new Error('AutoWakeUp : Aucune destination de spécifiée.')); 
				}

				// Vérification de l'utilisation de coverage

				var url = 'https://'+shared.api+'@api.navitia.io/v1/journeys?from='+origin+'&to='+destination+'&first_section_mode[]='+options.mode

				if (options.coverage) {

					url = 'https://'+shared.api+'@api.navitia.io/v1/coverage/'+options.coverage+'/journeys?from='+origin+'&to='+destination+'&first_section_mode[]='+options.mode
				}

				// Requête auprès de l'API Navitia

				request(url, function(err, response, body) {

					result = JSON.parse(body);

					console.log(result)

					if(result.error){
						console.log("erreur")
						reject(new Error('AutoWakeUp : Aucune réponse.')); 
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
		})
	})
}