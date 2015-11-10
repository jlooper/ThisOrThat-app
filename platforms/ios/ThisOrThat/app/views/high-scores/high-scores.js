var wordModel = require("../../shared/view-models/game-view-model");

var observableModule = require("data/observable");

var highScoresList = new wordModel([]);

var pageData = new observableModule.Observable({
    highScoresList: highScoresList
});

function loaded(args) {
    page = args.object;
    page.bindingContext = pageData;
    highScoresList.empty();
    highScoresList.getHighScores();   
}



exports.loaded = loaded;

