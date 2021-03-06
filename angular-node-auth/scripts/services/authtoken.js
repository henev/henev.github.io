'use strict';

/**
 * @ngdoc service
 * @name psJwtApp.authToken
 * @description
 * # authToken
 * Factory in the psJwtApp.
 */
angular.module('psJwtApp').factory('authToken', function ($window) {
    var storage = $window.localStorage;
    var cachedToken;
    var storageKey = 'userToken';

    var authToken = {
        setToken: function(token ) {
            cachedToken = token;
            storage.setItem(storageKey, token);
        },
        getToken: function() {
            if (!cachedToken) {
                cachedToken = storage.getItem(storageKey);
            }

            return cachedToken;
        },
        isAuthenticated: function() {

            return !!authToken.getToken();
        },
        removeToken: function() {
            cachedToken = null;
            storage.removeItem(storageKey);
        }
    };

    return authToken;
});
