var wordModel = require("../../shared/view-models/game-view-model");
var observableModule = require("data/observable");
var actionBarUtil = require("../../shared/utils/action-bar-util");

var scoresList = new wordModel([]);
var pageData = new observableModule.Observable({
    scoresList: scoresList
});

function loaded(args) {
    page = args.object;
    page.bindingContext = pageData;
    actionBarUtil.styleActionBar();
    scoresList.empty();
    scoresList.getMyScores();   
}

exports.loaded = loaded;

