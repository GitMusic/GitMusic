module.exports = {
    options: {
        clean: true
    },
    libs: {
        options: {
            destPrefix: 'src/vendor'
        },
        files: {
            //Angular
            'angular/js/angular.min.js': 'angular/angular.min.js',

            //Bootstrap
            'bootstrap/css/bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css',
            'bootstrap/js/bootstrap.min.css': 'bootstrap/dist/js/bootstrap.min.js',
            'bootstrap/fonts/glyphicons-halflings-regular.eot': 'bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
            'bootstrap/fonts/glyphicons-halflings-regular.svg': 'bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
            'bootstrap/fonts/glyphicons-halflings-regular.ttf': 'bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
            'bootstrap/fonts/glyphicons-halflings-regular.woff': 'bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
            'bootstrap/fonts/glyphicons-halflings-regular.woff2': 'bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',

            //Font Awesome
            'font-awesome/css/font-awesome.min.css': 'font-awesome/css/font-awesome.min.css',
            'font-awesome/fonts/FontAwesome.otf': 'font-awesome/fonts/FontAwesome.otf',
            'font-awesome/fonts/fontawesome-webfont.eot': 'font-awesome/fonts/fontawesome-webfont.eot',
            'font-awesome/fonts/fontawesome-webfont.svg': 'font-awesome/fonts/fontawesome-webfont.svg',
            'font-awesome/fonts/fontawesome-webfont.ttf': 'font-awesome/fonts/fontawesome-webfont.ttf',
            'font-awesome/fonts/fontawesome-webfont.woff': 'font-awesome/fonts/fontawesome-webfont.woff',
            'font-awesome/fonts/fontawesome-webfont.woff2': 'font-awesome/fonts/fontawesome-webfont.woff2',

            //jQuery
            'jquery/js/jquery.min.js': 'jquery/dist/jquery.min.js'
        }
    }
};