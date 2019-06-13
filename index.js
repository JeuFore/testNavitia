module.exports = function (sails) {

	var init = require('./lib/init.js');
    var exec = require('./lib/exec.js');
    var test = require('./lib/test.js');
    var AutoWakeUp = require('./lib/AutoWakeUp.js');

    gladys.on('ready', function(){
        init().catch(sails.log.warn);
    });
    
    return {
        exec,
        AutoWakeUp,
    };
};
