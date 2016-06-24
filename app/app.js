var application = require("application");
var navigation = require("./shared/navigation");

if(application.ios){
    
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

}
application.mainModule = navigation.startingPage();
application.cssFile = "./app.css";
application.start();
