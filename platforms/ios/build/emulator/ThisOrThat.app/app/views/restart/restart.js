var frameModule = require("ui/frame");
var actionBarUtil = require("../../shared/utils/action-bar-util");
var navigation = require("../../shared/navigation");


var _page;

function pageLoaded(args) {   
    _page = args.object;
    actionBarUtil.styleActionBar();
    actionBarUtil.hideiOSBackButton();
}

exports.pageLoaded = pageLoaded;
exports.restart = navigation.startGame;
exports.goHome = navigation.goToStartingPage;
exports.getMyScores = navigation.goToMyScores;
exports.getHighScores = navigation.goToHighScores;
exports.goToSettings = navigation.goToSettings;
exports.signOut = navigation.signOut;



