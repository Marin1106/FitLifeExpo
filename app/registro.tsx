import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"usuario" | "entrenador" | "administrador" | null>(null);
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password || !name || !role) {
      Alert.alert("Error", "Por favor completa todos los campos y selecciona un rol");
      return;
    }

    try {
      // Guardar los datos localmente en AsyncStorage, incluyendo el rol
      const user = { email, password, name, role };
      await AsyncStorage.setItem("userData", JSON.stringify(user));

      Alert.alert("Registro exitoso", "Ya puedes iniciar sesión", [
        { text: "OK", onPress: () => router.replace("/login") },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo registrar el usuario");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        placeholderTextColor="#a9bcd0"
        value={name}
        onChangeText={setName}
      />
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
          <Ionicons name="person" size={22} color="#fff" />
          <Text style={styles.roleText}>Usuario</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleButton, role === "entrenador" && styles.activeRole]}
          onPress={() => setRole("entrenador")}
        >
          <Ionicons name="barbell" size={22} color="#fff" />
          <Text style={styles.roleText}>Entrenador</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleButton, role === "administrador" && styles.activeRole]}
          onPress={() => setRole("administrador")}
        >
          <Ionicons name="shield-checkmark" size={22} color="#fff" />
          <Text style={styles.roleText}>Admin</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarme</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#0d1b2a",
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#1b263b",
    color: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  activeRole: { backgroundColor: "#1e90ff" },
  roleText: { color: "#fff", marginTop: 5, fontSize: 14 },
  button: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    color: "#a9bcd0",
    textAlign: "center",
    marginTop: 20,
  },
});
