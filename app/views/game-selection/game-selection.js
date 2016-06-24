var observable = require("data/observable");
var gesturesModule = require("ui/gestures");
var gameModel = require("../../shared/view-models/game-view-model");
var config = require("../../shared/config");
var imageModule = require("ui/image");
var actionBarUtil = require("../../shared/utils/action-bar-util");
var navigation = require("../../shared/navigation");
var appSettings = require("application-settings");

var _page;
var wordModel = new gameModel();


function pageLoaded(args) {

    _page = args.object;
    _page.bindingContext = wordModel;
    actionBarUtil.styleActionBar();
    actionBarUtil.hideiOSBackButton();
    
    
    wordModel.getToken();

    var catImage = _page.getViewById("cat");
    observeImage("cat","a cat");

    var dogImage = _page.getViewById("dog");
    observeImage("dog","a dog");
    
    var orangeImage = _page.getViewById("orange");
    observeImage("orange","an orange");
    
    var appleImage = _page.getViewById("apple");
    observeImage("apple","an apple");    

    var hatImage = _page.getViewById("hat");
    observeImage("hat","a hat");    

    var birdImage = _page.getViewById("bird");
    observeImage("bird","a bird");
    
    var shoeImage = _page.getViewById("shoe");
    observeImage("shoe","a shoe");
    
    var fishImage = _page.getViewById("fish");
    observeImage("fish","a fish");
    
}

function observeImage(name,caption){

    var image = _page.getViewById(name);
    image.observe(gesturesModule.GestureTypes.tap, function (args) {
        
        image.animate({ opacity: 0})
            .then(function () { 
                return image.animate({ opacity: 1 }); 
            })
            .then(function () {
                wordModel.getImageMatch(config.imgUrl+"/"+name+".jpg",caption,name+".jpg");
                                
        })
            .catch(function (e) {
        });
    });

}



exports.pageLoaded = pageLoaded;
exports.getHighScores = navigation.goToHighScores;
exports.getSettings = navigation.goToSettings;
exports.getMyScores = navigation.goToMyScores;
