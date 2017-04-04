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