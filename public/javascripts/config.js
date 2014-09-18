/* javascripts/config.js ============== */

angular.module('authApp', ['ui.router', 'ngResource', 'authCtrls', 'authServices'])

    /* authApp.config */
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider.state('home', {      // home page
            url: "/home",
            templateUrl: "home.html"
        }).state('login', {                 // login page
            url: "/login",
            templateUrl: "login.html",
            controller: "LoginCtrl"
        }).state('signup', {                // signup page
            url: "/signup",
            templateUrl: "signup.html",
            controller: "SignupCtrl"
        }).state('account', {               // account page
            url: "/account",
            templateUrl: "account.html",
            controller: "AccountCtrl"
        });
    })

    .run(function($state) {
        $state.go('home');          // Start at the home page
    });