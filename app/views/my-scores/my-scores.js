var wordModel = require("../../shared/view-models/game-view-model");
var observableModule = require("data/observable");

var scoresList = new wordModel([]);
var pageData = new observableModule.Observable({
    scoresList: scoresList
});

function loaded(args) {
    page = args.object;
    page.bindingContext = pageData;

    scoresList.empty();
    scoresList.getMyScores();   
}

exports.loaded = loaded;

