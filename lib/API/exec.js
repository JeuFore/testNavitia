// JavaScript Document

var vm = require('vm');
var fs = require('fs');

vm.runInThisContext(fs.readFileSync(__dirname + "/extfile.js"));

module.exports = function get(options){

console.log("From included file:")
console.log(extvar)
console.log("10 x 50 =", extfun(10, 50))

}
