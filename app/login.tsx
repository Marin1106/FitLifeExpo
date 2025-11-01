import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        Alert.alert("Error", "No hay usuarios registrados");
        return;
      }

      const user = JSON.parse(userData);
      if (user.email === email && user.password === password) {
        Alert.alert("Bienvenido", `Hola ${user.name}`);
        router.replace("/(tabs)/ejercicios");
      } else {
        Alert.alert("Error", "Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/808/808464.png" }} style={styles.logo} />
      <Text style={styles.title}>FitLife</Text>
      <Text style={styles.subtitle}>Entrena. Come bien. Vive mejor.</Text>

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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* 🔗 Enlace al registro */}
      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.footer}>¿No tienes cuenta? Regístrate gratis</Text>
      </TouchableOpacity>
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
  logo: { width: 90, height: 90, marginBottom: 20 },
  title: { color: "#fff", fontSize: 28, fontWeight: "bold" },
  subtitle: { color: "#a9bcd0", fontSize: 16, marginBottom: 30 },
  input: {
    width: "100%",
    backgroundColor: "#1b263b",
    borderRadius: 10,
    padding: 14,
    color: "#fff",
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: "#1e90ff",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  loginText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  footer: { color: "#a9bcd0", marginTop: 25, fontSize: 13 },
});
