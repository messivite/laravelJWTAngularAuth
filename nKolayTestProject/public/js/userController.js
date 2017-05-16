(function() {

	'use strict';

	angular
		.module('authApp')
		.controller('UserController', UserController);

	function UserController($http,$stateParams,$auth,$rootScope) {

		var vm = this;
		console.log($stateParams);
		console.log($stateParams.token);
		vm.users;
		vm.error;

		vm.getUsers = function() {





				vm.tokenData = 	JSON.parse(localStorage.getItem('user'));


				$http.post("/api/get_user_details", {token: vm.tokenData.token}, {headers: {'Content-Type': 'application/json'} })
								.then(function (user) {
								vm.users = user.data;
					 },function(error){
									vm.error = error;
				});


}
							// We would normally put the logout method in the same
				// spot as the login method, ideally extracted out into
				// a service. For this simpler example we'll leave it here
				vm.logout = function() {

					$auth.logout().then(function() {

						// Remove the authenticated user from local storage
						localStorage.removeItem('user');

						// Flip authenticated to false so that we no longer
						// show UI elements dependant on the user being logged in
						$rootScope.authenticated = false;

						// Remove the current user info from rootscope
						$rootScope.currentUser = null;
					});
		}
	}

})();
