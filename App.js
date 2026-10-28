import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Camara from "./components/Camara";
import Ubicacion from "./components/Ubicacion";
import Brujula from "./components/Brujula";

const PANTALLAS = ["Camara", "Ubicacion", "Brujula"];

export default function App() {
  const [pantalla, setPantalla] = useState("Camara");

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        {PANTALLAS.map((nombre) => (
          <Pressable
            key={nombre}
            style={[styles.tab, pantalla === nombre && styles.tabActiva]}
            onPress={() => setPantalla(nombre)}
          >
            <Text style={[styles.textoTab, pantalla === nombre && styles.textoTabActiva]}>
              {nombre}
            </Text>
          </Pressable>
        ))}
      </View>

      {pantalla === "Camara" && <Camara />}
      {pantalla === "Ubicacion" && <Ubicacion />}
      {pantalla === "Brujula" && <Brujula />}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#e5e7eb",
  },
  tabActiva: {
    backgroundColor: "#2563eb",
  },
  textoTab: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textoTabActiva: {
    color: "#fff",
  },
});
