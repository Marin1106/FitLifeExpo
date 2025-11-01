import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Perfil() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.nombre}>Carlos</Text>
        <Text style={styles.detalles}>28 años - 175 cm</Text>
        <TouchableOpacity style={styles.rolBtn}>
          <Text style={styles.rolText}>Cambiar rol (Demo)</Text>
        </TouchableOpacity>
      </View>

      {/* Objetivo */}
      <View style={styles.objetivoCard}>
        <Text style={styles.objetivoText}>Objetivo: Ganancia muscular</Text>
      </View>

      {/* Peso */}
      <View style={styles.pesoCard}>
        <Text style={styles.pesoTitle}>Peso actual</Text>
        <Text style={styles.pesoActual}>78 kg</Text>
        <View style={styles.pesoMetaContainer}>
          <Text style={styles.pesoMeta}>Meta: 85 kg</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>15</Text>
          <Text style={styles.statLabel}>Días activos</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>45</Text>
          <Text style={styles.statLabel}>Entrenamientos</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Semanas</Text>
        </View>
      </View>

      {/* Actividad reciente */}
      <View style={styles.actividadCard}>
        <Text style={styles.actividadTitle}>Actividad reciente</Text>
        <View style={styles.actividadItem}>
          <Text style={styles.actividadText}>Día 1: Piernas completado</Text>
          <Text style={styles.actividadHora}>Tue, 18:50</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detalles: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  rolBtn: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  rolText: {
    color: '#fff',
    fontWeight: '600',
  },
  objetivoCard: {
    backgroundColor: '#e7f3ff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  objetivoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  pesoCard: {
    backgroundColor: '#f8f9fa',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  pesoTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  pesoActual: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pesoMetaContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  pesoMeta: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  actividadCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  actividadTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  actividadItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  actividadText: {
    fontSize: 16,
  },
  actividadHora: {
    fontSize: 14,
    color: '#666',
  },
});