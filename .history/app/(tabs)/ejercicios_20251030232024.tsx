import { StyleSheet, Text, View } from "react-native";

export default function Ejercicios() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rutinas de Ejercicio</Text>
      <Text>Próximamente tus rutinas aquí 💪</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
