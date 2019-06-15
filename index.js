module.exports = function (sails) {

	var init = require('./lib/init.js');
    var exec = require('./lib/API/exec.js');
    var json = require('./lib/json.js');
    var AutoWakeUp = require('./lib/API/AutoWakeUp.js');

    gladys.on('ready', function(){
        init().catch(sails.log.warn);
    });
    
    return {
        json,
        exec,
        AutoWakeUp,
    };
};
