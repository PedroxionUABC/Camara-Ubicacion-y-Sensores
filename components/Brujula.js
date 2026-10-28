import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Magnetometer } from "expo-sensors";

export default function Brujula() {
  const [disponible, setDisponible] = useState(null);
  const [datos, setDatos] = useState({ x: 0, y: 0, z: 0 });
  const [angulo, setAngulo] = useState(0);

  useEffect(() => {
    let sub = null;

    async function iniciar() {
      const ok = await Magnetometer.isAvailableAsync();
      setDisponible(ok);
      if (!ok) return;
      Magnetometer.setUpdateInterval(250);
      sub = Magnetometer.addListener(({ x, y, z }) => {
        setDatos({ x, y, z });
        setAngulo(((Math.atan2(y, x) * 180) / Math.PI + 360) % 360);
      });
    }

    iniciar();

    return () => {
      if (sub) sub.remove();
    };
  }, []);

  if (disponible === false) {
    return (
      <View style={styles.centro}>
        <Text style={styles.titulo}>Brujula</Text>
        <Text style={styles.error}>Sensor no disponible</Text>
      </View>
    );
  }

  return (
    <View style={styles.centro}>
      <Text style={styles.titulo}>Brujula</Text>
      <Text style={styles.angulo}>{angulo.toFixed(0)} grados</Text>

      <View style={styles.datos}>
        <Text style={styles.texto}>X: {datos.x.toFixed(2)}</Text>
        <Text style={styles.texto}>Y: {datos.y.toFixed(2)}</Text>
        <Text style={styles.texto}>Z: {datos.z.toFixed(2)}</Text>
      </View>
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
  angulo: {
    fontSize: 48,
    fontWeight: "bold",
  },
  datos: {
    marginTop: 16,
  },
  error: {
    color: "#b91c1c",
    fontSize: 16,
  },
});
