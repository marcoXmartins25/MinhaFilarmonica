import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Evento } from '@/types';

interface EventoCardProps {
  evento: Evento;
}

function EventoCard({ evento }: EventoCardProps) {
  const data = new Date(evento.data);
  const diaSemana = data.toLocaleDateString('pt-PT', { weekday: 'short' });
  const diaMes = data.getDate();
  const mes = data.toLocaleDateString('pt-PT', { month: 'short' });

  const tipoLabel = evento.tipo === 'ensaio' ? 'Ensaio' : evento.tipo === 'actuacao' ? 'Actuação' : 'Festa';
  const tipoCor = evento.tipo === 'ensaio' ? '#FF9500' : evento.tipo === 'actuacao' ? '#007AFF' : '#34C759';

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
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

interface SecaoProps {
  titulo: string;
  eventos: Evento[];
  corTitulo: string;
}

function Secao({ titulo, eventos, corTitulo }: SecaoProps) {
  return (
    <View style={styles.secao}>
      <Text style={[styles.secaoTitulo, { color: corTitulo }]}>{titulo}</Text>
      {eventos.length === 0 ? (
        <Text style={styles.semEventos}>Sem eventos programados</Text>
      ) : (
        eventos.map(evento => (
          <EventoCard key={evento.id} evento={evento} />
        ))
      )}
    </View>
  );
}

interface DashboardProps {
  ensaios: Evento[];
  saidas: Evento[];
  loading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
}

export default function Dashboard({ ensaios, saidas, loading, refreshing, onRefresh }: DashboardProps) {
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
        <Text style={styles.titulo}>Minha Filarmónica 🎺</Text>
        <Text style={styles.subtitulo}>Agenda dos Próximos Dias</Text>
      </View>

      <Secao 
        titulo="Próximos Ensaios" 
        eventos={ensaios} 
        corTitulo="#FF9500" 
      />

      <Secao 
        titulo="Próximas Saídas" 
        eventos={saidas} 
        corTitulo="#007AFF" 
      />

      <View style={styles.rodape}>
        <Text style={styles.rodapeText}>
          Dados atualizados automaticamente
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
  semEventos: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
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
  rodape: {
    padding: 20,
    alignItems: 'center',
  },
  rodapeText: {
    fontSize: 12,
    color: '#999',
  },
});
