export default ({ config }) => {
  //const app_name = "LoopSix";
  return {
    ...config, //spread configuration from app.json here.
    icon: "https://github.com/udacity/ud851-Sunshine/blob/S05.01-Exercise-AsyncTaskLoader/app/src/main/res/mipmap-mdpi/ic_launcher.png?raw=true",
    splash: {
      image:
        "https://github.com/expo/expo/blob/master/templates/expo-template-blank/assets/splash.png?raw=true",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      infoPlist: {
        UIBackgroundModes: ["fetch"],
      },
      bundleIdentifier: "com.reactnativesunshineapp",
    },
    plugins: [
      [
        "expo-notifications",
        {
          icon: "./local/path/to/myNotificationIcon.png",
          mode: "production",
        },
      ],
    ],
    android: {
      package: "com.reactnativesunshineapp",
    },
  };
};
