'use strict';

app.run(['$rootScope', '$state', '$stateParams', 'ngMeta', function ($rootScope, $state, $stateParams, ngMeta) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    ngMeta.init();
}]).config(['$stateProvider', '$urlRouterProvider', 'ngMetaProvider', function ($stateProvider, $urlRouterProvider, ngMetaProvider) {

    ngMetaProvider.useTitleSuffix(true);
    ngMetaProvider.setDefaultTitle(app.metadata.name + " | ");
    ngMetaProvider.setDefaultTitleSuffix(app.metadata.version);
    ngMetaProvider.setDefaultTag('author', app.metadata.authors.join(","));

    $urlRouterProvider.otherwise('/app/dashboard');
    $stateProvider
        .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: "views/app.html"
        })
        .state('app.dashboard', {
            url: '/dashboard',
            templateUrl: 'views/pages/dashboard.html',
            meta: {
                titleSuffix: 'Dashboard',
                description: 'Main application'
            }
        })
}]);
