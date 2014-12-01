/**http://plnkr.co/edit/r8b3YH6kvdH18T1xAzBK?p=preview
 * http://plnkr.co/edit/6FxMS4RlfljBMkprZYQs
 * */
var formValidatonDirective = function() {
    return function(scope, el, attrs) {
        scope.$watch(attrs.name + '.$valid', function (newValue, oldValue) {
            if (newValue != oldValue) scope.$emit('formValid', newValue);
        }, true);
    }
};