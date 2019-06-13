const shared = require('./shared.js');
const Promise = require('bluebird');
var request = require('request');

module.exports = function get(options) {

	return new Promise(function(resolve, reject) {
	
	return gladys.location.getUser({id: 1})
	.then((location) => {			
		
		// Position de l'utilisateur
		from = `${location.longitude};${location.latitude}`;
		
		return gladys.calendar.getNextEventUser({id: 1})
	})
	.then((event) => {
	// A mettre un 1 quand test finis
		if (event.start.getDay() == 0) {
		
			return Promise.reject(new Error("Pas d'événement"));
		}

		new Promise(function(to, reject) {
			event_date = event.start.getHours()*10000+event.start.getMinutes()*100
			loca_event = event.location
			loca_event = loca_event.replace(/\s/g, "%20").replace(/,/g,"%2C").replace(/é/g,"%C3%A9")
			
			// Calcul de la position de l'événement
			request('http://photon.komoot.de/api/?q='+loca_event, function(err, result, body) {
				loca_event = JSON.parse(body);
				to(`${loca_event.features[0].geometry.coordinates[0]};${loca_event.features[0].geometry.coordinates[1]}`)

			})
			.then((to) => {
				
			var url = '@api.navitia.io/v1/journeys?from='

			if (options.coverage) {
				url = '@api.navitia.io/v1/coverage/'+options.coverage+'/journeys?from='
			}
					
				// Recherche de l'itinéraire
				request('https://'+shared.api+url+from+'&to='+to+'&first_section_mode[]='+options.mode+'&min_nb_journeys=10&', function(err, response, body) {
					result = JSON.parse(body);
					n = 9;
					arrival = result.journeys[n].arrival_date_time.split("T")[1];

					while ((arrival > event_date) || (n === 0)){
					    n = n - 1;
					    arrival = result.journeys[n].arrival_date_time.split("T")[1];
					}

					depart = result.journeys[n].departure_date_time.split("T")[1];


					let totalSeconds = result.journeys[n].duration
					let min = result.journeys[n].duration %= 3600

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
							"hour" : depart.slice(0,2),
							"minutes" : depart.split("T")[1].slice(2,4),
							"seconds" : depart.split("T")[1].slice(4,6)
						},
						"arrive" : {
							"hour" : arrival.split("T")[1].slice(0,2),
							"minutes" : arrival.split("T")[1].slice(2,4),
							"seconds" : arrival.split("T")[1].slice(4,6)
						},
						"distance" : result.journeys[n].distances,
						"duration" : duration
					}

			   		resolve(data)
			})
		})
	})
})
})
}	