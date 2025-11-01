import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // ✅ Importamos el hook de navegación de expo-router
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter(); // ✅ Usamos el router de expo-router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"usuario" | "entrenador" | "administrador" | null>(null);

  const handleLogin = () => {
    if (!email || !password || !role) {
      alert("Por favor completa todos los campos y selecciona un rol");
      return;
    }

    // Aquí podrías agregar lógica de autenticación real
    console.log("Iniciando sesión...");
    router.replace("/(tabs)/ejercicios"); // 👈 Primera pantalla después del login
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/808/808464.png" }}
        style={styles.logo}
      />
      <Text style={styles.title}>FitLife</Text>
      <Text style={styles.subtitle}>Entrena. Come bien. Vive mejor.</Text>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#a9bcd0"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#a9bcd0"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Selección de rol */}
      <Text style={styles.sectionTitle}>Selecciona tu rol</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleButton, role === "usuario" && styles.activeRole]}
          onPress={() => setRole("usuario")}
        >
          <Ionicons name="person" size={24} color="#fff" />
          <Text style={styles.roleText}>Usuario</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleButton, role === "entrenador" && styles.activeRole]}
          onPress={() => setRole("entrenador")}
        >
          <Ionicons name="barbell" size={24} color="#fff" />
          <Text style={styles.roleText}>Entrenador</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleButton, role === "administrador" && styles.activeRole]}
          onPress={() => setRole("administrador")}
        >
          <Ionicons name="shield-checkmark" size={24} color="#fff" />
          <Text style={styles.roleText}>Admin</Text>
        </TouchableOpacity>
      </View>

      {/* Botón de login */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>¿No tienes cuenta? Regístrate gratis</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1b2a",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#a9bcd0",
    fontSize: 16,
    marginBottom: 30,
  },
  input: {
    width: "100%",
    backgroundColor: "#1b263b",
    borderRadius: 10,
    padding: 14,
    color: "#fff",
    marginBottom: 15,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 15,
    alignSelf: "flex-start",
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 25,
  },
  roleButton: {
    backgroundColor: "#1b263b",
    flex: 1,
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  activeRole: {
    backgroundColor: "#1e90ff",
  },
  roleText: {
    color: "#fff",
    marginTop: 5,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#1e90ff",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    color: "#a9bcd0",
    marginTop: 25,
    fontSize: 13,
  },
});
