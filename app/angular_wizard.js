(function(){
    "use strict";
    var ngWizard = angular.module('ngWizard', ['ngRoute', 'ngAnimate','ezfb']);
    var settings = {
        app     : { header : 'header', footer : 'footer' },
        wizard  : {
            steps : {
                step1 : { title : 'Step 1' },
                step2 : { title : 'Step 2' },
                step3 : { title : 'Step 3' },
                step4 : { title : 'Step 4' },
                step5 : { title : 'Step 5' }
            }
        }
    };

    var version = function (VERSION){
        console.log(VERSION);
    };

    ngWizard.constant('VERSION', '1.0');
    ngWizard.value('settings', settings);
    ngWizard.config(ezfbProvider);
    ngWizard.config(routeProvider);
    ngWizard.service('itunesService', itunesService);
    ngWizard.directive('step', stepDirective);
    ngWizard.directive('wizard', wizardDirective);
    ngWizard.directive('uiColorpicker', colorPickerDirective);
    ngWizard.directive('aDisabled', aDisabledDirective);
    ngWizard.directive('formDrctv', formValidatonDirective);
    ngWizard.controller('appController', appController);
    //ngWizard.bootstrap(document, ['ngWizard']); //?

})();