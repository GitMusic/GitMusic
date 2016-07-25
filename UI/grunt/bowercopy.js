module.exports = {
    options: {
        clean: true
    },
    libs: {
        options: {
            destPrefix: 'src/vendor'
        },
        files: {
            // Angular Material Icons
            'angular-material-icons/js/angular-material-icons.js': 'angular-material-icons/angular-material-icons.js',

            //Angular
            'angular/js/angular.js': 'angular/angular.js',

            //Angular UI Router
            'angular-ui-router/release/angular-ui-router.js': 'angular-ui-router/release/angular-ui-router.js',

            //ngMeta
            'ngMeta/dist/ngMeta.js': 'ngMeta/dist/ngMeta.js'
        }
    }
};
