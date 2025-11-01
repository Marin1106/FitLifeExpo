import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RutinasEjercicio() {
  const rutinas = [
    { dia: 'Día 1: Piernas', ejercicios: '5 ejercicios', tiempo: '45 min' },
    { dia: 'Día 2: Pecho y tríceps', ejercicios: '5 ejercicios', tiempo: '50 min' },
    { dia: 'Día 3: Espalda y bíceps', ejercicios: '5 ejercicios', tiempo: '50 min' },
    { dia: 'Día 4: Piernas', ejercicios: '5 ejercicios', tiempo: '40 min' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rutinas de ejercicio</Text>
      <Text style={styles.subtitle}>Elige el entrenamiento de hoy</Text>
      
      {rutinas.map((rutina, index) => (
        <TouchableOpacity key={index} style={styles.rutinaCard}>
          <Text style={styles.diaText}>{rutina.dia}</Text>
          <View style={styles.detallesContainer}>
            <Text style={styles.detalleText}>{rutina.ejercicios}</Text>
            <Text style={styles.detalleText}>{rutina.tiempo}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  rutinaCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  diaText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  detallesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detalleText: {
    fontSize: 14,
    color: '#666',
  },
});
