var applicationSettingsModule = require("application-settings");

var configObject = {
	clarifaiUrl: "https://api.clarifai.com/v1/token/?grant_type=client_credentials&client_id=iokiG8pp3yHVJZdNpkbwSChJ0FM4MWT9CWtTDYKT&client_secret=D4hTNGNQL3PPu4iXW2oDX00wpux0t_tUGRB0qoTr",
	imgUrl: "https://raw.githubusercontent.com/jlooper/thisorthat/master/",
	apiUrl: "https://api.everlive.com/v1/buVkT4zhhjzzDtpF/",
	invalidateToken: function() {
		this.token = "";
	}
};
Object.defineProperty(configObject, "token", {
	get: function() {
		return applicationSettingsModule.getString("token");
	},
	set: function(token) {
		return applicationSettingsModule.setString("token", token);
	}
});
Object.defineProperty(configObject, "clarifaiToken", {
	get: function() {
		return applicationSettingsModule.getString("clarifaiToken");
	},
	set: function(clarifaiToken) {
		return applicationSettingsModule.setString("clarifaiToken", clarifaiToken);
	}
});
Object.defineProperty(configObject, "displayName", {
	get: function() {
		return applicationSettingsModule.getString("displayName");
	},
	set: function(displayName) {
		return applicationSettingsModule.setString("displayName", displayName);
	}
});
Object.defineProperty(configObject, "userId", {
	get: function() {
		return applicationSettingsModule.getString("userId");
	},
	set: function(userId) {
		return applicationSettingsModule.setString("userId", userId);
	}
});
Object.defineProperty(configObject, "lang", {
	get: function() {
		return applicationSettingsModule.getString("lang");
	},
	set: function(lang) {
		return applicationSettingsModule.setString("lang", lang);
	}
});

module.exports = configObject;