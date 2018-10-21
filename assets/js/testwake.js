function myFunction() {
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
			event_date = event.start.getHours()*10000+event.start.getMinutes()*100;
			loca_event = event.location
			loca_event = loca_event.replace(/\s/g, "%20").replace(/,/g,"%2C").replace(/é/g,"%C3%A9");
			console.log(loca_event)
			
			// Calcul de la position de l'événement
			request('http://photon.komoot.de/api/?q='+loca_event, function(err, result, body) {
				loca_event = JSON.parse(body);
				to = `${loca_event.features[0].geometry.coordinates[0]};${loca_event.features[0].geometry.coordinates[1]}`;
				console.log(from)
				console.log(to)
				
			var url = '@api.navitia.io/v1/journeys?from='

			if (options.coverage) {
				url = '@api.navitia.io/v1/coverage/'+options.coverage+'/journeys?from='
			}
					
			console.log(url)
				// Recherche de l'itinéraire
				request('https://'+shared.api+url+from+'&to='+to+'&first_section_mode[]='+options.mode+'&min_nb_journeys=10&', function(err, response, body) {
					result = JSON.parse(body);
					n = 9;
					arrival = result.journeys[n].arrival_date_time.split("T")[1];
					console.log(arrival);
					while ((arrival > event_date) || (n === 0)){
					    n = n - 1;
					    arrival = result.journeys[n].arrival_date_time.split("T")[1];
					    					}
					depart = result.journeys[n].departure_date_time.split("T")[1];
					console.log("Départ à "+depart+" heure");
					console.log("Arrivée à "+arrival+" heure");
					document.getElementById("demo").innerHTML = depart
			})
		})
	})
 }