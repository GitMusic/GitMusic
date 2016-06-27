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

            //Angular Animate
            'angular-animate/angular-animate.min.js': 'angular-animate/angular-animate.min.js',

            //Angular Bootstrap
            'angular-bootstrap/ui-bootstrap.min.js': 'angular-bootstrap/ui-bootstrap.min.js',
            'angular-bootstrap/ui-bootstrap-tpls.min.js': 'angular-bootstrap/ui-bootstrap-tpls.min.js',

            //Angular Touch
            'angular-touch/angular-touch.min.js': 'angular-touch/angular-touch.min.js',

            //Bootstrap CSS only
            'bootstrap-css-only/css/bootstrap.min.css': 'bootstrap-css-only/css/bootstrap.min.css',
            'bootstrap-css-only/fonts/glyphicons-halflings-regular.eot': 'bootstrap-css-only/fonts/glyphicons-halflings-regular.eot',
            'bootstrap-css-only/fonts/glyphicons-halflings-regular.svg': 'bootstrap-css-only/fonts/glyphicons-halflings-regular.svg',
            'bootstrap-css-only/fonts/glyphicons-halflings-regular.ttf': 'bootstrap-css-only/fonts/glyphicons-halflings-regular.ttf',
            'bootstrap-css-only/fonts/glyphicons-halflings-regular.woff': 'bootstrap-css-only/fonts/glyphicons-halflings-regular.woff',
            'bootstrap-css-only/fonts/glyphicons-halflings-regular.woff2': 'bootstrap-css-only/fonts/glyphicons-halflings-regular.woff2',

            //Font Awesome
            'font-awesome/css/font-awesome.min.css': 'font-awesome/css/font-awesome.min.css',
            'font-awesome/fonts/FontAwesome.otf': 'font-awesome/fonts/FontAwesome.otf',
            'font-awesome/fonts/fontawesome-webfont.eot': 'font-awesome/fonts/fontawesome-webfont.eot',
            'font-awesome/fonts/fontawesome-webfont.svg': 'font-awesome/fonts/fontawesome-webfont.svg',
            'font-awesome/fonts/fontawesome-webfont.ttf': 'font-awesome/fonts/fontawesome-webfont.ttf',
            'font-awesome/fonts/fontawesome-webfont.woff': 'font-awesome/fonts/fontawesome-webfont.woff',
            'font-awesome/fonts/fontawesome-webfont.woff2': 'font-awesome/fonts/fontawesome-webfont.woff2'
        }
    }
};