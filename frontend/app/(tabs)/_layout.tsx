import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { getStoredUser, User } from '../../types';
import { getStoredToken } from '../../services/api';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function TabLayout() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await getStoredToken();
      const userData = await getStoredUser();
      
      if (!token || !userData) {
        router.replace('/login');
        return;
      }
      
      setUser(userData);
    } catch (error) {
      router.replace('/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const isAdmin = user?.role === 'admin';
  const isMaestro = user?.role === 'maestro';
  const canCreateEventos = isAdmin || isMaestro;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Eventos',
          tabBarLabel: 'Eventos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
          headerTitle: `Minha Filarmónica - ${user?.nome || ''}`,
        }}
      />
      
      {canCreateEventos && (
        <Tabs.Screen
          name="criar"
          options={{
            title: 'Criar Evento',
            tabBarLabel: 'Criar',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={size} color={color} />
            ),
          }}
        />
      )}

      {isAdmin && (
        <Tabs.Screen
          name="utilizadores"
          options={{
            title: 'Utilizadores',
            tabBarLabel: 'Utilizadores',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people" size={size} color={color} />
            ),
          }}
        />
      )}

      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          headerTitle: 'O Meu Perfil',
        }}
      />
    </Tabs>
  );
}
