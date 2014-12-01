var wizardDirective = function(){
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            onBeforeStepChange: '&',
            onStepChanging: '&',
            onAfterStepChange: '&'
        },
        templateUrl: 'wizard.html',
        replace: true,
        link: function(scope) {
            scope.header = "AngularJS Wizard Example";
            scope.currentStepIndex = 0;
            scope.isPrevNavButton = false;
            scope.isNextNavButton = false;
            scope.$emit('wizardLoaded');
        },
        controller: ['$scope', function ($scope) {
            $scope.steps = [];
            $scope.isLastNavButton = true;
            this.registerStep = function(step){
                $scope.steps.push(step);
            };

            $scope.$on('showStep', function(event, param) {
                showStep(param);
            });

            $scope.$on('buttonEnable', function(event, btn, visible) {
                if (btn == 'next'){
                    $scope.isNextNavButton = visible;
                } else if (btn == 'last') {
                    $scope.isLastNavButton = visible;
                } else if (btn == 'prev') {
                    $scope.isPrevNavButton = visible;
                }
            });

            $scope.showNextStep = function(){
                toggleSteps($scope.currentStepIndex + 1);
            };

            $scope.showPreviousStep = function(){
                toggleSteps($scope.currentStepIndex - 1);
            };

            $scope.hasNext = function(){
                return $scope.currentStepIndex < ($scope.steps.length - 1);
            };

            $scope.hasPrevious = function(){
                return $scope.currentStepIndex > 0;
            };

            $scope.lastStep = function(){
                return $scope.currentStepIndex == ($scope.steps.length - 1);
            };

            $scope.send = function(){
                $scope.$emit('send');
            };

            function newEvent(name, from, to){
                return  {event : { name: name, step: { from: (from + 1), to: (to + 1) }}};
            }

            function showStep(step){
                if ((step > 0) && (step <= $scope.steps.length)) {
                    toggleSteps(step - 1);
                }
            }

            function toggleSteps(showIndex){
                if($scope.onBeforeStepChange){
                    $scope.isPrevNavButton = false;
                    $scope.isNextNavButton = false;
                    $scope.steps[$scope.currentStepIndex].currentStep = false;
                    $scope.onBeforeStepChange(newEvent('before', $scope.currentStepIndex, showIndex));
                }

                if($scope.onStepChanging){
                    $scope.onStepChanging(newEvent('changing', $scope.currentStepIndex, showIndex));
                }

                $scope.currentStepIndex = showIndex;
                if($scope.onAfterStepChange ) {
                    $scope.steps[$scope.currentStepIndex].currentStep = true;
                    $scope.isPrevNavButton = true;
                    $scope.isNextNavButton = false;
                    $scope.onAfterStepChange(newEvent('change', $scope.currentStepIndex, showIndex));
                }
            }
         }]
    };
};