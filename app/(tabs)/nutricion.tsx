import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PlanNutricion() {
  const macros = [
    { nombre: 'Calorías', consumido: 690, total: 2000, porcentaje: 35 },
    { nombre: 'Proteínas', consumido: 40, total: 130, porcentaje: 31 },
    { nombre: 'Carbohidratos', consumido: 75, total: 210, porcentaje: 36 },
    { nombre: 'Grasas', consumido: 20, total: 65, porcentaje: 31 },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Plan de nutrición</Text>
      <Text style={styles.objetivo}>Objetivo: Ganancia muscular</Text>
      
      {/* Macros del día */}
      <View style={styles.macrosHeader}>
        <Text style={styles.macrosTitle}>Macros del día | (35%)</Text>
      </View>
      
      <View style={styles.macrosGrid}>
        <View style={styles.macroRow}>
          <Text style={styles.macroValue}>690</Text>
          <Text style={styles.macroValue}>40g</Text>
          <Text style={styles.macroValue}>75g</Text>
          <Text style={styles.macroValue}>20g</Text>
        </View>
        <View style={styles.macroRow}>
          <Text style={styles.macroLabel}>/ 2000</Text>
          <Text style={styles.macroLabel}>/ 130g</Text>
          <Text style={styles.macroLabel}>/ 210g</Text>
          <Text style={styles.macroLabel}>/ 65g</Text>
        </View>
        <View style={styles.macroRow}>
          <Text style={styles.macroType}>Calorías</Text>
          <Text style={styles.macroType}>Proteínas</Text>
          <Text style={styles.macroType}>Carbos</Text>
          <Text style={styles.macroType}>Grasas</Text>
        </View>
      </View>

      {/* Barras de progreso */}
      {macros.map((macro, index) => (
        <View key={index} style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.macroName}>{macro.nombre}</Text>
            <Text style={styles.macroStats}>{macro.consumido} / {macro.total}</Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${macro.porcentaje}%` }  // ✅ CORREGIDO
              ]} 
            />
          </View>
        </View>
      ))}

      {/* Comidas del día */}
      <View style={styles.comidasHeader}>
        <Text style={styles.comidasTitle}>Comidas del día</Text>
        <TouchableOpacity style={styles.agregarBtn}>
          <Text style={styles.agregarText}>+ Agregar</Text>
        </TouchableOpacity>
      </View>

      {/* Desayuno */}
      <View style={styles.comidaCard}>
        <View style={styles.comidaHeader}>
          <Text style={styles.comidaNombre}>Desayuno</Text>
          <Text style={styles.comidaCalorias}>450 kcal</Text>
        </View>
        <View style={styles.macrosComida}>
          <Text style={styles.macroComida}>25g Prot</Text>
          <Text style={styles.macroComida}>55g Carb</Text>
          <Text style={styles.macroComida}>12g Gras</Text>
        </View>
      </View>
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
  objetivo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  macrosHeader: {
    marginBottom: 16,
  },
  macrosTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  macrosGrid: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  macroLabel: {
    fontSize: 14,
    color: '#666',
  },
  macroType: {
    fontSize: 12,
    color: '#999',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  macroName: {
    fontSize: 16,
    fontWeight: '500',
  },
  macroStats: {
    fontSize: 14,
    color: '#666',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  comidasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  comidasTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  agregarBtn: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  agregarText: {
    color: '#fff',
    fontWeight: '600',
  },
  comidaCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  comidaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  comidaNombre: {
    fontSize: 16,
    fontWeight: '600',
  },
  comidaCalorias: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  macrosComida: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  macroComida: {
    fontSize: 14,
    color: '#666',
  },
});
