import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function SettingsModal() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>⚙️ Settings Modal</Text>
      <Button title="Close" onPress={() => router.back()} />
    </View>
  );
}
