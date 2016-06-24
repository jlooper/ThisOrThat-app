var frameModule = require("ui/frame");
var labelModule = require("ui/label");
var actionBarUtil = require("../../shared/utils/action-bar-util");
var navigation = require("../../shared/navigation");

var _page;

function pageNavigated(args) {

   
    _page = args.object;

    actionBarUtil.hideiOSBackButton();
    actionBarUtil.styleActionBar();
    
    var gameLayout = _page.getViewById("gameLayout");
    var three = new labelModule.Label();
    
    three.text="3";
    three.cssClass="large"
    three.horizontalAlignment="center"
    three.verticalAlignment="center"
    three.on("loaded", function (args) {
        args.object.animate({ scale: { x: 1.5, y: 1.5 }, opacity: 0, duration: 1000 })
            .then(function () {
                gameLayout.removeChild(three)
                two()
        })
            .catch(function (e) {
        });
    });

    gameLayout.addChild(three);

    
   
}

function two() {
    
    var gameLayout = _page.getViewById("gameLayout");
    var two = new labelModule.Label();
    
    two.text="2";
    two.cssClass="large"
    two.horizontalAlignment="center"
    two.verticalAlignment="center"
    two.on("loaded", function (args) {
        args.object.animate({ scale: { x: 1.5, y: 1.5 }, opacity: 0, duration: 1000 })
            .then(function () {
                gameLayout.removeChild(two)
                one()
        })
            .catch(function (e) {
        });
    });

    gameLayout.addChild(two);

    
   
}

function one() {
    
    var gameLayout = _page.getViewById("gameLayout");
    var one = new labelModule.Label();
    
    one.text="1";
    one.cssClass="large"
    one.horizontalAlignment="center"
    one.verticalAlignment="center"
    one.on("loaded", function (args) {
        args.object.animate({ scale: { x: 1.5, y: 1.5 }, opacity: 0, duration: 1000 })
            .then(function () {
                gameLayout.removeChild(one)
                navigation.startPlay();
        })
            .catch(function (e) {
        });
    });

    gameLayout.addChild(one);

   
   
}


exports.pageNavigated = pageNavigated;

