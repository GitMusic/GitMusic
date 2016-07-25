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

            //Angular UI Router
            'angular-ui-router/release/angular-ui-router.js': 'angular-ui-router/release/angular-ui-router.js',

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
