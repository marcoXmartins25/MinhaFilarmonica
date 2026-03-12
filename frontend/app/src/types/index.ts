import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'admin' | 'maestro' | 'musico';

export interface User {
  id: number;
  nome: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export type TipoEvento = 'ensaio' | 'actuacao' | 'festa';

export interface Evento {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  hora: string;
  local: string;
  tipo: TipoEvento;
  created_by: number;
  created_at: string;
  created_by_user?: User;
}

export type PresencaStatus = 'presente' | 'ausente' | 'justificado';

export interface Presenca {
  id: number;
  evento_id: number;
  user_id: number;
  status: PresencaStatus;
  created_at: string;
  evento?: Evento;
  user?: User;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  password: string;
  role: UserRole;
}

export const AUTH_STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
};

export const saveAuthData = async (token: string, user: User) => {
  await AsyncStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, token);
  await AsyncStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user));
};

export const clearAuthData = async () => {
  await AsyncStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
  await AsyncStorage.removeItem(AUTH_STORAGE_KEYS.USER);
};

export const getStoredUser = async (): Promise<User | null> => {
  const userStr = await AsyncStorage.getItem(AUTH_STORAGE_KEYS.USER);
  return userStr ? JSON.parse(userStr) : null;
};

export const getStoredToken = async (): Promise<string | null> => {
  return AsyncStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
};
