var Promise = require('bluebird');
var request = require('request');

function myFunction() {
	if (1 == 1) {
		document.getElementById("demo").innerHTML = "coucou"

}
document.getElementById("demo").innerHTML = "bruhh"

const theUrl = "https://82bbc6b2-cc5d-41ac-8572-9c1bf4e48240@api.navitia.io/v1/journeys?from=2.3083896;48.8660048&to=2.301053;48.881376&first_section_mode[]=car"

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl); // false for synchronous request
	xmlHttp.send();
	document.getElementById("demo").innerHTML = xmlHttp.responseText;
	return xmlHttp.responseText;
	
 }