const shared = require('./shared.js');
var fs = require('fs');
const Promise = require('bluebird');

module.exports = function get(options) {



    var json = JSON.parse(fs.readFileSync('dev/document.json'));

					return json;

}