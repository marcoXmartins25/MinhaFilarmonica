import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import Dashboard from '@/components/Dashboard';
import { getEventos } from '@/services/eventos';
import { Evento } from '@/types';

export default function Index() {
  const [ensaios, setEnsaios] = useState<Evento[]>([]);
  const [saidas, setSaidas] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    setLoading(true);
    getEventos()
      .then(data => {
        setEnsaios(data.ensaios);
        setSaidas(data.saidas);
        setLoading(false);
        setRefreshing(false);
      })
      .catch(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }

  function onRefresh() {
    setRefreshing(true);
    loadData();
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>A carregar eventos...</Text>
      </View>
    );
  }

  return (
    <Dashboard 
      ensaios={ensaios} 
      saidas={saidas} 
      loading={loading}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});
