import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>🏋️‍♂️ Bienvenido a FitLife</Text>
        <Text style={styles.subtitle}>Tu app para mejorar cuerpo y mente</Text>
      </View>

      {/* Imagen principal */}
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?auto=format&fit=crop&w=800&q=80",
        }}
        style={styles.banner}
      />

      {/* Botón principal */}
      <TouchableOpacity style={styles.mainButton}>
        <Text style={styles.mainButtonText}>Comenzar Entrenamiento</Text>
      </TouchableOpacity>

      {/* Secciones */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔥 Rutinas Populares</Text>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Ionicons name="barbell" size={28} color="#fff" />
            <Text style={styles.cardText}>Fuerza</Text>
          </View>
          <View style={styles.card}>
            <Ionicons name="fitness" size={28} color="#fff" />
            <Text style={styles.cardText}>Cardio</Text>
          </View>
          <View style={styles.card}>
            <Ionicons name="body" size={28} color="#fff" />
            <Text style={styles.cardText}>Full Body</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Consejos del Día</Text>
        <Text style={styles.tip}>
          ✅ Mantente hidratado antes, durante y después del entrenamiento.
        </Text>
        <Text style={styles.tip}>
          💤 Dormir bien es clave para la recuperación muscular.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📈 Tu Progreso</Text>
        <View style={styles.progressContainer}>
          <Ionicons name="trophy" size={28} color="#FFD700" />
          <Text style={styles.progressText}>Has completado 5 entrenamientos esta semana</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1b2a",
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#a9bcd0",
    fontSize: 16,
    marginTop: 5,
  },
  banner: {
    width: "100%",
    height: 180,
    borderRadius: 15,
    marginBottom: 20,
  },
  mainButton: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 25,
  },
  mainButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#1b263b",
    width: "30%",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  cardText: {
    color: "#fff",
    marginTop: 8,
    fontWeight: "500",
  },
  tip: {
    color: "#a9bcd0",
    fontSize: 15,
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1b263b",
    padding: 15,
    borderRadius: 10,
  },
  progressText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 15,
  },
});
