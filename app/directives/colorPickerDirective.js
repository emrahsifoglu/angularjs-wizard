/**http://jsfiddle.net/g/LAJCa/*/
var colorPickerDirective = function() {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: false,
        replace: true,
        template: "<span><input class='input-small' /></span>",
        link: function(scope, element, attrs, ngModel) {
            var input = element.find('input');
            var options = angular.extend({
                color: ngModel.$viewValue,
                change: function(color) {
                    scope.$apply(function() {
                        ngModel.$setViewValue(color.toHexString());
                    });
                }
            }, scope.$eval(attrs.options));

            ngModel.$render = function() {
                input.spectrum('set', ngModel.$viewValue || '');
            };

            input.spectrum(options);
        },
        controller: ['$scope', function($scope){
            $scope.targetColor = '0000000';
        }]
    };
};