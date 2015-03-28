'use strict';

/* Filters */

angular.module('myApp.filters', [])
  .filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }  
  }])

  .filter('formatTimer', function() {
    return function(input)
    {
        function z(n) {return (n<10? '0'  : '') + n;}
        var milsecs = input%100;
        var seconds = Math.floor(input/100)%60;
        var minutes = Math.floor(input/6000)%60;

        // var seconds = input% 60;
        // var minutes = Math.floor(input / 60)%60;
        // var hours = Math.floor(input / 3600)%24;
         var result ;
         //Display two digits when hours is 0, otherwise display three digits
         result =  (z(minutes) +':'+z(seconds)+'.'+z(milsecs));
        //Update the currentTime for lap record;
        // $scope.currentTime = result;
         return result;
    }
})

.filter('TimerformatTimer', function() {
  return function(input)
    {
        function z(n) {return (n<10? '0'  : '') + n;}
        var seconds = input % 60;
        var minutes = Math.floor(input / 60)%60;
        var hours = Math.floor(input / 3600)%24;
         var result ;
         //Display two digits when hours is 0, otherwise display three digits
        if(hours === 0){
               result = z(minutes)+':'+z(seconds);
            }else{
               result =  (z(hours) +':'+z(minutes)+':'+z(seconds));
            }
         return result;
    };
})

