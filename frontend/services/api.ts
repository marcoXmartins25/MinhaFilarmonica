import { Platform } from 'react-native';

let SecureStore;
if (Platform.OS !== 'web') {
  SecureStore = require('expo-secure-store');
} else {
  SecureStore = {
    getItemAsync: async (key) => {
      return localStorage.getItem(key);
    },
    setItemAsync: async (key, value) => {
      localStorage.setItem(key, value);
    },
    deleteItemAsync: async (key) => {
      localStorage.removeItem(key);
    },
  };
}

const API_BASE_URL = 'http://192.168.0.197:8000/api';

const getHeaders = async () => {
  const token = await SecureStore.getItemAsync('token');
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

export const authService = {
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error('Erro do servidor: ' + text.substring(0, 100));
      }
      
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Erro ao fazer login');
      }
      return data;
    } catch (error) {
      throw error;
    }
  },

  async register(nome, email, password, role = 'musico') {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, password, role }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao registar');
    return data;
  },

  async me() {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: await getHeaders(),
    });
    return response.json();
  },

  async logout() {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: await getHeaders(),
    });
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('user');
    return response.json();
  },

  async refresh() {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: await getHeaders(),
    });
    if (response.ok) {
      const data = await response.json();
      await SecureStore.setItemAsync('token', data.access_token);
    }
    return response.json();
  },
};

export const userService = {
  async getUsers() {
    const response = await fetch(`${API_BASE_URL}/users/all`, {
      headers: await getHeaders(),
    });
    return response.json();
  },

  async createUser(data) {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async updateUser(id, data) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: await getHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async deleteUser(id) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: await getHeaders(),
    });
    return response.json();
  },
};

export const eventoService = {
  async getEventos() {
    const response = await fetch(`${API_BASE_URL}/eventos`, {
      headers: await getHeaders(),
    });
    return response.json();
  },

  async getEvento(id) {
    const response = await fetch(`${API_BASE_URL}/eventos/${id}`, {
      headers: await getHeaders(),
    });
    return response.json();
  },

  async createEvento(data) {
    const response = await fetch(`${API_BASE_URL}/eventos`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async updateEvento(id, data) {
    const response = await fetch(`${API_BASE_URL}/eventos/${id}`, {
      method: 'PUT',
      headers: await getHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async deleteEvento(id) {
    const response = await fetch(`${API_BASE_URL}/eventos/${id}`, {
      method: 'DELETE',
      headers: await getHeaders(),
    });
    return response.json();
  },
};

export const presencaService = {
  async getPresencas() {
    const response = await fetch(`${API_BASE_URL}/presencas`, {
      headers: await getHeaders(),
    });
    return response.json();
  },

  async getPresencasByEvento(eventoId) {
    const response = await fetch(`${API_BASE_URL}/eventos/${eventoId}/presencas`, {
      headers: await getHeaders(),
    });
    return response.json();
  },

  async marcarPresenca(eventoId, status) {
    const response = await fetch(`${API_BASE_URL}/eventos/${eventoId}/presenca`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify({ status }),
    });
    return response.json();
  },

  async updatePresenca(id, status) {
    const response = await fetch(`${API_BASE_URL}/presencas/${id}`, {
      method: 'PUT',
      headers: await getHeaders(),
      body: JSON.stringify({ status }),
    });
    return response.json();
  },
};

export const saveAuthData = async (token: string, user: any) => {
  await SecureStore.setItemAsync('token', token);
  await SecureStore.setItemAsync('user', JSON.stringify(user));
};

export const clearAuthData = async () => {
  await SecureStore.deleteItemAsync('token');
  await SecureStore.deleteItemAsync('user');
};

export const getStoredUser = async (): Promise<any> => {
  const userStr = await SecureStore.getItemAsync('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const getStoredToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync('token');
};

export default API_BASE_URL;
