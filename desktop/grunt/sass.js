module.exports = {
    dev: {
        options: {
            style: "expanded",
            sourcemap: 'none',
            lineNumber: true,
            noCache: true
        },
        files: {
            'src/css/app.css': 'src/sass/app.scss'
        }
    }
};
