const shared = require('./shared.js');
var fs = require('fs');
const Promise = require('bluebird');

module.exports = function get(options){

    return new Promise(function(resolve, reject) {

            if(options == 1){
            console.log("ok");
            var json = JSON.parse(fs.readFileSync('dev/document.json'));
            console.log(json);
            console.log("finis");
            resolve(json);
        }
    })
}

