var Promise = require('bluebird');
var request = require('request');
const shared = require('./shared.js');

module.exports = function get(options){

	return new Promise(function(resolve, reject) {

		console.log(options)

		if(options.origin){
			console.log(options.origin)
		}

		if(options.coverage){
			console.log(options.coverage)
		}

		if(options.mode){
			console.log(options.mode)
		}

		if(options.destination){
			console.log(options.destination)
		}

	})
}

