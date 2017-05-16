(function() {

	'use strict';

	angular
		.module('authApp')
		.controller('AuthController', AuthController);


	function AuthController($auth, $state,$rootScope) {

		var vm = this;

		vm.login = function() {

			var credentials = {
				email: vm.email,
				password: vm.password
			}

			// Use Satellizer's $auth service to login
			$auth.login(credentials).then(function(data) {



				// Stringify the returned data to prepare it
				// to go into local storage
				var userToken = JSON.stringify(data.data);
				var tokenData = data.data;

				// Set the stringified user data into local storage
				localStorage.setItem('user', userToken);

				// The user's authenticated state gets flipped to
				// true so we can now show parts of the UI that rely
				// on the user being logged in
				$rootScope.authenticated = true;

				// Putting the user's data on $rootScope allows
				// us to access it anywhere across the app
				//$rootScope.currentUser = response.data.user;



				// If login is successful, redirect to the users state
				$state.go('users',{token:tokenData.token});
			}, function(error) {
				console.log(error);
			});
		}

	}

})();
