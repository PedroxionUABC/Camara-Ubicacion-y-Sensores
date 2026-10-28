import { useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function Camara() {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [fotoUri, setFotoUri] = useState(null);
  const [camaraLista, setCamaraLista] = useState(false);
  const [capturando, setCapturando] = useState(false);
  const [error, setError] = useState(null);

  async function tomarFoto() {
    // No capturar si la camara no esta lista o si se esta tomando la foto
    if (!camaraLista || capturando) return;
    setCapturando(true);
    setError(null);
    try {
      // TOMAR FOTO
      const foto = await cameraRef.current?.takePictureAsync();
      if (foto?.uri) setFotoUri(foto.uri);
    } catch (e) {
      setError("Hubo un error al tomar la foto");
    } finally {
      setCapturando(false);
    }
  }

  // permiso pendiente
  if (!permission) {
    return (
      <View style={styles.centro}>
        <Text style={styles.texto}>Cargando permisos…</Text>
      </View>
    );
  }

  // permiso denegado
  if (!permission.granted) {
    return (
      <View style={styles.centro}>
        <Text style={styles.titulo}>Permiso camara</Text>
        <Text style={styles.texto}>
          Se necesita acceso a la camara para mostrar la vista previa y para tomar fotos.
        </Text>
        <Pressable style={styles.boton} onPress={requestPermission}>
          <Text style={styles.textoBoton}>Dar permiso</Text>
        </Pressable>
      </View>
    );
  }

  // permiso concedido
  return (
    <View style={styles.contenedor}>
      <CameraView
        ref={cameraRef}
        style={styles.camara}
        facing="back"
        onCameraReady={() => setCamaraLista(true)}
      />

      <View style={styles.panel}>
        <Pressable
          style={styles.boton}
          onPress={tomarFoto}
          disabled={!camaraLista || capturando}
        >
          <Text style={styles.textoBoton}>
            {capturando ? "Capturando…" : camaraLista ? "Tomar foto" : "Cargando…"}
          </Text>
        </Pressable>

        {error && <Text style={styles.error}>{error}</Text>}

        {fotoUri && (
          <>
            <Text style={styles.etiqueta}>Ultima foto:</Text>
            <Image source={{ uri: fotoUri }} style={styles.foto} />
          </>
        )}
      </View>
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
  panel: {
    padding: 16,
    alignItems: "center",
  },
  error: {
    color: "#b91c1c",
    marginTop: 8,
  },
  etiqueta: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 14,
  },
  foto: {
    width: 120,
    height: 160,
    borderRadius: 8,
  },
});
