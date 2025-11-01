import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RegistroScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"usuario" | "entrenador" | "administrador" | null>(null);

  const handleRegister = async () => {
    if (!email || !password || !role) {
      alert("Completa todos los campos");
      return;
    }

    const userData = { email, password, role };
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
    alert("Registro exitoso ✅");
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>

      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#a9bcd0"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#a9bcd0"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={() => setRole("usuario")} style={[styles.roleButton, role === "usuario" && styles.activeRole]}>
        <Text style={styles.roleText}>Usuario</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRole("entrenador")} style={[styles.roleButton, role === "entrenador" && styles.activeRole]}>
        <Text style={styles.roleText}>Entrenador</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRole("administrador")} style={[styles.roleButton, role === "administrador" && styles.activeRole]}>
        <Text style={styles.roleText}>Administrador</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d1b2a", justifyContent: "center", padding: 20 },
  title: { color: "#fff", fontSize: 26, fontWeight: "bold", marginBottom: 30, textAlign: "center" },
  input: { backgroundColor: "#1b263b", color: "#fff", padding: 12, borderRadius: 8, marginBottom: 12 },
  button: { backgroundColor: "#1e90ff", padding: 14, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  roleButton: {
    backgroundColor: "#1b263b",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginVertical: 4,
  },
  activeRole: { backgroundColor: "#1e90ff" },
  roleText: { color: "#fff" },
  linkText: { color: "#1e90ff", textAlign: "center", marginTop: 15 },
});
