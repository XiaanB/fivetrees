import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import React, { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import { Audio } from 'expo-av';

export default function CustomSplash() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const soundRef = useRef(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // Load and play audio
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/intro-music.mp3')
      );
      soundRef.current = sound;
      await sound.playAsync();
    };
    loadSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.stopAsync();
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/trees-animation.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>Welcome to Five Trees</Animated.Text>
      <Text style={styles.tagline}>Natural • Refillable • Beautiful</Text>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF3EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2F4F4F',
  },
  tagline: {
    fontSize: 16,
    color: '#556B2F',
    marginTop: 10,
    fontStyle: 'italic',
  },
});
