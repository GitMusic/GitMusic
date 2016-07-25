require('colors');
const util = require('util');


module.exports = {
    level: {
        error: 1,
        warning: 2,
        info: 3
    },
    log(level, message) {
        //TODO: add meaning to levels
        //TODO: writing to file?
        let log = `[${(new Date()).toLocaleString()}]: ${message === Object(message) ? util.inspect(message, false, null) : message}`;
        if (level == this.level.error) {
            console.log(log.red);
        } else if (level == this.level.warning) {
            console.log(log.yellow);
        } else {
            console.log(log.blue);
        }

    }
};