import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';

interface TimerProps {
  initialTime?: number;
}

export default function CronometroDescanso({ initialTime = 60 }: TimerProps) {
  const [tiempoRestante, setTiempoRestante] = useState(initialTime);
  const [corriendo, setCorriendo] = useState(false);
  const [tiempoObjetivo, setTiempoObjetivo] = useState(initialTime);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // Efecto para manejar el timer
  useEffect(() => {
    let intervalo: ReturnType<typeof setInterval> | null = null;
    
    if (corriendo && tiempoRestante > 0) {
      intervalo = setInterval(() => {
        setTiempoRestante(prev => {
          if (prev <= 1) {
            setCorriendo(false);
            notificarFinalizacion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalo !== null) clearInterval(intervalo);
    };
  }, [corriendo, tiempoRestante]);

  // Cleanup del sonido
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const notificarFinalizacion = async () => {
    try {
      // Vibrar al finalizar
      Vibration.vibrate([500, 500, 500]);
      
      // Intentar reproducir sonido (manejar si no existe el archivo)
      try {
        const { sound: soundObject } = await Audio.Sound.createAsync(
          // Si no tienes el archivo, puedes usar uno por defecto o omitirlo
          require('../../assets/sounds/timer-end.mp3')
        );
        setSound(soundObject);
        await soundObject.playAsync();
      } catch (soundError) {
        console.log('Sonido no disponible, usando solo vibración');
      }
    } catch (error) {
      console.log('Error en notificación:', error);
    }
  };

  const formatearTiempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const iniciarDescanso = (segundos: number) => {
    if (segundos <= 0) return;
    setTiempoObjetivo(segundos);
    setTiempoRestante(segundos);
    setCorriendo(true);
  };

  const pausarReanudar = () => {
    setCorriendo(!corriendo);
  };

  const resetear = () => {
    setCorriendo(false);
    setTiempoRestante(tiempoObjetivo);
  };

  const tiemposRapidos = [30, 60, 90, 120, 180];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cronómetro de descanso</Text>
      <Text style={styles.subtitle}>Controla tu tiempo entre series</Text>

      {/* Timer principal */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatearTiempo(tiempoRestante)}</Text>
        {tiempoRestante === 0 && !corriendo && tiempoObjetivo > 0 ? (
          <Text style={styles.completadoText}>Descanso completado</Text>
        ) : null}
      </View>

      {/* Controles */}
      <View style={styles.controlesContainer}>
        {!corriendo && tiempoRestante === 0 ? (
          <TouchableOpacity 
            style={styles.iniciarBtn}
            onPress={() => iniciarDescanso(tiempoObjetivo)}
          >
            <Text style={styles.iniciarText}>Iniciar Descanso</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.controlesRow}>
            <TouchableOpacity 
              style={styles.controlBtn}
              onPress={pausarReanudar}
            >
              <Text style={styles.controlText}>
                {corriendo ? 'Pausar' : 'Reanudar'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.controlBtn, styles.resetBtn]}
              onPress={resetear}
            >
              <Text style={styles.controlText}>Reiniciar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Tiempo objetivo */}
      <View style={styles.objetivoContainer}>
        <Text style={styles.objetivoTitle}>Ajustar tiempo</Text>
        <Text style={styles.tiempoObjetivo}>{formatearTiempo(tiempoObjetivo)}</Text>
        <Text style={styles.objetivoLabel}>Objetivo</Text>
      </View>

      {/* Tiempos rápidos */}
      <View style={styles.tiemposRapidosContainer}>
        <Text style={styles.tiemposRapidosTitle}>Tiempos rápidos</Text>
        <View style={styles.tiemposGrid}>
          {tiemposRapidos.map((tiempo) => (
            <TouchableOpacity
              key={tiempo}
              style={[
                styles.tiempoBtn,
                tiempoObjetivo === tiempo && styles.tiempoBtnSeleccionado
              ]}
              onPress={() => {
                setTiempoObjetivo(tiempo);
                if (!corriendo) {
                  setTiempoRestante(tiempo);
                }
              }}
            >
              <Text style={[
                styles.tiempoText,
                tiempoObjetivo === tiempo && styles.tiempoTextSeleccionado
              ]}>
                {tiempo}s
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Consejo */}
      <View style={styles.consejoContainer}>
        <Text style={styles.consejoText}>
          El descanso óptimo entre series es de 60-90 segundos para hipertrofia
        </Text>
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  completadoText: {
    fontSize: 18,
    color: '#34C759',
    fontWeight: '600',
    marginTop: 8,
  },
  controlesContainer: {
    marginBottom: 30,
  },
  iniciarBtn: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  iniciarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  controlesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  controlBtn: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  resetBtn: {
    backgroundColor: '#FF3B30',
  },
  controlText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  objetivoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  objetivoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  tiempoObjetivo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  objetivoLabel: {
    fontSize: 14,
    color: '#666',
  },
  tiemposRapidosContainer: {
    marginBottom: 20,
  },
  tiemposRapidosTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  tiemposGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tiempoBtn: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  tiempoBtnSeleccionado: {
    backgroundColor: '#007AFF',
  },
  tiempoText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  tiempoTextSeleccionado: {
    color: '#fff',
  },
  consejoContainer: {
    backgroundColor: '#e7f3ff',
    padding: 16,
    borderRadius: 12,
  },
  consejoText: {
    fontSize: 14,
    color: '#007AFF',
    textAlign: 'center',
    lineHeight: 20,
  },
});