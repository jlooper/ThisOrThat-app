var wordModel = require("../../shared/view-models/game-view-model");
var actionBarUtil = require("../../shared/utils/action-bar-util");

var observableModule = require("data/observable");

var highScoresList = new wordModel([]);

var pageData = new observableModule.Observable({
    highScoresList: highScoresList
});

function loaded(args) {
    page = args.object;
    actionBarUtil.styleActionBar();    
    page.bindingContext = pageData;
    highScoresList.empty();
    highScoresList.getHighScores();   
}



exports.loaded = loaded;

