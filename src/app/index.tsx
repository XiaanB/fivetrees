import React, { useEffect, useState } from "react";
import { Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as ScreenOrientation from 'expo-screen-orientation';
import CustomSplash from '../../components/CustomSplash';


SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [appReady, setAppReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orientation, setOrientation] = useState("PORTRAIT");

  useEffect(() => {
    const subscribeOrientation = async () => {
      const currentOrientation = await ScreenOrientation.getOrientationAsync();
      setOrientation(getOrientationName(currentOrientation));

      const subscription = ScreenOrientation.addOrientationChangeListener(event => {
        setOrientation(getOrientationName(event.orientationInfo.orientation));
      });

      return () => {
        ScreenOrientation.removeOrientationChangeListeners();
      };
    };

    subscribeOrientation();
  }, []);

  const getOrientationName = (value) => {
    switch (value) {
      case ScreenOrientation.Orientation.LANDSCAPE_LEFT:
      case ScreenOrientation.Orientation.LANDSCAPE_RIGHT:
        return "LANDSCAPE";
      case ScreenOrientation.Orientation.PORTRAIT_UP:
      case ScreenOrientation.Orientation.PORTRAIT_DOWN:
        return "PORTRAIT";
      default:
        return "UNKNOWN";
    }
  };

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise(resolve => setTimeout(resolve, 2000));
        setAppReady(true);
        setIsLoading(false);
      } catch (error) {
        console.warn(error);
      } finally {
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, []);

  if (isLoading) {
    return <CustomSplash />;
  }

  return (
    <Redirect href="/login" />
  );
}
