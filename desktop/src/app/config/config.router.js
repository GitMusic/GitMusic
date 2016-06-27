'use strict';

app.run(['$rootScope', '$state', '$stateParams', 'ngMeta', function ($rootScope, $state, $stateParams, ngMeta) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    ngMeta.init();
}]).config(['$stateProvider', '$urlRouterProvider', 'ngMetaProvider', function ($stateProvider, $urlRouterProvider, ngMetaProvider) {

    ngMetaProvider.useTitleSuffix(true);
    ngMetaProvider.setDefaultTitle(app.name + " | ");
    ngMetaProvider.setDefaultTitleSuffix(app.version);
    ngMeta.setTag('description', '....');
    ngMetaProvider.setDefaultTag('author', app.authors.join(","));

    $urlRouterProvider.otherwise('/app/dashboard');
    $stateProvider
        .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: "views/app.html"
        })
        .state('app.dashboard', {
            url: '/dashboard',
            templateUrl: 'views/pages/dashboard.html'
        })
}]);
