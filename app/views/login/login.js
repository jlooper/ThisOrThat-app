var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var formUtil = require("../../shared/utils/form-util");
var userModel = require("../../shared/view-models/user-view-model");
var FacebookLoginHandler = require("nativescript-facebook-login");
var appSettings = require("application-settings");
var actionBarUtil = require("../../shared/utils/action-bar-util");
var navigation = require("../../shared/navigation");

var user = new userModel({
	email: "",
	password: "",
	authenticating: false
});

var email;
var password;
var signInButton;

var _page;


exports.loaded = function(args) {

	
	_page = args.object;
	_page.bindingContext = user;
	actionBarUtil.styleActionBar();
    actionBarUtil.hideiOSBackButton();


	email = _page.getViewById("email");
	password = _page.getViewById("password");
	signInButton = _page.getViewById("signInButton");
	formUtil.hideKeyboardOnBlur(_page, [email, password]);

	

	// Prevent the first textfield from receiving focus on Android
	// See http://stackoverflow.com/questions/5056734/android-force-edittext-to-remove-focus
	if (_page.android) {
		var layout = _page.getViewById("layout").android;
		layout.setFocusableInTouchMode(true);
		layout.setFocusable(true);
		email.android.clearFocus();
	}

};

exports.focusPassword = function() {
	password.focus();
};

function disableForm() {
	email.isEnabled = false;
	password.isEnabled = false;
	signInButton.isEnabled = false;
	user.set("authenticating", true);
}
function enableForm() {
	email.isEnabled = true;
	password.isEnabled = true;
	signInButton.isEnabled = true;
	user.set("authenticating", false);
}

exports.signIn = function() {
	disableForm();
	user.login()
		.then(navigation.goToStartingPage)
		.catch(function(error) {
			console.log(error);
			dialogsModule.alert({
				//todo, improve error messages
				message: "Unfortunately we could not find your account.",
				okButtonText: "OK"
			});
		})
		.then(enableForm);
};

exports.signInWithFacebook = function() {
	disableForm();
	
	var successCallback = function(result) {

	    var token;
	    if (_page.android){
	      token = result.getAccessToken().getToken();
	       }
	    else if (_page.ios){
	      token = result.token.tokenString
	    }
	    user.loginWithFacebook(token)
		.then(function() {
			frameModule.topmost().navigate("views/game-selection/game-selection");
		})
		.catch(function(error) {
			console.log(error);
			dialogsModule.alert({
				message: "Unfortunately we could not find your account.",
				okButtonText: "OK"
			});
		})
		.then(enableForm);
	}
	var cancelCallback = function() {
	    alert("Login was cancelled");
		enableForm();
	  }

	var failCallback = function() {
	    alert("Sorry, we're having trouble logging you in. Please make sure you have given Facebook access to this app.");
		enableForm();
	  } 
	FacebookLoginHandler.init();
	FacebookLoginHandler.registerCallback(successCallback, cancelCallback, failCallback);
	//Ask for the permissions you want to use
	FacebookLoginHandler.logInWithPublishPermissions(["publish_actions"]); 	
};


exports.register = navigation.goToRegisterPage;
exports.forgotPassword = navigation.goToPasswordPage;
