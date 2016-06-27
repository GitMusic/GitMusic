'use strict';

app.controller('App', ['$scope', function ($scope) {
    $scope.app = {
        name: 'ThreatVu',
        version: '1.0.0',
        authors: [
            'Kurt Bruneau',
            'Matt Langlois'
        ]
    };
}]);
