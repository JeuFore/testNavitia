const shared = require('../shared.js');
var request = require('request');
var geocoding = require ('./geocoding');

module.exports = function(options){

    return new Promise(function(resolve,reject) {

        if(!shared.api) return reject(`Navitia : Veuillez renseigner une clé API dans les paramètres Gladys.`)

        if(!options || !options.origin || !options.destination)   return reject(`Navitia : Veuillez renseigner origin et destination.`)

        if(options.line && !options.network)    return reject(`Navitia : Pour trouver la line, le network est demandé !`)

        var parameters = options.test

        var url

        if(!options.number) options.number = 0;

        geocoding(options.origin).then((origin) => {

            geocoding(options.destination).then((destination) => {

                if(options.network){
                    url = `https://${shared.api}@api.navitia.io/v1/coverage/${origin}/pt_objects?q=${options.network}&type[]=line&count=50&disable_geojson=true`
                }

                    req(url).then((result) => {

                        if(options.network){
                            options.network = `allowed_id[]=${result.pt_objects[0].line.network.id}`
                            if(options.line){
                                var line
                                for(i=0;i!=51 && !line;i++){
                                    if(result.pt_objects[i])    line = result.pt_objects[i].line.name.includes(options.line)
                                }
                                if(i!=51)  options.line = `allowed_id[]=${result.pt_objects[i-1].line.id}`
                            }
                        }          

                if(options.first_mode)  options.first_mode = `first_section_mode[]=${options.first_mode}`

                if(options.departure){
                    var now = new Date();
                    now.setHours(options.departure.slice(0,2));    now.setMinutes(options.departure.slice(3,5))
                    options.departure = `datetime=${now.toISOString()}&datetime_represents=departure`
                }

                if(options.arrival){
                    var now = new Date();
                    now.setHours(options.arrival.slice(0,2));    now.setMinutes(options.arrival.slice(3,5))
                    options.arrival = `datetime=${now.toISOString()}&datetime_represents=arrival`
                }
         
                url = `https://${shared.api}@api.navitia.io/v1/journeys?from=${origin}&to=${destination}&count=${options.number+1}&disable_geojson=true&${options.first_mode}&${options.network}&${options.line}&${options.departure}&${options.arrival}`

                req(url).then((result) => {

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
                        "text" : "",
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
                        "duration" : duration,
                        "distance" : result.journeys[options.number].distances,              
                        "trajet" : []
                    }

                    for (i=0,n=0;result.journeys[options.number].sections[i];i++) {
                            if(result.journeys[options.number].sections[i].from) data.trajet[i*2-n*2] = result.journeys[options.number].sections[i].from.name;else    n++

                            if(result.journeys[options.number].sections[i].mode){
                                data.trajet[i*2+1-n*2] = result.journeys[options.number].sections[i].mode
                            }else if(result.journeys[options.number].sections[i].transfer_type){
                                data.trajet[i*2+1-n*2] = result.journeys[options.number].sections[i].transfer_type
                            }else if(result.journeys[options.number].sections[i].display_informations){
                                data.trajet[i*2+1-n*2] = result.journeys[options.number].sections[i].display_informations.physical_mode
                            }
                      }                     
                    data.trajet[i*2-n*2] = result.journeys[options.number].sections[i-1].to.name

                    data.text = `En partant à ${data.depart.hours}h${data.depart.minutes} tu arriveras à ${data.arrive.hours}h${data.arrive.minutes}, le durée du trajet sera de ${data.duration.hours}h${data.duration.minutes}.`

                    return resolve(data)
                })
            })
        })
    })
    })

    function req(url) {
        return new Promise(function(resolve,reject) {
            if(!url)    return resolve();    request(url, function(err, response, body) {
                result = JSON.parse(body)

                if(result.message)    return reject(`Navitia : ${result.message}`)

                if(result.error)    return reject(`Navitia : ${result.error.message}`)

                return resolve(result)
            })
        })
    }

}