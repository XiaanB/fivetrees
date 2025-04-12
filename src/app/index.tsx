import React, { useEffect, useState } from "react";
import { Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import CustomSplash from '../../components/CustomSplash';


SplashScreen.preventAutoHideAsync();

export default function Index() {

  const [appReady, setAppReady] = useState(false);  // Track app readiness
  const [isLoading, setIsLoading] = useState(true);  // Track loading state

  useEffect(() => {
    const prepare = async () => {
      try {
        // Prevent splash screen from auto-hiding until we're done with loading
        await SplashScreen.preventAutoHideAsync();

        // Simulate loading (e.g., loading fonts, data, etc.)
        await new Promise((resolve) => setTimeout(resolve, 2000));  // Simulated loading (e.g., 2 seconds)

        // Update state to mark loading complete
        setAppReady(true);
        setIsLoading(false);
      } catch (error) {
        console.warn(error);
      } finally {
        // Hide splash screen once loading is done
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);  // Only run this once when the component mounts

  // If loading is still in progress, show CustomSplash
  if (isLoading) {
    return <CustomSplash />;
  }


  return <Redirect href="/login" />;
}
