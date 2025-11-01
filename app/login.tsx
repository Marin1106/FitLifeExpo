import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Rol = "usuario" | "entrenador" | "administrador" | null;

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Rol>(null);
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(true); // 👈 modo oscuro por defecto

  // 🎨 Temas
  const theme = {
    background: isDark ? "#0d1b2a" : "#f5f5f5",
    text: isDark ? "#ffffff" : "#000000",
    inputBg: isDark ? "#1b263b" : "#e0e0e0",
    placeholder: isDark ? "#a9bcd0" : "#666666",
    button: isDark ? "#1e90ff" : "#0077cc",
    secondaryText: isDark ? "#a9bcd0" : "#333333",
  };

  const handleLogin = async () => {
    if (!email || !password || !role) {
      alert("Por favor completa todos los campos y selecciona un rol");
      return;
    }

    setLoading(true);
    try {
      const storedUser = await AsyncStorage.getItem("userData");
      if (!storedUser) {
        alert("No hay usuarios registrados");
        setLoading(false);
        return;
      }

      const { email: savedEmail, password: savedPassword, role: savedRole } = JSON.parse(storedUser);

      if (email === savedEmail && password === savedPassword && role === savedRole) {
        alert("Inicio de sesión exitoso 🎉");
        router.replace("/(tabs)/ejercicios");
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {/* 🔘 Switch para cambiar tema */}
      <View style={styles.switchContainer}>
        <Ionicons name={isDark ? "moon" : "sunny"} size={22} color={theme.text} />
        <Switch
          value={isDark}
          onValueChange={setIsDark}
          thumbColor={isDark ? "#fff" : "#000"}
          trackColor={{ false: "#ccc", true: "#1e90ff" }}
        />
      </View>

      {/* Imagen cambia con el tema */}
      <Image
        source={{
          uri: isDark
            ? "https://cdn-icons-png.flaticon.com/512/808/808464.png"
            : "https://cdn-icons-png.flaticon.com/512/616/616408.png",
        }}
        style={styles.logo}
      />

      <Text style={[styles.title, { color: theme.text }]}>FitLife</Text>
      <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
        Entrena. Come bien. Vive mejor.
      </Text>

      {/* Inputs */}
      <TextInput
        style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text }]}
        placeholder="Correo electrónico"
        placeholderTextColor={theme.placeholder}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text }]}
        placeholder="Contraseña"
        placeholderTextColor={theme.placeholder}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Roles */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Selecciona tu rol</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleButton, role === "usuario" && { backgroundColor: theme.button }]}
          onPress={() => setRole("usuario")}
        >
          <Ionicons name="person" size={24} color="#fff" />
          <Text style={styles.roleText}>Usuario</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleButton, role === "entrenador" && { backgroundColor: theme.button }]}
          onPress={() => setRole("entrenador")}
        >
          <Ionicons name="barbell" size={24} color="#fff" />
          <Text style={styles.roleText}>Entrenador</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleButton, role === "administrador" && { backgroundColor: theme.button }]}
          onPress={() => setRole("administrador")}
        >
          <Ionicons name="shield-checkmark" size={24} color="#fff" />
          <Text style={styles.roleText}>Admin</Text>
        </TouchableOpacity>
      </View>

      {/* Botón de login */}
      <TouchableOpacity style={[styles.loginButton, { backgroundColor: theme.button }]} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="log-in" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.loginText}>Iniciar Sesión</Text>
          </>
        )}
      </TouchableOpacity>

      {/* 👉 Botón que lleva al registro */}
      <TouchableOpacity onPress={() => router.push("../registro")}>
        <Text style={[styles.footer, { color: theme.secondaryText }]}>
          ¿No tienes cuenta? Regístrate gratis
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  switchContainer: {
    position: "absolute",
    top: 40,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  logo: { width: 90, height: 90, marginBottom: 20, marginTop: 30 },
  title: { fontSize: 28, fontWeight: "bold" },
  subtitle: { fontSize: 16, marginBottom: 30 },
  input: {
    width: "100%",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
  },
  sectionTitle: {
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
  roleText: { color: "#fff", marginTop: 5, fontSize: 14 },
  loginButton: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  footer: { marginTop: 25, fontSize: 13 },
});
