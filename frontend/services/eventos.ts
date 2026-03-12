import { Evento, EventosResponse } from '@/types';

const API_BASE_URL = 'http://localhost:5078';

function getMockEventos(): EventosResponse {
  const hoje = new Date();
  
  const ensaios: Evento[] = [
    {
      id: 1,
      titulo: 'Ensaio Semanal',
      descricao: 'Ensaio geral para preparação do concerto',
      data: new Date(hoje.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      hora: '21:00',
      local: 'Sede da Filarmónica',
      tipo: 'ensaio',
    },
    {
      id: 2,
      titulo: 'Ensaio Extra',
      descricao: 'Ensaio específico para novas peças',
      data: new Date(hoje.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      hora: '20:00',
      local: 'Sede da Filarmónica',
      tipo: 'ensaio',
    },
  ];

  const saidas: Evento[] = [
    {
      id: 3,
      titulo: 'Concerto de Natal',
      descricao: 'Actuação na Igreja Matriz',
      data: new Date(hoje.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      hora: '21:00',
      local: 'Igreja Matriz',
      tipo: 'actuacao',
    },
    {
      id: 4,
      titulo: 'Festa Popular',
      descricao: 'Animação na festa anual da vila',
      data: new Date(hoje.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      hora: '22:00',
      local: 'Praça Central',
      tipo: 'festa',
    },
  ];

  return { ensaios, saidas };
}

export async function getEventos(): Promise<EventosResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/eventos`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('API não disponível, usando dados mockados');
  }
  
  return getMockEventos();
}

export async function getProximosEnsaios(): Promise<Evento[]> {
  const eventos = await getEventos();
  return eventos.ensaios;
}

export async function getProximasSaidas(): Promise<Evento[]> {
  const eventos = await getEventos();
  return eventos.saidas;
}
