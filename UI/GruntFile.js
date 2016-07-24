module.exports = function (grunt) {
    var gtx = require('gruntfile-gtx').wrap(grunt);

    gtx.loadAuto();

    var gruntConfig = require('./grunt');
    gruntConfig.package = require('./package.json');

    gtx.config(gruntConfig);

    // We need our bower components in order to develop
    gtx.alias('build', [
        'clean',
        'bowercopy',
        'sass',
        'copy',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'usemin',
        'htmlmin:dist',
        'clean:tmp'
    ]);

    gtx.alias('prepare', [
        'clean',
        'bowercopy',
        'sass:dev'
    ]);

    gtx.alias('watch', [
        'watch:sass'
    ]);

    gtx.finalise();
};
