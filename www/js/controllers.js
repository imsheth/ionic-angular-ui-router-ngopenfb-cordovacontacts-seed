(function() {

    // Declaring angular module
    var app = angular.module('starter');

    // Defining angular controller
    app.controller('IndexCtrl', function($rootScope, $scope, Session, $ionicModal, $timeout, ngFB, $state) {

        // Default constructor - self executing function
        (function _init() {

            // Resetting the is_logged_in flag on application start
            $rootScope.is_logged_in = 0;

        })();

    });

    // Defining angular controller
    app.controller('LoginCtrl', function($rootScope, $scope, Session, $ionicModal, $timeout, ngFB, $state, $localStorage) {

        // Default constructor - self executing function
        (function _init() {

            // Initializing $localStorage
            $localStorage.$default({
                user: '',
                facebook_friends: ''
            });

            // Resetting the is_logged_in flag
            $rootScope.is_logged_in = 0;

            // If user object found in $localStorage, then do a state tranistion to home
            if ($localStorage.user && $localStorage.user != '') {
                $rootScope.is_logged_in = 1;
                $state.go('home');
            } else {

            }

        })();

        // For initiating fb login on button click
        $scope.fbLogin = function() {
            ngFB.login({
                scope: 'email'
            }).then(
                function(response) {

                    // If login succeeded, then do a state tranistion to home
                    if (response.status === 'connected') {
                        $rootScope.is_logged_in = 1;
                        $state.go('home');
                    } else {
                        alert('Facebook login failed');
                    }

                });
        };

    });

    // Defining angular controller
    app.controller('SessionsCtrl', function($rootScope, $scope, Session, ngFB, $cordovaContacts, $localStorage, $state) {

        // Default constructor - self executing function
        (function _init() {

            // If user object not found in $localStorage, then do a state tranistion to login
            if (!$localStorage.user || $localStorage.user == '') {
                $rootScope.is_logged_in = 0;
                $state.go('login');
                alert('Invalid session');
            } else {

            }

        })();

        // Get the session details
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

        $scope.doRefresh = function() {
            $scope.sessions.unshift({
                "id": 5,
                "title": "Incoming",
                "speaker": "Incoming",
                "time": "00:00",
                "room": "Incoming",
                "description": "Incoming"
            })
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply()
        };

        // Fetch user's required facebook details
        ngFB.api({
            path: '/me',
            params: {
                fields: 'id,first_name,last_name,email,currency'
            }
        }).then(
            function(user) {

                // Store user to $rootScope and $localStorage
                $rootScope.user = {};
                $rootScope.user.fb_id = user.id;
                $rootScope.user.first_name = user.first_name;
                $rootScope.user.last_name = user.last_name;
                $rootScope.user.profile_picture = "http://graph.facebook.com/" + user.id + "/picture";
                $rootScope.user.email = user.email;
                $rootScope.user.mobile = '';
                $rootScope.user.country = '';
                $rootScope.user.status = 1;
                $localStorage.user = $rootScope.user;

                console.log(user);
                console.log($rootScope.user);

                // Make an API call for login from Session service
                Session.userLogin($scope, function(response) {
                    if (response.data) {
                        console.log(response.data);
                    } else {
                        alert('Login error');
                    }
                });

                // Fetch user's facebook friends who are using the app
                ngFB.api({
                    path: '/me/friends'
                }).then(
                    function(facebook_friends) {
                        // Store user to $rootScope and $localStorage
                        $rootScope.facebook_friends = facebook_friends;
                        $localStorage.facebook_friends = $rootScope.facebook_friends;
                        console.log(facebook_friends);
                    },
                    function(error) {
                        alert('Facebook error: ' + error.error_description);
                    });

            },
            function(error) {
                alert('Facebook error: ' + error.error_description);
            });

        $scope.getContactList = function() {
            $cordovaContacts.find({
                filter: ''
            }).then(function(result) {
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

})();
