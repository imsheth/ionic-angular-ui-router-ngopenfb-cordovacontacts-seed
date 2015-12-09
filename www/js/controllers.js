var app = angular.module('starter');

app.controller('IndexCtrl', function($rootScope, $scope, Session, $ionicModal, $timeout, ngFB, $state) {

    $rootScope.is_logged_in = 0;

});

app.controller('LoginCtrl', function($rootScope, $scope, Session, $ionicModal, $timeout, ngFB, $state) {

    $rootScope.is_logged_in = 0;

    $scope.fbLogin = function() {
        ngFB.login({
            scope: 'email'
        }).then(
            function(response) {
                if (response.status === 'connected') {
                    //console.log('Facebook login succeeded');
                    $rootScope.is_logged_in = 1;
                    $state.go('home');
                } else {
                    alert('Facebook login failed');
                }
            });
    };

});

app.controller('SessionsCtrl', function($rootScope, $scope, Session, ngFB,$cordovaContacts) {

    $rootScope.is_logged_in = 1;

    //$scope.sessions = [];
    $scope.sessions = [{
        "id": 0,
        "title": "Introduction to Ionic",
        "speaker": "CHRISTOPHE COENRAETS",
        "time": "9:40am",
        "room": "Ballroom A",
        "description": "In this session, you'll learn how to build a native-like mobile application using the Ionic Framework, AngularJS, and Cordova."
    }, {
        "id": 1,
        "title": "AngularJS in 50 Minutes",
        "speaker": "LISA SMITH",
        "time": "10:10am",
        "room": "Ballroom B",
        "description": "In this session, you'll learn everything you need to know to start building next-gen JavaScript applications using AngularJS."
    }, {
        "id": 2,
        "title": "Contributing to Apache Cordova",
        "speaker": "JOHN SMITH",
        "time": "11:10am",
        "room": "Ballroom A",
        "description": "In this session, John will tell you all you need to know to start contributing to Apache Cordova and become an Open Source Rock Star."
    }, {
        "id": 3,
        "title": "Mobile Performance Techniques",
        "speaker": "JESSICA WONG",
        "time": "3:10Pm",
        "room": "Ballroom B",
        "description": "In this session, you will learn performance techniques to speed up your mobile application."
    }, {
        "id": 4,
        "title": "Building Modular Applications",
        "speaker": "LAURA TAYLOR",
        "time": "2:00pm",
        "room": "Ballroom A",
        "description": "Join Laura to learn different approaches to build modular JavaScript applications."
    }];

    // Session.getHome($scope, function(response) {
    //     if (response.data) {
    //         $scope.sessions = response.data;
    //     } else {
    //         $scope.sessions = response.data;
    //         console.log('Failed');
    //     }
    // });

    ngFB.api({
        path: '/me',
        params: {
            fields: 'id,first_name,last_name,email,currency'
        }
    }).then(
        function(user) {

            $scope.user = user;
            console.log(user);

            ngFB.api({
                path: '/me/friends',
                params: {
                    fields: 'id,first_name,last_name,email,currency'
                }
            }).then(
                function(friends) {
                    $scope.friends = friends;
                    console.log(friends);
                },
                function(error) {
                    alert('Facebook error: ' + error.error_description);
                });

        },
        function(error) {
            alert('Facebook error: ' + error.error_description);
        });

        $scope.getContactList = function() {
            $cordovaContacts.find({filter: ''}).then(function(result) {
                $scope.contacts = result;
            }, function(error) {
                console.log("ERROR: " + error);
            });
        }

});

app.controller('SessionCtrl', function($rootScope, $scope, $stateParams, Session, ngFB) {

    $rootScope.is_logged_in = 1;

    $scope.share = function(event) {
        ngFB.api({
            method: 'POST',
            path: '/me/feed',
            params: {
                message: "I'll be attending: '" + $scope.session.title + "' by " +
                    $scope.session.speaker
            }
        }).then(
            function() {
                alert('The session was shared on Facebook');
            },
            function() {
                alert('An error occurred while sharing this session on Facebook');
            });
    };

    //$scope.sessions = [];
    $scope.sessions = [{
        "id": 0,
        "title": "Introduction to Ionic",
        "speaker": "CHRISTOPHE COENRAETS",
        "time": "9:40am",
        "room": "Ballroom A",
        "description": "In this session, you'll learn how to build a native-like mobile application using the Ionic Framework, AngularJS, and Cordova."
    }, {
        "id": 1,
        "title": "AngularJS in 50 Minutes",
        "speaker": "LISA SMITH",
        "time": "10:10am",
        "room": "Ballroom B",
        "description": "In this session, you'll learn everything you need to know to start building next-gen JavaScript applications using AngularJS."
    }, {
        "id": 2,
        "title": "Contributing to Apache Cordova",
        "speaker": "JOHN SMITH",
        "time": "11:10am",
        "room": "Ballroom A",
        "description": "In this session, John will tell you all you need to know to start contributing to Apache Cordova and become an Open Source Rock Star."
    }, {
        "id": 3,
        "title": "Mobile Performance Techniques",
        "speaker": "JESSICA WONG",
        "time": "3:10Pm",
        "room": "Ballroom B",
        "description": "In this session, you will learn performance techniques to speed up your mobile application."
    }, {
        "id": 4,
        "title": "Building Modular Applications",
        "speaker": "LAURA TAYLOR",
        "time": "2:00pm",
        "room": "Ballroom A",
        "description": "Join Laura to learn different approaches to build modular JavaScript applications."
    }];

    //$scope.session = {};
    $scope.session = $scope.sessions[$stateParams.id];

    // Session.getHome($scope, function(response) {
    //     if (response.data) {
    //         $scope.sessions = response.data;
    //         $scope.session = $scope.sessions[$stateParams.id];
    //     } else {
    //         $scope.sessions = response.data;
    //         console.log('Failed');
    //     }
    // });

});
