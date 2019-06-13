const shared = require('./shared.js')
var fs = require('fs')
const Promise = require('bluebird')

module.exports = function get(options){

    return new Promise(function(resolve, reject) {



        jsonString = JSON.stringify(options)

        fs.writeFile('dev/document.json', jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })

        var json = JSON.parse(fs.readFileSync('dev/document.json'))
        
        resolve(json)

    })
}

