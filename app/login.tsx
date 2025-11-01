import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"usuario" | "entrenador" | "administrador" | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true); // 🔄 Cambia el tema manualmente

  const handleLogin = async () => {
    if (!email || !password || !role) {
      alert("Por favor completa todos los campos y selecciona un rol");
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem("userData");
      if (!storedUser) {
        alert("No hay usuarios registrados");
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
    }
  };

  // 🎨 Temas de color
  const lightTheme = {
    background: "#f5f7fa",
    textPrimary: "#1b263b",
    textSecondary: "#555",
    inputBackground: "#e0e6ed",
    placeholder: "#7a869a",
    buttonBackground: "#cfd8e3",
    accent: "#1e90ff",
    iconColor: "#1b263b",
  };

  const darkTheme = {
    background: "#0d1b2a",
    textPrimary: "#ffffff",
    textSecondary: "#a9bcd0",
    inputBackground: "#1b263b",
    placeholder: "#a9bcd0",
    buttonBackground: "#1b263b",
    accent: "#1e90ff",
    iconColor: "#ffffff",
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {/* 🔘 Switch de tema */}
      <View style={styles.themeToggle}>
        <Ionicons name={isDarkMode ? "moon" : "sunny"} size={22} color={theme.iconColor} />
        <Switch
          value={isDarkMode}
          onValueChange={() => setIsDarkMode(!isDarkMode)}
          thumbColor={isDarkMode ? "#1e90ff" : "#f5f7fa"}
          trackColor={{ false: "#d0d7de", true: "#1b263b" }}
        />
      </View>

      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/808/808464.png" }}
        style={styles.logo}
      />
      <Text style={[styles.title, { color: theme.textPrimary }]}>FitLife</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        Entrena. Come bien. Vive mejor.
      </Text>

      {/* Inputs */}
      <TextInput
        style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
        placeholder="Correo electrónico"
        placeholderTextColor={theme.placeholder}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
        placeholder="Contraseña"
        placeholderTextColor={theme.placeholder}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Selección de rol */}
      <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Selecciona tu rol</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            { backgroundColor: theme.buttonBackground },
            role === "usuario" && { backgroundColor: theme.accent },
          ]}
          onPress={() => setRole("usuario")}
        >
          <Ionicons name="person" size={24} color={theme.iconColor} />
          <Text style={[styles.roleText, { color: theme.textPrimary }]}>Usuario</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleButton,
            { backgroundColor: theme.buttonBackground },
            role === "entrenador" && { backgroundColor: theme.accent },
          ]}
          onPress={() => setRole("entrenador")}
        >
          <Ionicons name="barbell" size={24} color={theme.iconColor} />
          <Text style={[styles.roleText, { color: theme.textPrimary }]}>Entrenador</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleButton,
            { backgroundColor: theme.buttonBackground },
            role === "administrador" && { backgroundColor: theme.accent },
          ]}
          onPress={() => setRole("administrador")}
        >
          <Ionicons name="shield-checkmark" size={24} color={theme.iconColor} />
          <Text style={[styles.roleText, { color: theme.textPrimary }]}>Admin</Text>
        </TouchableOpacity>
      </View>

      {/* Botón de login */}
      <TouchableOpacity
        style={[styles.loginButton, { backgroundColor: theme.accent }]}
        onPress={handleLogin}
      >
        <Text style={[styles.loginText, { color: "#fff" }]}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* 👉 Botón que lleva al registro */}
      <TouchableOpacity onPress={() => router.push("../registro")}>
        <Text style={[styles.footer, { color: theme.textSecondary }]}>
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
  themeToggle: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: 20,
    gap: 10,
  },
  logo: { width: 90, height: 90, marginBottom: 20 },
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
    flex: 1,
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  roleText: { marginTop: 5, fontSize: 14 },
  loginButton: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  loginText: { fontWeight: "bold", fontSize: 16 },
  footer: { marginTop: 25, fontSize: 13 },
});