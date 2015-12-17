// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngCordova','ngOpenFB','ngStorage']);

app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
            url: '/home',
            views: {
                home: {
                    templateUrl: 'templates/home.html',
                    controller: 'SessionsCtrl'
                }
            }
        })
        .state('detail', {
            url: '/detail/:id',
            views: {
                home: {
                    templateUrl: 'templates/detail.html',
                    controller: 'SessionCtrl'
                }
            }
        })
        .state('help', {
            url: '/help',
            views: {
                help: {
                    templateUrl: 'templates/help.html'
                }
            }
        })
        .state('login', {
            url: '/login',
            views: {
                login: {
                    templateUrl: 'templates/login.html',
                    controller: 'IndexCtrl'
                }
            }
        })
        .state('logout', {
            url: '/logout',
            views: {
                logout: {
                    templateUrl: 'templates/logout.html',
                    controller: 'IndexCtrl'
                }
            }
        });

    $urlRouterProvider.otherwise('/login');
});

app.run(function($ionicPlatform, ngFB) {
    ngFB.init({appId: '1701144896797452'});
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});
