'use strict';

/**
 * @ngdoc service
 * @name psJwtApp.auth
 * @description
 * # auth
 * Service in the psJwtApp.
 */

// REPLACED WITH THIRD PARTY LIB - SATELLIZER
angular.module('psJwtApp').service('auth', function ($http, $state, $window, $q, authToken, API_URL) {
    function authSuccessful(res) {
        authToken.setToken(res.token);
        $state.go('main');
    }

    this.login = function(email, password) {

        return $http.post(API_URL + 'login', {
            email: email,
            password: password
        })
        .success(authSuccessful);
    };

    this.register = function(email, password) {

        return $http.post(API_URL + 'register', {
            email: email,
            password: password
        })
        .success(authSuccessful);
    };

    var clientId = '537402726188-mghte0unil0k58ubio7ruuo2me5b0a8l.apps.googleusercontent.com';
    var urlBuilder = [];
    urlBuilder.push('response_type=code',
                    'client_id=' + clientId,
                    'redirect_uri=' + window.location.origin,
                    'scope=profile email');

    this.googleAuth = function() {
        // Url for Google authentication
        var url = 'https://accounts.google.com/o/oauth2/auth?' + urlBuilder.join('&');
        // Options for popup window
        var options = 'width=500, height=500, left=' + ($window.outerWidth - 500) / 2 +
            ', top=' + ($window.outerHeight - 500) / 2.5;

        // Used to create promise and return it to chain then()
        // We cannot return $http because it is in event handler callback
        // Deferred promise will be returned and because $http is async it will wait until
        // the call succeed and deferred resolve
        var deferred = $q.defer();

        var popup = $window.open(url, '', options);
        $window.focus();

        $window.addEventListener('message', handleMessageEvent);

        function handleMessageEvent(event) {
            if (event.origin === $window.location.origin) {
                var code = event.data;
                popup.close();

                $http.post(API_URL + 'auth/google', {
                    code: code,
                    clientId: clientId,
                    redirectUri: $window.location.origin
                })
                .success(function(res) {
                    authSuccessful(res);
                    // resolve the promise
                    deferred.resolve(res);
                });
            }

            $window.removeEventListener('message', handleMessageEvent);
        }

        // return the promise
        return deferred.promise;
    };
});
