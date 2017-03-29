var app = angular.module('global_tiles', []);

app.controller('tileCtrl', function($scope) {

    $scope.level = 0; // default zoom level

    $scope.tiles_array = [ // default 0 zoom level tile mapping array
         {row: 0, cols: [0, 1, 2, 3, 4, 5, 6, 7]},
         {row: 1, cols: [0, 1, 2, 3, 4, 5, 6, 7]},
         {row: 2, cols: [0, 1, 2, 3, 4, 5, 6, 7]},
         {row: 3, cols: [0, 1, 2, 3, 4, 5, 6, 7]}
    ];
});

app.directive('zoomDirective', function() { // custom directive to control zoom in and out
    return {
        restrict: 'EA',
        scope: {
            tiles_array: '=tiles',
            level: '=level'
        },
        templateUrl: './zoom_control.html',

        link: function(scope, element, attrs){

            //double the given array size
            function doubleArray(arr) {
                var double_arr = arr.slice(0);
                for (var i = 0; i < arr.length; i++) {
                    double_arr.push(double_arr.length)
                }
                return double_arr;
            }

            // split given array into half
            function splitArray(arr) {
                var half_arr = arr.slice(0, arr.length / 2);
                return half_arr;
            }

            // expands tile mapping object in response to zoom in
            scope.zoom_in = function(level){
                if (level < 4) {
                    scope.level++;
                    var length = scope.tiles_array.length;
                    for (var i = 0; i < length; i++) {
                        var newRow = {row: scope.tiles_array.length, cols: doubleArray(scope.tiles_array[i].cols)}
                        scope.tiles_array.push(newRow);
                        scope.tiles_array[i].cols = doubleArray(scope.tiles_array[i].cols)
                    }
                }
            };

            // shrinks tile mapping object in response to zoom out
            scope.zoom_out = function(level){
                if (level > 0) {
                    scope.level--;
                    scope.tiles_array = splitArray(scope.tiles_array);
                    for (var j = 0; j < scope.tiles_array.length; j++) {
                        scope.tiles_array[j].cols = splitArray(scope.tiles_array[j].cols);
                    }
                }
            }
        }
    }
});