'use strict';

/* Controllers */

angular.module('myApp.addcityCtrl', [])

    .controller('addcityCtrl', ['$scope', '$location', '$rootScope', '$http', '$timeout', function ($scope, $location, $rootScope, $http, $timeout) {
        var DEFAULT_TYPE_REMIND_LABEL = "Please type to find a City";
        var KEEPTYPING = "Keep typing...";
        var NO_THIS_CITY = "No results found, try another city."
        var urlPrefix = "http://coen268.peterbergstrom.com/timezones.php?callback=JSON_CALLBACK&search=";

        $scope.typeremindlabel = DEFAULT_TYPE_REMIND_LABEL;
        $scope.cityname = "";
        $scope.citynameFirstLetter = "";
        $scope.citynamemap = {};
        $scope.citydata = [];
        $scope.showtyperemindlabel = true;
        $rootScope.worldtimeData = [];


        //add city
        $scope.canceladdcity = function () {

            $location.path("/worldclock")
            $rootScope.selectPath = "worldclock";
        }

        $scope.autocomplete = function () {


            //!!!Delay some time before run the autocomplete,
            // to avoid api request return after next autocomplete is trigger
            $timeout(function () {
                $scope.citydata = [];
                $scope.citynamemap = {};
                $scope.typeremindlabelHandler();
                console.log("auto")
                if ($scope.cityname && $scope.cityname.length > 1) {
                    $scope.showtyperemindlabel = false; //disable

                    console.log("run fetch");
                    $scope.fetchWorldtimedata();

                }
            }, 500);


        }

        $scope.fetchWorldtimedata = function () {

            $scope.citydata = [];

            var searchUrl = urlPrefix + $scope.cityname;
            console.log(searchUrl);
            $http({method: 'JSONP', url: searchUrl}).
                success(function (data, status) {
                    $scope.status = status;
                    $scope.citydata = data;
                    if ($scope.citydata.length === 0) {
                        $scope.showtyperemindlabel = true;
                        $scope.typeremindlabel = NO_THIS_CITY;
                    }

                    //  $scope.typeremindlabel= data;
                    console.log($scope.citydata);
                }).
                error(function (data, status) {
                    $scope.data = data;
                    $scope.status = status;
                    console.log(data);
                    console.log(status);

                });

        };


        $scope.typeremindlabelHandler = function () {

            $scope.showtyperemindlabel = true;

            if ($scope.cityname && $scope.cityname.length > 1) {
                $scope.showtyperemindlabel = false; //disable
            }

            if (!$scope.cityname) {
                $scope.typeremindlabel = DEFAULT_TYPE_REMIND_LABEL;
            }

            if ($scope.cityname && $scope.cityname.length === 1) {
                $scope.typeremindlabel = KEEPTYPING;
            }
        }


        $scope.showfirstletter = function (city) {
            var firstletter = city.cityName.substring(0, 1);

            if (firstletter in $scope.citynamemap) {
                console.log($scope.citynamemap[firstletter]);
                return firstletter;
            } else {

                $scope.citynamemap[firstletter] = firstletter;
                console.log(city.cityName);
                return "";
            }
        }


        $scope.clickCity = function (city) {
            console.log("click: " + city.cityName);
            $location.path("/worldclock")
            $rootScope.selectPath = "worldclock";
            //TODO: make it function to call API add city
            //$rootScope.worldtimeData.push(city);
            $scope.addCityToApi(city);
            ;
            console.log($rootScope.worldtimeData);
        }

        var addUrl =  $rootScope.hostname + "api/cities";
//        var URL = 'http://localhost:3000/api/cities';

        $scope.addCityToApi = function (city) {
            $http({method: 'POST', url: addUrl,
                data: {
                    'id': city.id,
                    'cityName': city.cityName,
                    'timezoneName': city.timezoneName,
                    'timezoneOffset': city.timezoneOffset
                }
            }).
                success(function (data, status) {
                    $scope.status = status;
                    $scope.data = data;
                    //$rootScope.worldtimeData = data;
                    console.log("adding data");
                    console.log($scope.data);
                    //NOTES: refresh view when adding city is done
                    $rootScope.fetchWorldtimedata()
                }).
                error(function (data, status) {
                    $scope.data = data;
                    $scope.status = status;
                    console.log(data);
                    console.log(status);
                });
        }



    },
    ])