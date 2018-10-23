var Promise = require('bluebird');
var request = require('request');

function myFunction() {
	if (1 == 1) {
		document.getElementById("demo").innerHTML = "coucou"

}
document.getElementById("demo").innerHTML = "bruhh"
var request = require('request');

	request('https://82bbc6b2-cc5d-41ac-8572-9c1bf4e48240@api.navitia.io/v1/journeys?from=2.3083896;48.8660048&to=2.301053;48.881376&first_section_mode[]=car', function(err, response, body) {
		result = JSON.parse(body);
		document.getElementById("demo").innerHTML = "Paragraph changed."

		// Affichage du départ et de l'arrivée
		
		console.log('depart = '+result.journeys[0].departure_date_time.split("T")[1])
		   console.log('arrive = '+result.journeys[0].arrival_date_time.split("T")[1])
	
		});
 }