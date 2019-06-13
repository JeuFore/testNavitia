const shared = require('./shared.js')
var fs = require('fs')
const Promise = require('bluebird')

module.exports = function get(options){

    return new Promise(function(resolve, reject) {

        jsonReader('dev/document.json', (err, result) => {
            if (err) {
                console.log('Erreur de lecture du fichier',err)
                return
            }

            resolve(json)

            result.data[options.name] = options.value
        fs.writeFile('dev/document.json', JSON.stringify(result), (err) => {
                if (err) console.log("Erreur d'écriture du fichier", err)
            })
        })
    })
}

