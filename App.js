import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";

const cameraRef = useRef(null);
const [permission, requestPermission] = useCameraPermissions();

async function tomarFoto() {
  const foto = await cameraRef.current?.takePictureAsync();
  if (foto?.uri) setFotoUri(foto.uri);
}
// En JSX, con permiso concedido:
// <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
