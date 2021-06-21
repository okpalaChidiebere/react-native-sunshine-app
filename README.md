# Sunshine!

This is the repository for the weather app that i leanerd from [Developing Android Apps](https://www.udacity.com/course/new-android-fundamentals--ud851) course at Udacity. I basically remade that same app but this time with [react-native](https://reactnative.dev/docs/components-and-apis) and then using [Expo APIs](https://docs.expo.io/versions/v41.0.0/sdk/accelerometer/) where needed.

Expo is a service that makes just about everything involving React Native a whole lot easier. With Expo, you can load and run projects built by `create-react-native-app` with the same JavaScript you already know. There's no need to compile any native code. And much like Create React App, using Expo with Create React Native App lets us get an application up and running with almost no configuration. You NEED to install Expo app for [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) or [iOS](https://apps.apple.com/us/app/expo-client/id982107779)

To create a react-native app with already predefined expo configurations necessary for your react native app to be able to use Expo SDKs, run `npx create-react-native-app <PROJECT_FOLDER_NAME>` and then choose "Default new app" over "expo/templates" OfCourse you need to have Node Package Manager already confugured in your system

To run your app in Android simulator run `yarn android` and for iOS run `yarn ios`. Make sure you have configured your environment following this [link](https://reactnative.dev/docs/environment-setup)

NOTE: when setting up your environment to use Android emulator, sometimes the lates version of JAVA may not have been supported by expo or react-native. So you will have to downgrade your JAVA version. run `java -version` to see your Java version. I had to downgradte from 16.1.1 to 11.0.11 using [sdkman](https://sdkman.io/) i could do that easily. Look at tutorial [here](https://www.youtube.com/watch?v=043tTKcmk2c)

Make sure you must have ran `pod install` inside the ios folder to install all pods related to the packages you added. This way you have all the packages ready for iOS to use. For Android just installing the packages from npm or yam is enough, but for iOS you have the extra step of running `pod install`

# Background Tasks
As long as you used Create React Native App to initialize your project after you install expo-task-manager and expo-background-fetch it is quite straight forward. For android, out of the box, you are good to go. However, for iOS, you need to add to your app.json file
```json
{
  "expo": {
    ...
    "ios": {
      ...
      "infoPlist": {
        ...
        "UIBackgroundModes": [
          "location",
          "fetch"
        ]
      }
    }
  }
}
```
and to your info.plist. Can be fount at /ios/<app_name>/info.plist
```xml
	<key>UIBackgroundModes</key>
	<array>
		<string>fetch</string>
		<string>processing</string>
	</array>
```
- Here is a really good [article](https://gist.github.com/darryl-davidson/217693ba906a9c35bea15c28a543ea0d) on Bacground task for fetch request and location
- Read the [arcticle](https://stackoverflow.com/questions/48157185/info-plist-file-for-react-native-ios-app-using-expo-sdk) for more configurions about the info.plist file. 
- Also look at thid debugging [issue](https://github.com/transistorsoft/react-native-background-fetch/issues/230)

# Accessibility in React Native

Accessibility refers to the design of products, devices, services, or environments for people who experience disabilities.
[http://man.hubwiz.com/docset/React_Native.docset/Contents/Resources/Documents/react-native/docs/accessibility.html](http://man.hubwiz.com/docset/React_Native.docset/Contents/Resources/Documents/react-native/docs/accessibility.html)


# Screens and Navigation and deep linking

- [https://medium.com/@jacrplante/react-native-screens-multiple-stacks-da112a94ad24](https://medium.com/@jacrplante/react-native-screens-multiple-stacks-da112a94ad24)
- [https://reactnavigation.org/docs/hello-react-navigation](https://reactnavigation.org/docs/hello-react-navigation)
- This [video](https://www.youtube.com/watch?v=_fVNt1KjkEk&list=PLy9JCsy2u97mC2YWw0fsvSAxTA8y1l0SC) for explanation on why you need deep link in your app. So good!
- [https://github.com/AnkitDroidGit/ReactNative-Deeplink/tree/notification-deeplink](https://github.com/AnkitDroidGit/ReactNative-Deeplink/tree/notification-deeplink)
- [https://stackoverflow.com/questions/53412278/how-to-implement-custom-header-icons-within-a-nested-stacknavigator](https://stackoverflow.com/questions/53412278/how-to-implement-custom-header-icons-within-a-nested-stacknavigator)


# FlexBoxes in react-native and components

- This [article](https://www.toptal.com/react-native/react-native-for-android-development) talks about flexBox well and also other mobile app development that a good to know like how to use loading indicators, load image urls, etc
- Be sure to consider using [react-native-paper](https://callstack.github.io/react-native-paper/activity-indicator.html) for some components
- Search the [react-native-directory](https://reactnative.directory/) for some external packages and components too as well

# Notifications

- Expo has their own Notificatio sdk called [expo-notifications](https://docs.expo.io/versions/v41.0.0/sdk/notifications/) for local push notifications and remote push notifications. I might give Expo a sht for remote push notifications dure to their good documentation
- Personally i will use Expo local push notifications but for remote, i will use Amazon pinpoint with the help of AWS amplify. Watch this [video](https://www.youtube.com/watch?v=um-DIIRsFlM) to see it.
- You can also use OneSignal for push notifications. Watch this [video](https://www.youtube.com/watch?v=Qf8OzB9qJq8)
- Google FireBase is an option as well

# Useful Links on Responsive Design

- [https://stackoverflow.com/questions/53465796/how-to-handle-responsive-layout-in-react-native](https://stackoverflow.com/questions/53465796/how-to-handle-responsive-layout-in-react-native)
- [https://reactnative.dev/docs/usewindowdimensions](https://reactnative.dev/docs/usewindowdimensions)
- [https://www.w3schools.com/css/css3_flexbox_responsive.asp](https://www.w3schools.com/css/css3_flexbox_responsive.asp)
- [https://www.youtube.com/watch?v=RF-I0X6bTYU](https://www.youtube.com/watch?v=RF-I0X6bTYU)