import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, Linking } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {
  error_message,
  forecast_stack,
  forecast_details_stack,
  settings_stack,
} from "./res/values/strings";
import ForecastDetails, {
  ForecastDetailsOptions,
} from "./res/components/ForecastDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Forecast, { ForecastOptions } from "./res/components/Forecast";
import Settings, { SettingsOptions } from "./res/components/Settings";
import { Provider } from "react-redux";
import {
  BASE_CONTENT_URL,
  CONTENT_AUTHORITY,
  createTable,
} from "./utils/AppDatabase";
import { initialize } from "./utils/SunshineSyncUtils";
import scheduleTaskManagerSync from "./utils/SunshineTaskManager";
import * as Notifications from "expo-notifications";
import { colorPrimaryDark } from "./res/values/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import store from "./store/configureStore";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [state, setState] = useState({
    isReady: false,
    initialized: false, //This will be mainly used as a safeguard to prevent calling the synchronize method more than once.
  });

  useEffect(() => {
    (async () => {
      try {
        createTable();

        /**
         * We check if an immediate sync is required. It’s best practice to not initialize things more than once,
         * so for that, we will make sure that startImmediateSync will only get called once when the app starts
         * and only if the database was empty.
         */
        if (!state.initialized) {
          await initialize();

          /*
           * This method call triggers Sunshine to create its task to synchronize weather data
           * periodically.
           */
          scheduleTaskManagerSync();
        }

        setState({
          isReady: true,
          initialized: true,
        });
      } catch (e) {
        setState({
          isReady: true,
        });
        console.warn("Error From NetworkFetch: ", e);
      }
    })();
  }, []);

  const { isReady } = state;

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar style="light" backgroundColor={colorPrimaryDark} />
        {isReady ? (
          <NavigationContainer
            linking={
              /* https://reactnavigation.org/docs/navigation-container/#linking */ {
                prefixes: [
                  BASE_CONTENT_URL,
                  `https://${CONTENT_AUTHORITY}.com`,
                ],
                config: {
                  /* Configuration for linking */
                  screens: {
                    [forecast_details_stack]: {
                      path: "weatherData/:weatherIndex",
                      parse: {
                        weatherIndex: Number,
                      },
                    },
                  },
                },
                subscribe(listener) {
                  const onReceiveURL = ({ url }) => listener(url);

                  // Listen to incoming links from deep linking
                  Linking.addEventListener("url", onReceiveURL);

                  // Listen for whenever a user interacts with a notification (eg. taps on it). This is similar to perndingIntent in Android app development
                  //https://docs.expo.io/versions/v41.0.0/sdk/notifications/#addnotificationresponsereceivedlistenerlistener-event-notificationresponse--void-void
                  const subscription =
                    Notifications.addNotificationResponseReceivedListener(
                      (response) => {
                        const url =
                          response.notification.request.content.data.url;

                        // Any custom logic to see whether the URL needs to be handled
                        //...

                        // Let React Navigation handle the URL
                        listener(url);
                      }
                    );

                  return () => {
                    // Clean up the event listeners
                    Linking.removeEventListener("url", onReceiveURL);
                    subscription.remove();
                  };
                },
              }
            }
          >
            <MainNavigator />
          </NavigationContainer>
        ) : (
          <Text>{error_message}</Text>
        )}
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    marginTop: StatusBar.currentHeight || 0,
  },
});

const Stack = createStackNavigator();
const MainNavigator = () => (
  <Stack.Navigator headerMode="screen">
    <Stack.Screen
      name={forecast_stack}
      component={Forecast}
      options={ForecastOptions}
    />
    <Stack.Screen
      name={forecast_details_stack}
      component={ForecastDetails}
      options={ForecastDetailsOptions}
    />
    <Stack.Screen
      name={settings_stack}
      component={Settings}
      options={SettingsOptions}
    />
  </Stack.Navigator>
);
