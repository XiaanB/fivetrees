import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function HeaderLeftButton() {
  const navigation = useNavigation();

  return (
    <Ionicons
      name="menu"
      size={28}
      style={{ marginLeft: 15 }}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    />
  );
}
