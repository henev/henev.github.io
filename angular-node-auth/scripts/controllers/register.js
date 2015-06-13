'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp').controller('RegisterCtrl', function ($scope, alert, $auth) {
    $scope.submit = function () {

        $auth.signup({ email: $scope.email, password: $scope.password })
            .then(function(res) {
                alert('success', 'Account created!', 'Welcome, ' + res.data.user.email + '! Please email activate your account in the next several days!');
            })
            .catch (function(err, status) {
                alert('warning', 'Something went wrong :(', err ? err.data.message : '');
                console.log(status);
                console.log(err);
            });
    };
});
