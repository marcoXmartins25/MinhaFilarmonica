import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { eventoService, presencaService, getStoredUser, User } from '../services/api';
import { Evento, TipoEvento } from '../types';

interface EventoCardProps {
  evento: Evento;
  onPress: () => void;
}

function EventoCard({ evento, onPress }: EventoCardProps) {
  const data = new Date(evento.data);
  const diaSemana = data.toLocaleDateString('pt-PT', { weekday: 'short' });
  const diaMes = data.getDate();
  const mes = data.toLocaleDateString('pt-PT', { month: 'short' });

  const tipoLabel = evento.tipo === 'ensaio' ? 'Ensaio' : evento.tipo === 'actuacao' ? 'Actuação' : 'Festa';
  const tipoCor = evento.tipo === 'ensaio' ? '#FF9500' : evento.tipo === 'actuacao' ? '#007AFF' : '#34C759';

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      <View style={[styles.cardTipo, { backgroundColor: tipoCor }]}>
        <Text style={styles.cardTipoText}>{tipoLabel}</Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardData}>
          <Text style={styles.diaSemana}>{diaSemana}</Text>
          <Text style={styles.diaMes}>{diaMes}</Text>
          <Text style={styles.mes}>{mes}</Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitulo}>{evento.titulo}</Text>
          <Text style={styles.cardHora}>🕗 {evento.hora}</Text>
          <Text style={styles.cardLocal}>📍 {evento.local}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const userData = await getStoredUser();
      setUser(userData);
      
      const data = await eventoService.getEventos();
      setEventos(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os eventos');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function onRefresh() {
    setRefreshing(true);
    loadData();
  }

  const ensaios = eventos.filter(e => e.tipo === 'ensaio');
  const actuacoes = eventos.filter(e => e.tipo === 'actuacao' || e.tipo === 'festa');

  const handleEventoPress = async (evento: Evento) => {
    router.push({ pathname: '/evento/[id]', params: { id: evento.id.toString() } });
  };

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#007AFF']}
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.titulo}>Agenda</Text>
        <Text style={styles.subtitulo}>Próximos Eventos</Text>
      </View>

      {ensaios.length > 0 && (
        <View style={styles.secao}>
          <Text style={[styles.secaoTitulo, { color: '#FF9500' }]}>Ensaios</Text>
          {ensaios.map(evento => (
            <EventoCard key={evento.id} evento={evento} onPress={() => handleEventoPress(evento)} />
          ))}
        </View>
      )}

      {actuacoes.length > 0 && (
        <View style={styles.secao}>
          <Text style={[styles.secaoTitulo, { color: '#007AFF' }]}>Actuações</Text>
          {actuacoes.map(evento => (
            <EventoCard key={evento.id} evento={evento} onPress={() => handleEventoPress(evento)} />
          ))}
        </View>
      )}

      {eventos.length === 0 && !loading && (
        <View style={styles.semEventos}>
          <Text style={styles.semEventosText}>Sem eventos programados</Text>
        </View>
      )}

      <View style={styles.rodape}>
        <Text style={styles.rodapeText}>
          {user?.role === 'musico' ? 'Desliza para baixo para atualizar' : 'Carrega no + para criar evento'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  secao: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  secaoTitulo: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardTipo: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  cardTipoText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 12,
  },
  cardData: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  diaSemana: {
    fontSize: 12,
    color: '#666',
    textTransform: 'capitalize',
  },
  diaMes: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  mes: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cardHora: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  cardLocal: {
    fontSize: 14,
    color: '#666',
  },
  semEventos: {
    padding: 40,
    alignItems: 'center',
  },
  semEventosText: {
    fontSize: 16,
    color: '#999',
  },
  rodape: {
    padding: 20,
    alignItems: 'center',
  },
  rodapeText: {
    fontSize: 12,
    color: '#999',
  },
});
