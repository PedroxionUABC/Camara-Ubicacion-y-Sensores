import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Camara from "./components/Camara";

export default function App() {
  return (
    <View style={styles.container}>
      <Camara />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
