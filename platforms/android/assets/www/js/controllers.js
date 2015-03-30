'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

    .controller('mainCtrl', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {
        //flag
        $rootScope.load = false;

        $scope.getClass = function (path) {
            if ($location.path().substr(0, path.length) === path) {
                return "active";
            } else if ($location.path().substr(0, path.length) === "/addcity") {
                if (path === "/worldclock") {
                    return "active";
                }
            }
            else {
                return "";
            }
        }
        $scope.isSelected = function (path) {
            var isselected = ($location.path().substr(0, path.length) === path);
            return isselected;

        }

        $rootScope.selectPath = "worldclock";
        $rootScope.isshowpath = function (path) {
            //console.log( $rootScope.selectPath === path);
            // console.log("current path: " + $location.path());
            // console.log("passing path " + path);
            var curpath = $location.path();
            //all other url will go to world clock
            if (path === "/worldclock" && curpath != '/worldclock' && curpath != '/timer' && curpath != '/stopwatch' && curpath != '/addcity') {
                $location.path("/worldclock");
                return true;
            }
            if (curpath != "/worldclock" && $rootScope.load == false) {
                $location.path("/worldclock");
            }

            var isshow = curpath === path;
            // console.log(isshow);
            return isshow;
            //return $rootScope.selectPath === path;
        }


        $rootScope.isshowworldclock = function () {
            // if($location.path.indexOf('worldclock')> -1){
            //   console.log("show worldclock");
            // }else{
            //   console.log("not worldclock");
            // }
            // console.log($location.path().toString());
            // var path = $location.path();
            // var isshow =  (path ==='/worldclock');
            // console.log("show worldclock " + isshow);
            // return isshow;
        }


        $scope.clickstopwatch = function () {
            $location.path("/stopwatch")
            $rootScope.selectPath = "stopwatch";
        }
        $scope.clicktimer = function () {
            $location.path("/timer")
            $rootScope.selectPath = "timer";
        }
        $scope.clickworldclock = function () {
            $location.path("/worldclock")
            $rootScope.selectPath = "worldclock";
        }
    }])
    //******** STOP WATCH CONTROLLER **********
    .controller('stopwatchCtrl', ['$scope', '$timeout', '$filter', function ($scope, $timeout, $filter) {

        var defcounter = 0;
        var mytimeout;
        var START_TEXT = 'Start';
        var STOP_TEXT = 'Stop';
        var RESET_TEXT = 'Reset';
        var LAP_TEXT = 'Lap';
        var currentTime; //to store the current time on main stop watch
        $scope.laps = [];
        $scope.counter = defcounter;
        $scope.counterSec = defcounter;
        $scope.stopped = false;
        $scope.startted = false;
        $scope.lapbuttonText = LAP_TEXT;
        $scope.startbuttonText = START_TEXT;
        $scope.sstartColor = 'green';
        $scope.spauseColor = 'lightgray';

        //---------Functions--------
        $scope.onTimeout = function () {

            $scope.counter++;
            $scope.counterSec++;

            mytimeout = $timeout($scope.onTimeout, 10);

        }


        $scope.startBtnEvent = function () {
            if (!$scope.startted) {

                $scope.start();
            } else {
                $scope.stop();
            }
        }

        $scope.pauseBtnEvent = function () {
            //only active Pause button when timer has already started
            if ($scope.startted) {
                $scope.lap();
            } else {
                $scope.reset();
            }
        }

        $scope.start = function () {
            $scope.startted = !$scope.startted;
            $scope.startbuttonText = STOP_TEXT;
            $scope.lapbuttonText = LAP_TEXT;
            $scope.sstartColor = 'red';
            $scope.spauseColor = 'black';
            mytimeout = $timeout($scope.onTimeout, 10);
        }

        $scope.stop = function () {
            $timeout.cancel(mytimeout);
            $scope.lapbuttonText = RESET_TEXT;
            $scope.startbuttonText = START_TEXT;
            $scope.startted = !$scope.startted;
            $scope.sstartColor = 'green';
            $scope.spauseColor = 'black';
        }


        $scope.lap = function () {
            //NOTES: use filter inside function directly
            currentTime = $filter('formatTimer')($scope.counterSec);
            $scope.laps.push(currentTime);
            $scope.counterSec = defcounter;

        }

        $scope.reset = function () {
            $timeout.cancel(mytimeout);
            $scope.lapbuttonText = LAP_TEXT;
            $scope.startbuttonText = START_TEXT;
            $scope.counter = defcounter;
            $scope.counterSec = defcounter;
            $scope.startted = false;
            $scope.laps = [];
            $scope.sstartColor = 'green';
            $scope.spauseColor = 'lightgray';
        }

    }])
