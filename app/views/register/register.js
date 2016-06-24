var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var formUtil = require("../../shared/utils/form-util");
var UserViewModel = require("../../shared/view-models/user-view-model");
var navigation = require("../../shared/navigation");
var actionBarUtil = require("../../shared/utils/action-bar-util");

var user = new UserViewModel({ authenticating: false });
var email;
var password;
var displayname;
var signUpButton;

exports.loaded = function(args) {
	var page = args.object;
	page.bindingContext = user;
	actionBarUtil.styleActionBar();
    
	user.set("email", "");
	user.set("password", "");
	user.set("displayname", "");

	email = page.getViewById("email");
	password = page.getViewById("password");
	displayname = page.getViewById("displayname");
	signUpButton = page.getViewById("signUpButton");
	formUtil.hideKeyboardOnBlur(page, [email, password, displayname]);
};

exports.focusPassword = function() {
	password.focus();
};
exports.focusEmail = function() {
	email.focus();
};

function disableForm() {
	email.isEnabled = false;
	password.isEnabled = false;
	displayname.isEnabled = false;
	signUpButton.isEnabled = false;
	user.set("authenticating", true);
}
function enableForm() {
	email.isEnabled = true;
	password.isEnabled = true;
	displayname.isEnabled = true;
	signUpButton.isEnabled = true;
	user.set("authenticating", false);
}

function completeRegistration() {
	disableForm();
	user.register()
		.then(function() {
			dialogsModule
				.alert("Your account was successfully created.")
				.then(navigation.goToLoginPage);
		}).catch(function() {
			dialogsModule
				.alert({
					message: "Unfortunately we were unable to create your account.",
					okButtonText: "OK"
				});
		}).then(enableForm);
}

exports.register = function() {
	if (user.isValidEmail() && user.isComplete()) {
		completeRegistration();
	} 
	
	else {
		//if only the email is off
		if (!user.isValidEmail() && user.isComplete()){
			dialogsModule.alert({
			message: "Please enter a valid email",
			okButtonText: "OK"
			});
		}
		//if the fields are incomplete
		if (!user.isComplete()){
		dialogsModule.alert({
			message: "All fields are required",
			okButtonText: "OK"
		});
	  }
	}
};
