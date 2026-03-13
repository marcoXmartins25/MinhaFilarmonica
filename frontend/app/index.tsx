import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, Text, Platform } from 'react-native';

let SecureStore;
if (Platform.OS !== 'web') {
  SecureStore = require('expo-secure-store');
} else {
  SecureStore = {
    getItemAsync: async (key) => localStorage.getItem(key),
    setItemAsync: async (key, value) => localStorage.setItem(key, value),
    deleteItemAsync: async (key) => localStorage.removeItem(key),
  };
}

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      
      if (token) {
        router.replace('/(tabs)');
      } else {
        router.replace('/login');
      }
    } catch (err) {
      console.log('Auth check error:', err);
      router.replace('/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10, color: '#666' }}>A carregar...</Text>
      </View>
    );
  }

  return null;
}
