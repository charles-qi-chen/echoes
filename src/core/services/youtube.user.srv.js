import angular from 'angular';

export default YoutubeUser;

    /* @ngInject */
    function YoutubeUser($http, $q, GapiLoader) {
    	var data = {
            status: {
                signed_in: false
            },
            user: {},
            auth: {}
        };
        var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=';
        var service = {
            update: update,
            data: data,
            isSignedIn: isSignedIn,
            signOut: signOut,
            signIn: signIn,
            isUserSignedIn: isUserSignedIn
        };
        GapiLoader.auth().then((authResult) => {
            angular.extend(data.status, authResult.status);
            angular.merge(data.auth, authResult);
        });

        return service;

        ////////////////

        function update(user) {
        	angular.copy(user, data);
        }

        // TODO: deprecated
        function isSignedIn () {
            return Object.keys(data).length;
        }

        function signOut () {
            data.status.signed_in = false;
            data.user = {};
        }

        function clearUserData () {
            Object.keys(data).forEach(function (key) {
                delete data[key];
            });
        }

        // TODO: check if needed
        function isUserSignedIn () {
            return data.status && data.status.signed_in === true;
        }

        function signIn (userAuth) {
            angular.copy(userAuth.status, data.status);
            return $q.all([
                gapi.client.youtube.channels.list({
                    part: 'snippet,contentDetails',
                    mine: true
                })]).then(saveUser);

        }

        function saveUser (result) {
            console.log('results user', result);
            angular.copy(result[0].result.items[0], data.user);
            // $rootScope.$broadcast('user-signed-in', data);
            return result;
        }
    }