//*********** TIMER CONTROLLER *********
    .controller('timerCtrl', function ($scope, $timeout) {

        $scope.hoursinput = 0;
        $scope.minsinput = 0;
        $scope.counter = defcounter;
        $scope.stopped = false;
        $scope.startted = false;
        $scope.pausebuttonText = 'Pause';
        $scope.startbuttonText = 'Start';
        $scope.startColor = 'green';
        $scope.pauseColor = 'lightgray';

        var defcounter = 0;
        var mytimeout;

        //---------Functions--------
        $scope.onTimeout = function () {
            if ($scope.counter !== 0) {
                $scope.counter--;
                mytimeout = $timeout($scope.onTimeout, 1000);
            } else {

            }
        }
        $scope.reset = function () {
            $timeout.cancel(mytimeout);
            $scope.pausebuttonText = 'Pause';
            $scope.startbuttonText = 'Start';
            $scope.counter = defcounter;
            $scope.startted = false;
            $scope.startColor = 'green';
            $scope.pauseColor = 'lightgray';
        }
        $scope.start = function () {
            if ($scope.hoursinput === 0 && $scope.minsinput === 0) return;
            if (!$scope.startted) {
                //get input hours and minutes from html, and calculate the initial value of countdown time
                $scope.counter = $scope.hoursinput * 3600 + $scope.minsinput * 60;
                mytimeout = $timeout($scope.onTimeout, 1000);
                $scope.startted = true;
                $scope.startbuttonText = 'Cancel';
                $scope.startColor = 'red';
                $scope.pauseColor = 'black';
            } else {
                $scope.reset();
            }
        }
        $scope.resume = function () {
            mytimeout = $timeout($scope.onTimeout, 1000);
            $scope.pausebuttonText = 'Pause';
        }
        $scope.pause = function () {
            //only active Pause button when timer has already started
            if ($scope.startted) {
                if (!$scope.stopped) {
                    $timeout.cancel(mytimeout);
                    $scope.pausebuttonText = 'Resume';
                    $scope.pauseColor = 'black';
                    $scope.startColor = 'red';
                }
                else {
                    $scope.resume();
                }
                $scope.stopped = !$scope.stopped;
            }
        }

    })

