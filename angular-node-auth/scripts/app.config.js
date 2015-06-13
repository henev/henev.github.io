angular.module('psJwtApp')
    .config(function($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL) {

        $urlRouterProvider.otherwise('/');

        var sitePrefix = '/angular-node-auth';

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: sitePrefix + '/views/main.html'
            })

            .state('register', {
                url: '/register',
                templateUrl: sitePrefix + '/views/register.html',
                controller: 'RegisterCtrl'
            })

            .state('login', {
                url: '/login',
                templateUrl: sitePrefix + '/views/login.html',
                controller: 'LoginCtrl'
            })

            .state('logout', {
                url: '/logout',
                controller: 'LogoutCtrl'
            })

            .state('jobs', {
                url: '/jobs',
                templateUrl: sitePrefix + '/views/jobs.html',
                controller: 'JobsCtrl'
            });

        $authProvider.google({
            clientId: '537402726188-cps7intsrkusstgudu3h7s7oflef7di5.apps.googleusercontent.com',
            url: API_URL + 'auth/google',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host + '/angular-node-auth/'
        });

        $authProvider.facebook({
            clientId: '840358282720715',
            url: API_URL + 'auth/facebook'
        });

        $authProvider.withCredentials = false;
        $authProvider.loginUrl = API_URL + 'auth/login';
        $authProvider.signupUrl = API_URL + 'auth/register';

        $httpProvider.interceptors.push('authInterceptor');
    })

    .constant('API_URL', 'http://angular-node-auth-api.herokuapp.com/')

    .run(function($window) {
        var params = $window.location.search.substring(1);

        if (params && $window.opener && $window.opener.location.origin === $window.location.origin) {
            var pair = params.split('=');
            var code = decodeURIComponent(pair[1]);

            $window.opener.postMessage(code, $window.location.origin);
        }
    });