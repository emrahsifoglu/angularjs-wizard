var stepDirective = function(){
    return {
        require: "^wizard",
        restrict: 'E',
        transclude: true,
        scope: {
            title: '@'
        },
        templateUrl: 'step.html',
        replace: true,
        link: function(scope, element, attrs, wizardController){
            wizardController.registerStep(scope);
        }
    };
};