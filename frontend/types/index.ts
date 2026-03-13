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
