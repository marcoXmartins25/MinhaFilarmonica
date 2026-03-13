import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { eventoService } from '@/services/api';
import { TipoEvento } from '@/types';

const TIPOS: { value: TipoEvento; label: string }[] = [
  { value: 'ensaio', label: 'Ensaio' },
  { value: 'actuacao', label: 'Actuação' },
  { value: 'festa', label: 'Festa' },
];

export default function CriarEvento() {
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [local, setLocal] = useState('');
  const [tipo, setTipo] = useState<TipoEvento>('ensaio');
  const [loading, setLoading] = useState(false);

  const handleCriar = async () => {
    if (!titulo || !data || !hora || !local) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    try {
      await eventoService.createEvento({
        titulo,
        descricao,
        data,
        hora,
        local,
        tipo,
      });
      Alert.alert('Sucesso', 'Evento criado com sucesso!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      Alert.alert('Erro', error.message || 'Não foi possível criar o evento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Título *</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ex: Ensaio Semanal"
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Detalhes do evento..."
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Tipo *</Text>
        <View style={styles.tipoContainer}>
          {TIPOS.map((t) => (
            <TouchableOpacity
              key={t.value}
              style={[styles.tipoOption, tipo === t.value && styles.tipoSelected]}
              onPress={() => setTipo(t.value)}
            >
              <Text style={[styles.tipoText, tipo === t.value && styles.tipoTextSelected]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Data *</Text>
        <TextInput
          style={styles.input}
          value={data}
          onChangeText={setData}
          placeholder="YYYY-MM-DD"
        />

        <Text style={styles.label}>Hora *</Text>
        <TextInput
          style={styles.input}
          value={hora}
          onChangeText={setHora}
          placeholder="HH:MM"
        />

        <Text style={styles.label}>Local *</Text>
        <TextInput
          style={styles.input}
          value={local}
          onChangeText={setLocal}
          placeholder="Ex: Sede da Filarmónica"
        />

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleCriar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Criar Evento</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  tipoContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  tipoOption: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tipoSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f7ff',
  },
  tipoText: {
    fontSize: 14,
    color: '#333',
  },
  tipoTextSelected: {
    color: '#007AFF',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
