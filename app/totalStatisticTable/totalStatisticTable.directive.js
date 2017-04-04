;
(function(){
    'use strict';

    function totalStatistic () {
        function link(scope, element, attrs) {

        }

        return {
            restrict: 'AE',
            templateUrl: 'templates/totalStatisticTable.directive.html',
            link: link,
            controller: 'totalStatisticController',
            controllerAs: 'totalStatistic'
        }
    }

    angular
        .module('app')
        .directive('totalStatistic', totalStatistic)
})();