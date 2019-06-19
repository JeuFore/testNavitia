const shared = require('../shared.js');
var request = require('request');
var geocoding = require ('./geocoding');

module.exports = function(options){

    return new Promise(function(resolve,reject) {

        if(!options || !options.origin || !options.destination)   return reject(`Navitia : Veuillez renseigner origin et destination.`)

        var parameters = options.test

        if(!options.number) options.number = 0;

        geocoding(options.origin).then((origin) => {

            geocoding(options.destination).then((destination) => {
         
                var url = `https://${shared.api}@api.navitia.io/v1/journeys?from=${origin}&to=${destination}&first_section_mode[]=${options.mode}&min_nb_journeys=10&${parameters}`

                request(url, function(err, response, body) {

                    result = JSON.parse(body)

                    if(result.message)    return reject(`Navitia : ${result.message}`)

                    if(!result.journeys)    return reject(`Navitia : ${result.error.message}`)

                    arrival = result.journeys[options.number].arrival_date_time.split("T")[1]

                    depart = result.journeys[options.number].departure_date_time.split("T")[1]

                    let totalSeconds = result.journeys[options.number].duration
                    let min = result.journeys[options.number].duration %= 3600

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
                            "hours" : arrival.slice(0,2),
                            "minutes" : arrival.slice(2,4),
                            "seconds" : arrival.slice(4,6)
                        },
                        "distance" : result.journeys[options.number].distances,
                        "duration" : duration,
                        "trajet" : []
                    }

                    for (i=0,n=0;result.journeys[options.number].sections[i];i++) {
                            if(result.journeys[options.number].sections[i].from) data.trajet[i-n] = result.journeys[options.number].sections[i].from.name;else    n++
					  }

                    return resolve(data)
                })
            })
        })
    })
};