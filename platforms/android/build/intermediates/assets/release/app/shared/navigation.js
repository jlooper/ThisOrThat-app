var config = require("./config");
var frameModule = require("ui/frame");

module.exports = {
	goToLoginPage: function() {
		frameModule.topmost().navigate("views/login/login");
	},
	goToRegisterPage: function() {
		frameModule.topmost().navigate("views/register/register");
	},
	goToPasswordPage: function() {
		frameModule.topmost().navigate("views/password/password");
	},
	goToStartingPage: function() {
		frameModule.topmost().navigate("views/game-selection/game-selection");
	},
	startGame: function() {
		frameModule.topmost().navigate("views/countdown/countdown");
	},
	startPlay: function() {
		frameModule.topmost().navigate("views/game/game");
	},
	restart: function() {
		frameModule.topmost().navigate("views/restart/restart");
	},
	goToMyScores: function() {
		frameModule.topmost().navigate("views/my-scores/my-scores");
	},
	goToHighScores: function() {
		frameModule.topmost().navigate("views/high-scores/high-scores");
	},
	goToSettings: function() {
		frameModule.topmost().navigate("views/settings/settings");
	},
	signOut: function() {
		config.invalidateToken();
		frameModule.topmost().navigate({
			moduleName: "views/login/login",
			animated: false
		});
	},
	startingPage: function() {
		return config.token ? "views/game-selection/game-selection" : "views/login/login";
	}
};