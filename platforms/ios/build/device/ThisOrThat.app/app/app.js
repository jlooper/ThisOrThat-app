var applicationModule = require("application");

/*if(application.ios){
    
    var AppDelegate = UIResponder.extend({
    applicationDidFinishLaunchingWithOptions(application, launchOptions) {
        return FBSDKApplicationDelegate.sharedInstance().applicationDidFinishLaunchingWithOptions(application, launchOptions);
    },

    applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation) {
        return FBSDKApplicationDelegate.sharedInstance().applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation);
    },

    applicationDidBecomeActive(application) {
        FBSDKAppEvents.activateApp();
    }
}, {
    protocols: [UIApplicationDelegate]
});

    application.ios.delegate = AppDelegate;

}*/
var navigation = require("./shared/navigation");
applicationModule.mainModule = navigation.startingPage();
applicationModule.cssFile = "./app.css";
applicationModule.start();
