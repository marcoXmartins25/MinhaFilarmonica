// Configuração da API
// Para emulador/simulador: use localhost
// Para dispositivo físico: use o IP da máquina (ex: 192.168.1.100)
const API_BASE_URL = 'http://localhost:5078';

export interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

/**
 * Busca as previsões do tempo da API
 * @returns {Promise<WeatherForecast[]>} Array de previsões do tempo
 */
export function getWeatherForecast() {
  return fetch(`${API_BASE_URL}/weatherforecast`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data as WeatherForecast[])
    .catch(error => {
      console.error('Erro ao buscar dados:', error);
      throw error;
    });
}

/**
 * Verifica se a API está disponível
 * @returns {Promise<boolean>} True se a API está online
 */
export function checkApiHealth() {
  return fetch(`${API_BASE_URL}/weatherforecast`, {
    method: 'HEAD',
  })
    .then(response => response.ok)
    .catch(() => false);
}
