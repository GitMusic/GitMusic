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
            'angular/js/angular.js': 'angular/angular.js',

            //Angular Animate
            'angular-animate/angular-animate.js': 'angular-animate/angular-animate.js',

            //Angular Bootstrap
            'angular-bootstrap/ui-bootstrap.js': 'angular-bootstrap/ui-bootstrap.js',
            'angular-bootstrap/ui-bootstrap-tpls.js': 'angular-bootstrap/ui-bootstrap-tpls.js',

            //Angular Touch
            'angular-touch/angular-touch.js': 'angular-touch/angular-touch.js',

            //Angular UI Router
            'angular-ui-router/release/angular-ui-router.js': 'angular-ui-router/release/angular-ui-router.js',

            //Bootstrap CSS only
            'bootstrap-css-only/css/bootstrap.css': 'bootstrap-css-only/css/bootstrap.css',
            'bootstrap-css-only/fonts/glyphicons-halflings-regular.eot': 'bootstrap-css-only/fonts/glyphicons-halflings-regular.eot',
            'bootstrap-css-only/fonts/glyphicons-halflings-regular.svg': 'bootstrap-css-only/fonts/glyphicons-halflings-regular.svg',
            'bootstrap-css-only/fonts/glyphicons-halflings-regular.ttf': 'bootstrap-css-only/fonts/glyphicons-halflings-regular.ttf',
            'bootstrap-css-only/fonts/glyphicons-halflings-regular.woff': 'bootstrap-css-only/fonts/glyphicons-halflings-regular.woff',
            'bootstrap-css-only/fonts/glyphicons-halflings-regular.woff2': 'bootstrap-css-only/fonts/glyphicons-halflings-regular.woff2',

            //Font Awesome
            'font-awesome/css/font-awesome.css': 'font-awesome/css/font-awesome.css',
            'font-awesome/fonts/FontAwesome.otf': 'font-awesome/fonts/FontAwesome.otf',
            'font-awesome/fonts/fontawesome-webfont.eot': 'font-awesome/fonts/fontawesome-webfont.eot',
            'font-awesome/fonts/fontawesome-webfont.svg': 'font-awesome/fonts/fontawesome-webfont.svg',
            'font-awesome/fonts/fontawesome-webfont.ttf': 'font-awesome/fonts/fontawesome-webfont.ttf',
            'font-awesome/fonts/fontawesome-webfont.woff': 'font-awesome/fonts/fontawesome-webfont.woff',
            'font-awesome/fonts/fontawesome-webfont.woff2': 'font-awesome/fonts/fontawesome-webfont.woff2',


            //ngMeta
            'ngMeta/dist/ngMeta.js': 'ngMeta/dist/ngMeta.js'
        }
    }
};