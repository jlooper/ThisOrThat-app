var observableArrayModule = require("data/observable-array");
var appSettings = require("application-settings");
var config = require("../../shared/config");
var frameModule = require("ui/frame");
var navigation = require("../navigation");
var toast = require("nativescript-toast");
var platformModule = require("platform");


var itemCount = 0;
var tagSet = [];
var tagSet2 = [];

//temporary var to store clicked item so we can make sure they don't get the same twice
var tmpSelection1;
var tmpSelection2;

			
function GameViewModel(items) {
	
	var viewModel = new observableArrayModule.ObservableArray(items);

	viewModel.clearImages = function(){

	}



	viewModel.getImageMatch = function(imgUrl,imgName,imgPath) {

	if (itemCount==0){
		tmpSelection1 = imgName;
	}
	if (itemCount==1){
		tmpSelection2 = imgName;
	}
	if(tmpSelection2 == tmpSelection1){
		var msg = "You picked the same picture twice. Please try again!";
		viewModel.showAlert("Oops!",msg,null)
	}
	else {
	var msg = "You picked "+imgName+"!";
	viewModel.showAlert("Preparing your game...",msg,null)
	
	if (!config.lang){
		lang = "en"
	}	
	
	return fetch("https://api.clarifai.com/v1/tag/", {
			method: "POST",
			body: JSON.stringify({
				url: imgUrl,
				language : config.lang
			}),
			headers: {
				"Authorization": "Bearer " + config.clarifaiToken,
				"Content-Type": "application/json"
			}
		})
		.then(handleErrors)
		.then(function(response) {
			return response.json();
		}).then(function(data) {
			itemCount = itemCount+1;
			var selectedImage = "image"+itemCount;
			
			if(itemCount==1){
				tagSet = data.results[0].result.tag.classes;
				for (i = 0; i < tagSet.length; i++) {
					tagSet[i]=tagSet[i]+"|1";
				}				
			}
			if(itemCount==2){
				tagSet2=data.results[0].result.tag.classes;
				for (i = 0; i < tagSet2.length; i++) {
					tagSet2[i]=tagSet2[i]+"|2";
				}	
			}
			tagSet2.forEach(function(entry) {
			    tagSet.push(entry);
			});
			console.log(tagSet);
			//set length of set in appSettings
			appSettings.setLength=tagSet.length;
			//create all strings
			for (i = 0; i < tagSet.length; i++) { 
				appSettings.setString("word"+i,tagSet[i])
					//console.log(tagSet[i])
				}	
				
			
			appSettings.setString("image"+itemCount,imgPath)
			if(itemCount == 2){
				console.log(itemCount)
				//reset
				itemCount = 0;
				tagSet = [];
				tagSet2 = [];
				//load game
				navigation.startGame();
				
			}
		});
	  }
    };

    viewModel.getToken = function(){
    	//get token
    	return fetch(config.clarifaiUrl, {
            method: "POST",            
        })
        .then(handleErrors)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            config.clarifaiToken = data.access_token
        });
    };

    viewModel.showAlert = function(headline,text,action){

    	if (platformModule.device.os == 'iOS'){
			var fancyAlert = YCTutorialBox.alloc().initWithHeadlineWithHelpTextWithCompletionBlock(headline, text, action);
    		fancyAlert.show();
    	}
    	else{
			var myToast = toast.makeText(text);
			myToast.show();
    	}
	};

	viewModel.postScore = function(score){
		return fetch(config.apiUrl + "Scores", {
			method: "POST",
			body: JSON.stringify({
				Score: score,
				UserName: config.displayName
			}),
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + config.token
			}
		})
		.then(handleErrors)
		.then(function(response) {
			return response.json();
		}).then(function(data) {
			//config.token = data.Result.access_token;
		});
	};

	viewModel.getMyScores = function() {
		var sortExp = { "Score" : -1 };
		var filter = { 
    		'Owner': config.userId
		};

	    return fetch(config.apiUrl + "Scores", {
	        headers: {
	            "Authorization": "Bearer " + config.token,
	            "X-Everlive-Sort" : JSON.stringify(sortExp),
	            "X-Everlive-Filter" : JSON.stringify(filter)	            
	        }
	    })
	    .then(handleErrors)
	    .then(function(response) {
	        return response.json();
	    }).then(function(data) {
	        data.Result.forEach(function(score) {
	            viewModel.push({
	                score: score.Score,
	                id: score.Id
	            });
	        });
	    });
	};
	//top 10 high scores
	viewModel.getHighScores = function() {
		var sortExp = { "Score" : -1 };

	    return fetch(config.apiUrl + "Scores", {
	        headers: {
	            "Authorization": "Bearer " + config.token,
	            "X-Everlive-Sort" : JSON.stringify(sortExp),
	            "X-Everlive-Take" : 10
	        }
	    })
	    .then(handleErrors)
	    .then(function(response) {
	        return response.json();
	    }).then(function(data) {
	        data.Result.forEach(function(score) {
	            viewModel.push({
	                score: score.Score,
	                id: score.Id,
	                username: score.UserName
	            });
	        });
	    });
	};

	viewModel.empty = function() {
	    while (viewModel.length) {
	        viewModel.pop();
	    }
	};

	
	return viewModel;
}


function handleErrors(response) {
	if (!response.ok) {
		//console.log(JSON.stringify(response));
		//token is invalid
		if (response.status === 403) {
			navigation.signOut();
		}

		throw Error(response.statusText);
	}
	return response;
}



module.exports = GameViewModel;

