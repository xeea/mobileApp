angular.module('app.directives', [])

//slider fix provided from @ArTiSTiX
//https://github.com/driftyco/ionic/issues/318
.directive('range', function rangeDirective() {
    return {
        restrict: 'C',
        link: function (scope, element, attr) {
            element.bind('touchstart mousedown', function(event) {
                event.stopPropagation();
                event.stopImmediatePropagation();
            });
        }
    };
 });