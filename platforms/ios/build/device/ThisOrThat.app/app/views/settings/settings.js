var frameModule = require("ui/frame");
var observableModule = require("data/observable");
var appSettings = require("application-settings");
var config = require("../../shared/config");
var navigation = require("../../shared/navigation");

var pageData = new observableModule.Observable({
    langList: ["English","Arabic","Bengali","Danish","German","Spanish","Finnish","French","Hindi","Italian","Japanese","Dutch","Norwegian","Punjabi","Polish","Portuguese","Russian","Swedish","Turkish","Chinese Traditional","Chinese Simplified"]
});

function loaded(args) {
    page = args.object;
    page.bindingContext = pageData;

    var langPicker = page.getViewById("langPicker");
    langPicker.addEventListener(observableModule.Observable.propertyChangeEvent, function (e) {
    var lang;

		switch (e.value) {
		    case 0:
		        lang = "en";
		        break;
		    case 1:
		        lang = "ar";
		        break;
		    case 2:
		        lang = "bn";
		        break;
		    case 3:
		        lang = "da";
		        break;
		    case 4:
		        lang = "de";
		        break;
		    case 5:
		        lang = "es";
		        break;
		    case 6:
		        lang = "fi";
		        break;
		    case 7:
		        lang = "fr";
		        break;
		    case 8:
		        lang = "hi";
		        break;
		    case 9:
		        lang = "it";
		        break;
		    case 10:
		        lang = "ja";
		        break;
		    case 11:
		        lang = "nl";
		        break;
		    case 12:
		        lang = "no";
		        break;
		    case 13:
		        lang = "pa";
		        break;
		    case 14:
		        lang = "pl";
		        break;
		    case 15:
		        lang = "pt";
		        break;
		    case 16:
		        lang = "ru";
		        break;
		    case 17:
		        lang = "sv";
		        break;
		    case 18:
		        lang = "tr";
		        break;
		    case 19:
		        lang = "zh-TW";
		        break;
		    case 20:
		        lang = "zh";
		        break;
		}
		config.lang = lang;
    });
    
}

exports.loaded = loaded;
exports.signOut = navigation.signOut;

