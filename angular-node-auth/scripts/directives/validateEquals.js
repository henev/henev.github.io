'use strict';

angular.module('psJwtApp').directive('validateEquals', function() {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {

            ctrl.$setValidity('noMatch', true);

            attrs.$observe('validateEquals', function (newVal) {
                if (newVal === 'true') {
                    ctrl.$setValidity('noMatch', true);
                } else {
                    ctrl.$setValidity('noMatch', false);
                }
            });
        }
    }
});
