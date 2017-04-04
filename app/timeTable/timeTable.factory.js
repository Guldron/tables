;
(function(){
        'use strict';

        function getStatistic() {

                return {
                        getLinksPerHour: getLinksPerHour,
                        getCartsPerHour: getCartsPerHour,
                        getRepostsPerHour: getRepostsPerHour
                }
        }

        angular
                .module('app')
                .factory('getStatistic', getStatistic);

})();
