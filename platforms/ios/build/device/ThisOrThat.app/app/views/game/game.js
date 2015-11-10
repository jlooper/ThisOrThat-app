var observable = require("data/observable");
var gesturesModule = require("ui/gestures");
var gameModel = require("../../shared/view-models/game-view-model");
var frameModule = require("ui/frame");
var appSettings = require("application-settings");
var timer = require("timer");
var actionBarUtil = require("../../shared/utils/action-bar-util");
var config = require("../../shared/config");
var navigation = require("../../shared/navigation");

var _page;

var score = 0;
var tapped = false;
var img1;
var img2;
var myTimer;

var wordModel = new gameModel({
    text: ""
});

function pageLoaded(args) {
    
    _page = args.object;
    _page.bindingContext = wordModel;
    actionBarUtil.hideiOSBackButton();
    actionBarUtil.styleActionBar();

    img1 = _page.getViewById("img1");
    img1.src="~/images/"+appSettings.getString("image1");
    img2 = _page.getViewById("img2");
    img2.src="~/images/"+appSettings.getString("image2");

    //set up listeners

    img1.observe(gesturesModule.GestureTypes.tap, function (args) {

        tapped = true;
        clearTimeout();
        var answer = wordModel.get("correctAnswer")
           
                if(answer == 1){
                    score = score+1;
                    getPrompt() 
                }
                else{
                    //post score, then reset
                    if (score > 0){
                        wordModel.postScore(score,config.displayName);
                    }
                    score=0;            
                    wordModel.showAlert("Oops!","That's not right, start over!",navigation.restart())            
                }       
               
    });
    
    img2.observe(gesturesModule.GestureTypes.tap, function (args) {

        tapped = true;
        clearTimeout();
        var answer = wordModel.get("correctAnswer")
        if(answer == 2){
            score = score+1
            getPrompt() 
        }
        else{
            if (score > 0){
                wordModel.postScore(score,config.displayName);
            }        
            score = 0;
            wordModel.showAlert("Nope!","That's not right, start over!",navigation.restart())    
    
        }   
    });
        
    getPrompt()
    
   
}

function timeMeOut(){
    if (score > 0){
        wordModel.postScore(score,config.displayName);
    }
    score=0;            
                    
    wordModel.showAlert("Timeout!","Sorry, try again!",navigation.restart())
    clearTimeout();
      
}

function clearTimeout(){
    timer.clearTimeout(myTimer);
    tapped = false; 

}

function getPrompt(args) {
    
    myTimer = timer.setTimeout(function () {
        if(!tapped){
            tapped = false;
            timeMeOut();
        } 
        else {
            clearTimeout();
        }         
    }, 5000);


    var rand = Math.floor(Math.random() * appSettings.setLength);
    var wordText = appSettings.getString("word"+rand).split('|')
    wordModel.set("text",wordText[0])
    wordModel.set("correctAnswer",wordText[1])

    

}


exports.pageLoaded = pageLoaded;
exports.getPrompt = getPrompt;
exports.goHome = navigation.goToStartingPage;

