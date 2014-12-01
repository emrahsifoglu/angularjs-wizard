/**http://plnkr.co/edit/s7XFanpkIWzsrKX80dA9*/
var aDisabledDirective =  function() {
    return {
        compile: function(tElement, tAttrs, transclude) {
            //Disable href, based on class
            tElement.on("click", function(e) {
                if (tElement.hasClass("disabled")) {
                    e.preventDefault();
                }
            });

            //Disable ngClick
            tAttrs["ngClick"] = ("ng-click", "!("+tAttrs["aDisabled"]+") && ("+tAttrs["ngClick"]+")");

            //Toggle "disabled" to class when aDisabled becomes true
            return function (scope, iElement, iAttrs) {
                scope.$watch(iAttrs["aDisabled"], function(newValue) {
                    if (newValue !== undefined) {
                        iElement.toggleClass("disabled", newValue);
                    }
                });
            };
        }
    }};