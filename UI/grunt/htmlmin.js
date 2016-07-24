module.exports = {
    dist: {
        options: {
            removeComments: true,
            collapseWhitespace: true
        },
        files: [{
            expand: true,
            cwd: 'dist/',
            src: ['*.html', '**/*.html'],
            dest: 'dist/'
        }]
    }
};