var request = require('request')
var geocoding = require('geocoding.js')

module.exports = function get(options){

geocoding.get(options.origin)

console.log(location)

geocoding.get(options.destination)

console.log(location)

}
