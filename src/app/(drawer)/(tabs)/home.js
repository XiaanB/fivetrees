import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>🏠 Home Tab</Text>
      <Button title="Open Settings Modal" onPress={() => router.push('/(modal)/settings')} />
    </View>
  );
}
