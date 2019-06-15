var request = require('request')

var vm = require('vm');
var fs = require('fs');

vm.runInThisContext(fs.readFileSync(__dirname + "/geocoding.js"));

module.exports = function get(options){

console.log(extfun("52 rue principale, Bolsenheim 67150"))

}
