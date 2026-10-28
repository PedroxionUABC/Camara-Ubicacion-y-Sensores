import { useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function Camara() {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();

  // Permiso pendiente: todavía se está consultando
  if (!permission) {
    return (
      <View style={styles.centro}>
        <Text style={styles.texto}>Cargando permisos…</Text>
      </View>
    );
  }

  // Permiso denegado: explicar y ofrecer volver a pedirlo
  if (!permission.granted) {
    return (
      <View style={styles.centro}>
        <Text style={styles.titulo}>Permiso de cámara</Text>
        <Text style={styles.texto}>
          Necesitamos acceso a la cámara para mostrar la vista previa y tomar fotos.
        </Text>
        <Pressable style={styles.boton} onPress={requestPermission}>
          <Text style={styles.textoBoton}>Dar permiso</Text>
        </Pressable>
      </View>
    );
  }

  // Permiso concedido
  return (
    <View style={styles.contenedor}>
      <CameraView ref={cameraRef} style={styles.camara} facing="back" />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  camara: {
    flex: 1,
  },
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  texto: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  boton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
