export type TipoEvento = 'ensaio' | 'actuacao' | 'festa';

export interface Evento {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  hora: string;
  local: string;
  tipo: TipoEvento;
}

export interface EventosResponse {
  ensaios: Evento[];
  saidas: Evento[];
}
