import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { id: "1", text: "👋 ¡Hola! Soy tu asistente FitLife. Puedo ayudarte con dudas sobre ejercicios o nutrición.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages((prev) => [...prev, { id: Date.now().toString(), text: botResponse, sender: "bot" }]);
    }, 600);
  };

  const getBotResponse = (message: string): string => {
    const lower = message.toLowerCase();

    // 🏋️ Ejercicios
    if (lower.includes("ejercicio") || lower.includes("entrenamiento")) {
      return "💪 Te recomiendo hacer una rutina de fuerza 3 a 4 veces por semana. No olvides calentar y estirar.";
    }

    if (lower.includes("cardio")) {
      return "🏃 El cardio ideal es de 30-45 minutos, 3 veces por semana. Puedes alternar entre trotar, bicicleta o caminar rápido.";
    }

    if (lower.includes("pierna") || lower.includes("piernas")) {
      return "🦵 Prueba sentadillas, zancadas, peso muerto y elevaciones de talón. ¡Excelente para fortalecer las piernas!";
    }

    // 🍎 Nutrición
    if (lower.includes("alimentación") || lower.includes("comida")) {
      return "🥗 Mantén una dieta equilibrada con proteínas, carbohidratos y grasas saludables. Evita los ultraprocesados.";
    }

    if (lower.includes("proteína") || lower.includes("batido")) {
      return "🥤 La proteína ayuda a la recuperación muscular. Ideal después del entrenamiento o como snack saludable.";
    }

    if (lower.includes("agua")) {
      return "💧 Bebe al menos 2 litros de agua al día para mantenerte hidratado y mejorar tu rendimiento.";
    }

    // Default
    return "🤔 No entiendo bien la pregunta, pero puedo ayudarte con temas de ejercicios o nutrición.";
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.sender === "user" ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 15 }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu duda..."
          placeholderTextColor="#aaa"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1b2a",
  },
  message: {
    marginVertical: 5,
    padding: 12,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#1e90ff",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#1b263b",
  },
  text: {
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#1b263b",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: "#fff",
    backgroundColor: "#0d1b2a",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 50,
  },
});
