'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp').controller('LoginCtrl', function ($scope, alert, $auth) {
    $scope.submit = function () {

        $auth.login({ email: $scope.email, password: $scope.password })
            .then(function(res) {
                var message = 'Thanks for coming back, ' + res.data.user.email + '!';

                if (!res.data.user.active) {
                    message = 'Just a reminder, please activate your account soon :)';
                } else {

                }

                alert('success', 'Welcome', message);
            })
            .catch(handleError);
    };

    $scope.authenticate = function(provider) {
        // Google Auth returns promise
        $auth.authenticate(provider).then(function(res) {
            alert('success', 'Welcome', 'Thanks for coming back, ' + res.data.user.displayName + '!');
        }, handleError);
    };

    function handleError(err, status) {
        alert('warning', 'Something went wrong :(', err ? err.data.message : '');
        console.log(status);
        console.log(err);
    }
});
