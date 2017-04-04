;
(function () {

    'use strict';

    angular
        .module('app', [])
})();
;
(function () {

    'use strict';

    angular
        .module('app')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http'];

    function dataservice($http) {

        return {
            getData: getData,
        };

        function getData(url) {
            return $http.get(url)
                .then(function(data){
                    return data.data;
                });
        };

    }
})();
;
(function () {
        'use strict';

        totalStatisticController.$inject = ['$scope', 'dataservice'];

        function totalStatisticController($scope, dataservice) {

                var url = 'https://api.dals.media/get-materials-to-publishing?days=-2&group_id=1';


                dataservice.getData(url)
                        .then(function (data) {

                                $scope.totalLinks = 0;
                                $scope.carts = 0;
                                $scope.reposts = 0;
                                $scope.verticals = {};



                                for (var i = 0, l = data.length; i < l; i += 1) {
                                        if (data[i].posts.length > 0) {

                                                data[i].posts.forEach(function(item){
                                                        $scope.totalLinks++;

                                                        if (item.material_type === 'cart') {
                                                                $scope.carts++;
                                                        } else if (item.material_type === 'repost') {
                                                                $scope.reposts++;
                                                        }       // ask about archive



                                                        if ($scope.verticals.hasOwnProperty(item.vertical)) {
                                                                $scope.verticals[item.vertical]++;
                                                        } else {
                                                                $scope.verticals[item.vertical] = 0;
                                                        }
                                                });

                                        }

                                }

                                $scope.cartsPercent = Math.round($scope.carts/$scope.totalLinks*100.);
                                $scope.reportsPercent = Math.round($scope.reposts/$scope.totalLinks*100);
                        })

        }


        angular
                .module('app')
                .controller('totalStatisticController', totalStatisticController)
})();


// $scope.totalForDay = 0;
// $scope.vertical = [];
// data.forEach(function(item) {
//
//     if(item.posts.length > 0) {
//
//         item.posts.forEach(function (item) {
//             $scope.totalForDay += 1;
//             function uniqueVertical(item){
//
//             }
//         });
//     }
// });
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
;
(function () {
        'use strict';

        timeTableController.$inject = ['$scope', 'dataservice'];

        function timeTableController($scope, dataservice) {

                var url = 'https://api.dals.media/get-materials-to-publishing?days=-2&group_id=1';


                dataservice.getData(url)
                        .then(function (data) {
                                        $scope.tableData = data;
                                        $scope.dayTime = {};
                                        $scope.getLinksPerHour = getLinksPerHour;
                                        $scope.getCartsPerHour = getCartsPerHour;
                                        $scope.getRepostsPerHour = getRepostsPerHour;


                                        for (var i = 0; i < 24; i += 1) {
                                                $scope.dayTime[i] = [];
                                        }

                                        data.forEach(function (item) {
                                                if (item.time.split(':')[0].substring(0, 1) === '0') {
                                                        $scope.dayTime[item.time.split(':')[0].substring(1, 2)].push(item);
                                                } else {
                                                        $scope.dayTime[item.time.split(':')[0]].push(item);
                                                }
                                        });

                                        function getStatistic(hour){
                                                var links = checkArray(hour, 'post_type', 'link');
                                                var carts = checkArray(hour, 'material_type', 'cart');
                                                var repost = checkArray(hour, 'material_type', 'repost');
                                                return {
                                                        getValue: getValue
                                                };

                                                function getValue(){
                                                        console.log(links);
                                                }
                                        }
                                        function getLinksPerHour(hour) {
                                                var links = checkArray(hour, 'post_type', 'link');
                                                return links;
                                        }

                                        function getCartsPerHour(hour) {
                                                var carts = checkArray(hour, 'material_type', 'cart');
                                                return carts;
                                        }

                                        function getRepostsPerHour(hour) {
                                                var repost = checkArray(hour, 'material_type', 'repost');
                                                return repost;
                                        }

                                        function checkArray(index, searchType, searchItem) {
                                                var value = 0;
                                                for (var i = 0, l = $scope.dayTime[index].length; i < l; i += 1) {
                                                        $scope.dayTime[index][i].posts.forEach(function (item) {
                                                                if (item[searchType] === searchItem) {
                                                                        value++
                                                                }
                                                        })
                                                }
                                                return value;

                                        }

                                var test = getStatistic(1);
                                        test.getValue()


                                }
                        )


        }

        angular
                .module('app')
                .controller('timeTableController', timeTableController)
})();





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