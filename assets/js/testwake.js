var Promise = require('bluebird');
var request = require('request');

function myFunction() {
	if (1 == 1) {
		document.getElementById("demo").innerHTML = "coucou"

}
document.getElementById("demo").innerHTML = "bruhh"

const theUrl = "https://api.navitia.io/v1/journeys?from=2.3083896;48.8660048&to=2.301053;48.881376&first_section_mode[]=car"

    var http = new XMLHttpRequest();
    http.open( "GET", theUrl, true, "82bbc6b2-cc5d-41ac-8572-9c1bf4e48240", ""); // false for synchronous request
	http.send();
	http.onload = () => document.getElementById("demo").innerHTML = http.responseText;
	return http.responseText;
	
 }