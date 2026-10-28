import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";

export default function Ubicacion() {
  const [coords, setCoords] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  async function obtenerUbicacion() {
    setCargando(true);
    setError(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permiso de ubicacion denegado. Habilitalo para poder usa la ubicacion.");
        return;
      }
      // obtener posicion
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setCoords(pos.coords);
    } catch (e) {
      setError("No se pudo obtener la ubicacion.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <View style={styles.centro}>
      <Text style={styles.titulo}>Ubicacion</Text>

      <Pressable
        style={[styles.boton, cargando && styles.botonDeshabilitado]}
        onPress={obtenerUbicacion}
        disabled={cargando}
      >
        <Text style={styles.textoBoton}>Obtener mi ubicacion</Text>
      </Pressable>

      {cargando && <ActivityIndicator style={styles.cargando} size="large" />}

      {error && <Text style={styles.error}>{error}</Text>}

      {coords && (
        <View style={styles.datos}>
          <Text style={styles.texto}>Latitud: {coords.latitude.toFixed(6)}</Text>
          <Text style={styles.texto}>Longitud: {coords.longitude.toFixed(6)}</Text>
          <Text style={styles.texto}>
            Precision reportada: {coords.accuracy.toFixed(1)} m
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  texto: {
    fontSize: 16,
    marginBottom: 8,
  },
  boton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  botonDeshabilitado: {
    opacity: 0.5,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cargando: {
    marginTop: 16,
  },
  error: {
    color: "#b91c1c",
    marginTop: 16,
    textAlign: "center",
  },
  datos: {
    marginTop: 24,
  },
});
