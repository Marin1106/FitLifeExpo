import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function Recordatorios() {
  const recordatorios = [
    {
      titulo: 'Hidratación',
      descripcion: 'Toma un vaso de agua',
      horario: 'Cada 2 horas',
      rango: '7:00 - 21:00',
      activo: true,
    },
    {
      titulo: 'Entrenamiento',
      descripcion: 'Hora de entrenar',
      horario: '17:00',
      dias: 'Lun, Mie, Vie',
      activo: true,
    },
    {
      titulo: 'Comida pre-entreno',
      descripcion: 'Snack antes de entrenar',
      horario: '16:00',
      dias: '30min antes de entrenar',
      activo: true,
    },
    {
      titulo: 'Hora de dormir',
      descripcion: 'Prepárate para descansar',
      horario: '22:00',
      dias: 'Todos los días',
      activo: true,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Recordatorios</Text>
      <Text style={styles.subtitle}>Mantén tus hábitos saludables</Text>
      
      <View style={styles.statsCard}>
        <Text style={styles.statsNumber}>4</Text>
        <Text style={styles.statsLabel}>recordatorios activos</Text>
        <Text style={styles.statsDesc}>Te ayudamos a mantener tu rutina</Text>
      </View>

      <TouchableOpacity style={styles.nuevoRecordatorioBtn}>
        <Text style={styles.nuevoRecordatorioText}>+ Nuevo recordatorio</Text>
      </TouchableOpacity>

      {recordatorios.map((recordatorio, index) => (
        <View key={index} style={styles.recordatorioCard}>
          <View style={styles.recordatorioHeader}>
            <Text style={styles.recordatorioTitulo}>{recordatorio.titulo}</Text>
            <Switch
              value={recordatorio.activo}
              onValueChange={() => {}}
            />
          </View>
          <Text style={styles.recordatorioDesc}>{recordatorio.descripcion}</Text>
          <View style={styles.recordatorioHorario}>
            <Text style={styles.horarioText}>{recordatorio.horario}</Text>
            <Text style={styles.diasText}>{recordatorio.dias || recordatorio.rango}</Text>
          </View>
        </View>
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
  statsCard: {
    backgroundColor: '#e7f3ff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  statsNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statsLabel: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 4,
  },
  statsDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  nuevoRecordatorioBtn: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  nuevoRecordatorioText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  recordatorioCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  recordatorioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recordatorioTitulo: {
    fontSize: 18,
    fontWeight: '600',
  },
  recordatorioDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  recordatorioHorario: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horarioText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
  },
  diasText: {
    fontSize: 14,
    color: '#666',
  },
});