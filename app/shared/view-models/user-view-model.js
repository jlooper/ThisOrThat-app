var config = require("../../shared/config");
var observableModule = require("data/observable");
var validator = require("email-validator/index");

function User(info) {
	info = info || {};

	// You can add properties to observables on creation
	var viewModel = new observableModule.Observable({
		email: info.email || "",
		password: info.password || ""
	});

	viewModel.login = function() {
		return fetch(config.apiUrl + "oauth/token", {
			method: "POST",
			body: JSON.stringify({
				username: viewModel.get("email"),
				password: viewModel.get("password"),
				grant_type: "password"
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(handleErrors)
		.then(function(response) {
			return response.json();
		}).then(function(data) {
			config.token = data.Result.access_token;
			viewModel.getCurrentUser();
		});
	};

	viewModel.getCurrentUser = function(){
		return fetch(config.apiUrl + "Users/me", {
	        headers: {
	            "Authorization": "Bearer " + config.token
	        }
	    })
	    .then(handleErrors)
	    .then(function(response) {
	        return response.json();
	    }).then(function(data) {
	    	config.displayName = data.Result.DisplayName
	        //unique identifier
	        config.userId = data.Result.Id
	    });
	};

	viewModel.loginWithFacebook = function(token) {
		var user = {
		    "Identity": {
		        "Provider": "Facebook",
		        "Token": token
		    }
		};
		return fetch(config.apiUrl + "Users", {
			method: "POST",
			body: JSON.stringify(user),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(handleErrors)
		.then(function(response) {
			return response.json();
		}).then(function(data) {
			config.token = data.Result.access_token;
			viewModel.getCurrentUser();

		});
	};

	viewModel.register = function() {
		return fetch(config.apiUrl + "Users", {
			method: "POST",
			body: JSON.stringify({
				Username: viewModel.get("email"),
				Email: viewModel.get("email"),
				DisplayName: viewModel.get("displayname"),
				Password: viewModel.get("password")
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(handleErrors);
	};

	viewModel.resetPassword = function() {
		return fetch(config.apiUrl + "Users/resetpassword", {
			method: "POST",
			body: JSON.stringify({
				Email: viewModel.get("email"),
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(handleErrors);
	};

	viewModel.isValidEmail = function() {
		var email = this.get("email");
		return validator.validate(email);
	};

	viewModel.isComplete = function(){
		if(this.get("email") && this.get("password") && this.get("displayname")){
			return true
		}
		else{
			return false
		}
	}

	return viewModel;
}

function handleErrors(response) {
	if (!response.ok) {
		console.log(JSON.stringify(response));
		throw Error(response.statusText);
	}
	return response;
}

module.exports = User;