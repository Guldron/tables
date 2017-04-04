;
(function(){
        'use strict';

        function timeTable () {
                function link(scope, element, attrs) {

                }

                return {
                        restrict: 'AE',
                        templateUrl: 'templates/timeTable.directive.html',
                        link: link,
                        controller: 'timeTableController',
                        controllerAs: 'timeTable'
                }
        }

        angular
                .module('app')
                .directive('timeTable', timeTable)
})();