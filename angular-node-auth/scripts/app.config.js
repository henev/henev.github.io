angular.module('psJwtApp')
    .config(function($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: '/views/main.html'
            })

            .state('register', {
                url: '/register',
                templateUrl: '/views/register.html',
                controller: 'RegisterCtrl'
            })

            .state('login', {
                url: '/login',
                templateUrl: '/views/login.html',
                controller: 'LoginCtrl'
            })

            .state('logout', {
                url: '/logout',
                controller: 'LogoutCtrl'
            })

            .state('jobs', {
                url: '/jobs',
                templateUrl: '/views/jobs.html',
                controller: 'JobsCtrl'
            });

        $authProvider.google({
            clientId: '537402726188-mghte0unil0k58ubio7ruuo2me5b0a8l.apps.googleusercontent.com',
            url: API_URL + 'auth/google'
        });

        $authProvider.facebook({
            clientId: '1404274396568351',
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