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