//****** WORLD CLOCK CONTROLLER *******
    .controller('worldclockCtrl', function ($scope, $timeout, $filter, $http, $rootScope, $location) {


        var currentTime; //to store the current time on main stop watch
        var refreshtime;
        //$scope.worldtime = $rootScope.worldtimeData;
        $scope.timeLeftBeforeMidnight; // time left before tomorrow
        $scope.timePassedSinceMidnight; // time passed since today

        $scope.utcTime = new Date().getTime();
        $scope.updateTime = new Date().getTime();
        $scope.isEditing = false;
        $scope.editOrDone = "EDIT";
        $rootScope.hostname = "http://assignment4yishu.herokuapp.com/";
//        var URL = 'http://coen268.peterbergstrom.com/timezones.php?callback=JSON_CALLBACK';
       // var URL = 'http://localhost:3000/api/cities?callback=JSON_CALLBACK';
        var URL =  $rootScope.hostname + "api/cities?callback=JSON_CALLBACK";
        //Get the world clock data from API
        $rootScope.fetchWorldtimedata = function () {
            //change load flag
            $rootScope.load = true;
            $http({method: 'JSONP', url: URL}).
                success(function (data, status) {
                    $scope.status = status;
                    $scope.data = data;
                    $rootScope.worldtimeData = data;
                    console.log("fetching data");
                    console.log($scope.data);
                }).
                error(function (data, status) {
                    $scope.data = data;
                    $scope.status = status;
                    console.log(data);
                    console.log(status);
                });
            // $http.jsonp(URL).success(function(data){
            //   $scope.realTimeData = data;
            //   console.log("ki")
            //   console.log($scope.realTimeData);
            // })
            // .error(function(data,status,header){
            //    console.log("error");
            //    console.log(status);
            //    console.log(data);
            //    console.log(header);
            // })
        };
        $rootScope.fetchWorldtimedata();
        // calculate the time left before tomorrow
        // and time passed since today
        $scope.midnight = function () {
            var d = new Date();
            var e = new Date(d);
            var t = new Date(d.getTime() + 86400000);

            var dis = t.setHours(0, 0, 0, 0) - d;
            var diff = d - e.setHours(0, 0, 0, 0);
            $scope.timePassedSinceMidnight = diff / 1000 / 60 / 60;
            $scope.timeLeftBeforeMidnight = dis / 1000 / 60 / 60;
        }

        $scope.localtime = function (timezoneOffset) {
            //utcTime + (place.timezoneOffset + 420)*6000
            var utc = new Date().getTime();
            utc = utc + (timezoneOffset + 420) * 6000;
            $scope.updateTime = utc;
        }


        //---------Functions--------
        $scope.onTimeout = function () {
            $scope.utcTime = new Date().getTime();
            $scope.midnight();
            //TODO: need to change it into 10000 - 10 seconds
            refreshtime = $timeout($scope.onTimeout, 1000);

        }
        // decide if the input time is ahead or behind the localtime
        $scope.timeDetail = function (place) {
            var result = 'Today';

            if ((place.timezoneOffset + 420) > 0) {

                if ((place.timezoneOffset + 420) / 60 > $scope.timeLeftBeforeMidnight) {
                    result = 'Tomorrow';
                } else if (((place.timezoneOffset + 420) / 60) < $scope.timeLeftBeforeMidnight) {
                    result = 'Today';
                }
                result += ', ' + (place.timezoneOffset + 420) / 60 + ' hours ahead';

            } else if ((place.timezoneOffset + 420) < 0) {
                if ((place.timezoneOffset + 420) / 60 > $scope.timePassedSinceMidnight) {
                    result = 'Yesterday';
                } else if ((place.timezoneOffset + 420) / 60 < $scope.timePassedSinceMidnight) {
                    result = 'Today';
                }
                result += ', ' + (place.timezoneOffset + 420) / 60 + ' hours behind';
            }
            return result;
        };

        $scope.calculateWorldTime = function (place) {
            return   $scope.utcTime + (place.timezoneOffset + 420) * 60000;
        };
        //add city
        $scope.clickaddcity = function () {
            $location.path("/addcity")
            $rootScope.selectPath = "addcity";
        }

        $scope.editcity = function () {
            if (!$scope.isEditing) {

                $scope.isEditing = true;
                $scope.editOrDone = "DONE";
            } else {
                $scope.editOrDone = "EDIT";
                $scope.isEditing = false;

            }
        }

        $scope.deleteCity = function (city) {
            //Only in editing mode, it works
            if ($scope.isEditing) {
                //REMOVE CITY just from UI, not from DB
//                var index = $rootScope.worldtimeData.indexOf(city);
//                console.log("city index: " + index );
//                if(index>-1){
//                    $rootScope.worldtimeData.splice(index,1);
//                }
                console.log("is Edingting? " + $scope.isEditing)
                $scope.deleteCityFromAPI(city);
            }
        }


        var deleteUrl =  $rootScope.hostname + "api/cities";
        $scope.deleteCityFromAPI = function (city) {
            console.log("delete city id from UI: " + city.id);
            $http({method: 'PUT', url: deleteUrl,
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
                    console.log("Deleting data");
                    console.log($scope.data);
                    //NOTES: refresh view when deleting city is done
                    $rootScope.fetchWorldtimedata()
                }).
                error(function (data, status) {
                    $scope.data = data;
                    $scope.status = status;
                    console.log(data);
                    console.log(status);
                });
        }
    });
