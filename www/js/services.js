(function() {

    // Declaring angular module
    var app = angular.module('starter');

    // Defining angular factory
    app.factory('Session', function($http, $q) {

        // This is the API endpoint url
        var api_url = 'http://localhost:1337/';

        //return $http.get('http://localhost:5000/sessions/:sessionId');

        return {

            // Makes API call for login
            userLogin: function(data, callback) {

                // Request configuration
                var deferred = $q.defer();
                var _serverResponse = {};
                var _clientRequest = {
                    method: 'POST',
                    url: api_url + 'user/login',
                    data: {
                        mobile: '9879879877',
                    }
                };

                // Actually make API call
                $http(_clientRequest).success(function(response) {	
                    if (response) {
                        _serverResponse.data = response;
                        _serverResponse.success = true;
                        deferred.resolve('Success');
                    }
                }).error(function(response) {
                    if (response) {
                        _serverResponse.data = response;
                        _serverResponse.success = false;
                    }
                }).
                finally(function() {
                    callback(_serverResponse);
                });
                return deferred.promise;
            },


        }
    });

})();
