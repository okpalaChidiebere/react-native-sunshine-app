# Sunshine!

This is the repository for the weather app that i learned from [Developing Android Apps](https://www.udacity.com/course/new-android-fundamentals--ud851) course at Udacity. I basically remade that same app but this time with [react-native](https://reactnative.dev/docs/components-and-apis) and then using [Expo APIs](https://docs.expo.dev/versions/latest/) where needed.

Expo is a service that makes just about everything involving React Native a whole lot easier. With Expo, use Expo managed workflow or bare minimum app(with the `/ios` and `/android` folder exposed to you. Usually end up deleting the pre build folders though so that eas can do it themselves. But it is a nice option to have!). I prefer to use the bare minimum expo app because it give me the ability to write [native-modules](https://reactnative.dev/docs/native-modules-intro) for ios and android when needed. Although i prefer to use [expo modules](https://docs.expo.dev/modules/get-started/#creating-the-local-expo-module). And much like Create React App, using Expo with Create React Native App lets us get an application up and running with almost no configuration. You can to install Expo Go app for [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) or [iOS](https://apps.apple.com/us/app/expo-client/id982107779) to run project but its limited to projects using only Expo supported libraries. With Bare workflow, I prefer to use Exp dev client to run my app. This is because i can use libraries that expo do not support with Expo and test them on real devices.

To create a react-native app with already predefined expo configurations necessary for your react native app to be able to use Expo SDKs, run `npx create-expo-app@latest --template` and then choose "minimal bare workflow; expo prebuild" over the other expo templates. Of Course you need to have Node Package Manager already configured in your system.

To build and run your app with the prebuild on device (Device must be connected to laptop; adb for android; for ios you will see it in the finder) or simulator run `npx expo run android` and for iOS run `npx expo run ios`. This comes in handy if you don't want to wait for Expo EAS build to see potential build error. Make sure you have configured your environment following this [link](https://reactnative.dev/docs/environment-setup). The changes you have in your app.json will be used in generating the prebuild folder for ios and android respectively

I prefer to use Expo dev client but you will have to build locally the app with EAS and all `app.json` configs being applied then install the app on the device during development of the app to test features

To start your app `npx expo start`. Then you can switch between development build or Expo Go. I prefer to to use development build if you have `expo-dev-client` installed in project

NOTE: when setting up your environment to use Android emulator, sometimes the latest version of JAVA may not have been supported by expo or react-native. So you will have to downgrade your JAVA version. run `java -version` to see your Java version. I had to downgrade from 16.1.1 to 11.0.11 using [sdkman](https://sdkman.io/) i could do that easily. Look at tutorial [here](https://www.youtube.com/watch?v=043tTKcmk2c)

By default, the Bare minimal workflow from expo is in Javascript. To add [Typescript](https://docs.expo.dev/guides/typescript/#in-an-existing-project) to the app, convert `App.js` to `App.tsx` by running `mv App.js App.tsx`. Then run `npx expo start`. This command will detect that there is an typescript configuration file and will ask that it install all typescript dependencies necessary to add typescript to your project. Select 'Yes' then i will complete all the configuration. **Note:** After upgrade, you may have to add resolutions to your package.json to avoid typescript complaining about classes like:

```json
{
  "resolutions": {
    "@types/react": "<your react-dom version>"
  }
}
```

Must run `yarn install` after

Make sure you must have ran `pod install` inside the ios folder to install all pods related to the packages you added. This way you have all the packages ready for iOS to use. For Android just installing the packages from npm or yam is enough, but for iOS you have the extra step of running `pod install`

# Expo Upgrade

To upgrade an minimal bare workflow with expo its quite simple. There are two questions you want to ask yourself. **Option 1:** Do you want to keep your ios and android bare files thesame and just merge the new react native code changes to it or **Option 2:** you really don't care about generating new folders and getting rid of the current bare folders

## Option 1:

- First run `npx react-native upgrade` . This command will upgrade your react native dependency and the bare folders while leaving your bare code configs intact.
- Then run `npx expo install --fix` after. to upgrade all dependencies to match the specific expo version. This will upgrade all expo dependencies to the latest patch and also other react native community libraries that expo relatively support. It is important to delete the `react-native-unimodules` dependencies because for recent version of expos, you dont need it. You will be getting an error "Invariant Violation: "main" has not been registered." if you still have this still installed

## Option 2:

- Run `npm i -g eas-cli` to upgrade to the latest version of EAS CLI
- Run `npx expo prebuild --clean` The following command to regenerate the android and ios directories based on the app config (app.json/app.config.js) configuration. [See](https://docs.expo.dev/workflow/expo-cli/). Before I run pre-build i like to have app package name defined in the app.json files for ios and android respectively then i build. Note that all the expo configurations you have in your app.json file will be applied to your native folder which is good!. For example, if you have linking configurations for your app like [this](https://docs.expo.dev/guides/linking/#in-a-standalone-app), [this](https://docs.expo.dev/guides/linking/#universal-links-on-ios), and [this](https://docs.expo.dev/guides/linking/#deep-links-on-android) which you must add, it will be configured into your info.plist and AndroidManifest.xml respectively which is NICE! If you have any custom native modules you wrote for project be sure to keep a copy of them so you move them over to the new generated ios and android folders
- Then run `npx expo install --fix` after. to upgrade expo and all dependencies to match the latest patch
- `npx expo-doctor@latest` to check for any possible known issues. this is optional
  It is important to run the command in this sequence.

# Expo build

To build Apps, i like to use EAS Build. With EAS build, you can easily share your app with Stakeholders. Read [this](https://docs.expo.dev/eas-update/getting-started/) and [this](https://www.youtube.com/watch?v=3RCahcMlsBY). An example of an apk build for android can look like `eas build -p android --profile preview` When the build is done, you get a link where you can download the apk file fro your expo account

- Make sure you have `eas` cli installed . Confirm this by running `npx eas-cli -v`. If it is not installed or the current version is outdated, the that command will install the latest version. Confirm this by running `npm list -g` Look at this [issue](https://github.com/expo/eas-cli/issues/1075#issuecomment-1859557087)
- Some expo packages are necessary to be installed to use for EAS. Install `npx expo install expo-updates expo-dev-client`. You will have to install `expo-constants` too if you want to add push notifications to your app. `expo-constants` helps you reference config values from `app.json` or `app.config.ts` file
- Make sure you are [authenticated](https://docs.expo.dev/more/expo-cli/#authentication) into your expo cli. If you are logged into your expo cli, eas can easily pull in credentials from there. To confirm you are logged into expo run `npx expo whoami`. If you are not logged, run `npx expo login -u YOUR_USERNAME -p YOUR_PASSWORD` . To confirm that eas is logged in run `eas whoami`. The eas and expo cli usernames account usually should match
- Run `eas update:configure`
- Run `eas build:configure` and select **ALL** to be able to generate builds for android and ios. This will generate a eas.json file and projectId that you will need for expo push notifications
- `npx expo-doctor@latest` to check for any possible known issues. this is optional

when you run eas update:configure (gives you the eas update url) or eas build:configure (gives you the projectId), you will asked to update `app.config.ts` if you have that file otherwise it updates the app.json file for you the configuration need for eas

After you run eas build, you will get a project-id that was created for you be sure to update the `app.config.ts` as the terminal tells you. At this point, you should have the project for the app created in expo.dev. You can confirm this in the dashboard

**NOTE** if you have the `app.config.ts` file present that overrides the app.json, be sure to update the `app.config.ts` as the terminal tells you. At this point, you should have the project for the app created in [expo.dev](expo.dev) You can confirm this in the dashboard assuming you have created an expo account at expo.dev

- [https://docs.expo.dev/build-reference/apk/](https://docs.expo.dev/build-reference/apk/)
- [https://docs.expo.dev/archive/classic-updates/publishing/#limitations](https://docs.expo.dev/archive/classic-updates/publishing/#limitations)
- [Submit to stores](https://docs.expo.dev/submit/introduction/)
- [EAS build docs](https://docs.expo.dev/build/setup/)

You eas.json file should be similar to this

```json
{
  ...
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
    },
    "development-simulator": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true,
        "buildConfiguration": "Debug"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {}
  }
  ...
}
```

# Generating your First Android Local Build

- `eas build -p android --profile preview --local`
- The `--local` flag is to build the app locally. And have the `file` (for development or preview) or `file.aab` (for production ready to upload to Google PlayStore)
- You will be using `adb` to install your .apk build into device or simulator. If you have androidStudio installed chances are you have adb access in your cli
- `adb devices` list all devices connected currently. If you have simulators running it will show up. If you have a real device connected using usb-c cord, it will show up here. For your connected real device to show up in the list though you have to enable `USB debugging` in the [`Developer Options`](https://www.samsung.com/uk/support/mobile-devices/how-do-i-turn-on-the-developer-options-menu-on-my-samsung-galaxy-device/) for your android phone. Watch this [video](https://www.youtube.com/watch?v=J34F_6isIFM) to see how to enable developer options for your phone
- `adb install path/to/the/file.apk` will streamlined updating the app if it already exits or installing the app if it does not exist.

# Generating your first iOS Local build

- Before you build, you need to have the `pod` (supported eas build version) and [`fastlane`](https://docs.fastlane.tools/getting-started/ios/setup/) installed. Run `fastlane -v` and `pod --version`. You can install or update them with `brew`
- The `punycode` module is required and your node version may not support it. So you many need to upgrade your node version. See [stackoverflow](https://stackoverflow.com/questions/77587325/deprecationwarning-the-punycode-module-is-deprecated). At this time node version 20.5.1 is good enough
- Run `eas build -p ios --profile development --local`.
- If its your first time, you will be asked to log into your ios developer [account](https://developer.apple.com/account). Say `Yes` to that and Your Apple ID is your email or phoneNumber (the next time you generate a build eas will remember it);
- If you are NOT building for ios simulators, you will need apps signed with an ad hoc provisioning profile which can be installed by any iOS device whose unique identifier (UDID) is registered with the provisioning profile. So you have to add `Expo profile` as a verified source for the app. So you will need an Apple Distribution Certificate for this internal distribution. Expo will create this for you and save it to your account. So each time you want to register a device as one of the device that can used with this provisioned profile, it will reuse this certificate. see this [doc](https://docs.expo.dev/build/internal-distribution/#setting-up-ad-hoc-provisioning)
- If its your first time, you will be prompted to to `provision device for ad hoc build` then any other time you will need to add an ios device manually by running `eas device:create` to add a device that will show up in the list. I prefer to get a registration URL to be opened on your devices. From the url i can download the profile and install it on my device. You need Developer Mode enabled to interact with your internal distribution builds and local development builds. open Settings > Privacy & Security > Developer Mode. Enable the toggle. You will receive a prompt from iOS to restart. See [doc](https://docs.expo.dev/guides/ios-developer-mode/). From the list, you press [Space](https://github.com/expo/eas-cli/issues/1722#issuecomment-1447766267) to select or unselect and Return to submit
- To install the app on simulator, unzip the `file.tar.gz` file and drag/drop the `.app` (A file with logo) into the simulator
- To install the build `.ipa` file into real device, connect the device to your laptop using a cable; find the phone, then drag/drop the .ipa file into the General tap. See [doc](https://the-sudhanshu.medium.com/how-to-install-ipa-on-iphone-ipad-eb4fc424561a)

# Expo App Config

- By default Expo uses the app.json file to configure your app during EAS builds and Expo dev client. Personally i like to use the app.config.js file to write all my configurations because i can feed env variables from my terminal into my configurations; this way i can avoid not committing certain data into github. app.config.js overrides the app.json file. See more [here](https://docs.expo.dev/workflow/configuration/).
- If you are using expo managed work flow, all your configurations are managed in this config file. However, with a expo minimal bare workflow (standalone) its different. In Standalone app, times you will have to edit the info.plist and AndroidManifest.xml files because when you want to test your code in the simulator, your config in the app.json is not used because its you are not running in expo-dev-client. Personally All the configurations i write in the native code i will also put in the expo config file because it will help during `expo prebuild` and also you can easily see all the configs for your app in one file!
- The good thing about using expo is that you avoid writing native code. Example With Linking. Because of the fact i am using Linking from the `expo-linking` instead of from `react-native` i dont have to write native code as specified [here](https://reactnavigation.org/docs/deep-linking#setup-on-ios). Might edit the info.plist and AndroidManifest.xml as specified here if i want to run my app outside expo client as specified [here](https://docs.expo.dev/guides/linking/#in-a-standalone-app) but editing those files is easy!. You can see an example of editing native code [here](https://www.youtube.com/watch?v=W6KUjYnGbkk) and [here](https://blog.pusher.com/react-native-auth0/) which sucks

# Adding Navigation

You an use React navigation or you can use [expo-router](https://expo.github.io/router/docs/category/react-navigation). I prefer expo-router because its easier to follow and set up!

- For React navigation follow these [steps](https://reactnavigation.org/docs/getting-started/)
- For using `expo-router`, make sure you have [install dependencies](https://docs.expo.dev/router/installation/#install-dependencies), [set up entry point](https://docs.expo.dev/router/installation/#setup-entry-point) and [modify your app scheme](https://docs.expo.dev/router/installation/#modify-project-configuration). After these steps, create the `/app/index.js` or `app/index.tsx` if typescript. The expo router uses that folder to know all the pages for your app!. See [documentation](https://docs.expo.dev/router/create-pages/)
- [Authentication in Expo Router](https://docs.expo.dev/router/reference/authentication/)
- [Router Settings for development like setting initial route name](https://docs.expo.dev/router/advanced/router-settings/)
- `npx uri-scheme open "myapp://about" --android` for testing deep linking. It uses adb under the hood. So make sure there is a device or emulator in adb by running `adb devices`. You may have to to register your app by `npx uri-scheme add myapp`. If the uri-scheme worked successfully, you will see not console error in red
- [https://reactnavigation.org/docs/deep-linking#testing-with-npx-uri-scheme](https://reactnavigation.org/docs/deep-linking#testing-with-npx-uri-scheme)

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

- Here is a really good [article](https://gist.github.com/darryl-davidson/217693ba906a9c35bea15c28a543ea0d) on Background task for fetch request and location
- Read the [article](https://stackoverflow.com/questions/48157185/info-plist-file-for-react-native-ios-app-using-expo-sdk) for more configurions about the info.plist file.
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
- [https://freecontent.manning.com/in-depth-styling-with-react-native-and-flexbox/](https://freecontent.manning.com/in-depth-styling-with-react-native-and-flexbox/)
- Be sure to consider using [react-native-paper](https://callstack.github.io/react-native-paper/activity-indicator.html) for some components
- Search the [react-native-directory](https://reactnative.directory/) for some external packages and components too as well

# Notifications

- Expo has their own Notification sdk called [expo-notifications](https://docs.expo.io/versions/v41.0.0/sdk/notifications/) for local push notifications and remote push notifications. I might give Expo a chance for [remote push notifications](https://www.codingdeft.com/posts/react-native-push-notifications/) due to their good documentation
- Personally i will use Expo local push notifications but for remote, i will use Google FireBase messaging.
- You can also use OneSignal for push notifications. Watch this [video](https://www.youtube.com/watch?v=Qf8OzB9qJq8)
- Amazon pinpoint with the help of AWS amplify. Watch this [video](https://www.youtube.com/watch?v=um-DIIRsFlM) to see it is an option as well

# Useful Links on Responsive Design

- [App theme Typescript](https://github.com/react-navigation/react-navigation/issues/9161)
- [https://stackoverflow.com/questions/53465796/how-to-handle-responsive-layout-in-react-native](https://stackoverflow.com/questions/53465796/how-to-handle-responsive-layout-in-react-native)
- [https://reactnative.dev/docs/usewindowdimensions](https://reactnative.dev/docs/usewindowdimensions)
- [https://www.w3schools.com/css/css3_flexbox_responsive.asp](https://www.w3schools.com/css/css3_flexbox_responsive.asp)
- [https://www.youtube.com/watch?v=RF-I0X6bTYU](https://www.youtube.com/watch?v=RF-I0X6bTYU)

# App.json

- [https://docs.expo.dev/versions/latest/config/app/](https://docs.expo.dev/versions/latest/config/app/)
- [infoplist configs](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW1)
- [https://instamobile.io/react-native-tutorials/react-native-location/](https://instamobile.io/react-native-tutorials/react-native-location/)
- [Android Admob](https://boostrand.com/configuring-app-json-file/)
- [https://github.com/OneSignal/onesignal-expo-plugin/issues/59](https://github.com/OneSignal/onesignal-expo-plugin/issues/59)

# Material 3 Google

- [https://m3.material.io/theme-builder#/custom](https://m3.material.io/theme-builder#/custom)
- [https://m3.material.io/styles/color/dynamic/user-generated-source](https://m3.material.io/styles/color/dynamic/user-generated-source)
- [https://m3.material.io/styles/color/static/custom-brand](https://m3.material.io/styles/color/static/custom-brand)
- [https://m3.material.io/components/snackbar/guidelines](https://m3.material.io/components/snackbar/guidelines)

# React hooks Form

- [https://echobind.com/post/react-hook-form-for-react-native](https://echobind.com/post/react-hook-form-for-react-native)
- [https://medium.com/skyshidigital/creating-form-in-react-native-using-react-hook-form-a81a99e45605](https://medium.com/skyshidigital/creating-form-in-react-native-using-react-hook-form-a81a99e45605)
- [https://codesandbox.io/s/react-hook-form-multisteps-xz4xq?file=/src/App.js](https://codesandbox.io/s/react-hook-form-multisteps-xz4xq?file=/src/App.js)
- [https://stackoverflow.com/questions/70673394/using-react-hook-form-in-multistep-without-using-a-state-manager](https://stackoverflow.com/questions/70673394/using-react-hook-form-in-multistep-without-using-a-state-manager)
- [https://react-hook-form.com/docs/formprovider](https://react-hook-form.com/docs/formprovider)
- [https://codesandbox.io/p/sandbox/hopeful-goldwasser-kmfb01?file=%2Fsrc%2Fstate.js](https://codesandbox.io/p/sandbox/hopeful-goldwasser-kmfb01?file=%2Fsrc%2Fstate.js)
- [Creating a React Form Using React Hook Form and Yup in TypeScript](https://medium.com/@msgold/creating-a-react-form-using-react-hook-form-and-yup-in-typescript-640168c5ed57)
