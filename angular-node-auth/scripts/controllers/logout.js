'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp').controller('LogoutCtrl', function ($state, $auth, alert) {
    $auth.logout();
    alert('success', 'Goodbye!', 'Hope to see you soon');
    $state.go('main');
});
