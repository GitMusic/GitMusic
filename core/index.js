const util = require('./util');

util.ffmpegDownloader().then(() => require('./main')).catch(err => console.log(err));


