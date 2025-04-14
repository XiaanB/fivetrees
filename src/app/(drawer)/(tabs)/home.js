import React, { useRef, useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  PanResponder,
  View,
} from 'react-native';
import { Link } from 'expo-router';
import { MotiView } from 'moti';
import { Video } from 'expo-av';

import bannerImage from '../../../../assets/images/Banner.jpg';
import myVideo from '../../../../assets/videos/Banner.mp4';
import special1 from '../../../../assets/images/special1.jpg';
import special2 from '../../../../assets/images/special2.jpg';
import special3 from '../../../../assets/images/special3.jpg';

const { width } = Dimensions.get('window');

const specials = [
  { id: '1', title: '50% Off Hand Wash', image: special1 },
  { id: '2', title: 'Buy 1 Get 1 Free', image: special2 },
  { id: '3', title: 'Limited Time Discount', image: special3 },
];

export default function HomePage() {
  const [position, setPosition] = useState({ x: 20, y: 500 });
  const pan = useRef({ x: 20, y: 500 }).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newX = pan.x + gestureState.dx;
        const newY = pan.y + gestureState.dy;
        setPosition({ x: newX, y: newY });
      },
      onPanResponderRelease: (_, gestureState) => {
        pan.x += gestureState.dx;
        pan.y += gestureState.dy;
      },
    })
  ).current;

  return (
    <View style={{ flex: 1 }}>
      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <MotiView style={styles.bannerContainer} from={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Image source={bannerImage} style={styles.bannerImage} resizeMode="cover" />
          <Text style={styles.bannerText}>Welcome to Five Trees</Text>
        </MotiView>

        <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Video
            source={myVideo}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            useNativeControls
            style={styles.video}
          />
        </MotiView>

        <Text style={styles.sectionTitle}>🔥 Specials</Text>

        {specials.map((item, index) => (
          <MotiView
            key={item.id}
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 100 }}
            style={styles.specialCard}
          >
            <Image source={item.image} style={styles.specialImage} />
            <Text style={styles.specialTitle}>{item.title}</Text>
          </MotiView>
        ))}
      </ScrollView>

      {/* Floating draggable button */}
      <View
        style={[styles.floatingButton, { top: position.y, left: position.x }]}
        {...panResponder.panHandlers}
      >
        <Link href="/settings" asChild>
          <TouchableOpacity style={styles.buttonInner}>
            <Text style={styles.buttonText}>⚙️</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100,
    backgroundColor: '#f9f9f9',
  },
  bannerContainer: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
  },
  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  bannerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  video: {
    width: width - 40,
    height: 200,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 20,
  },
  specialCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  specialImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  specialTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  floatingButton: {
    position: 'absolute',
    zIndex: 999,
  },
  buttonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(173, 216, 230, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    fontSize: 26,
    color: '#005f73',
  },
});
