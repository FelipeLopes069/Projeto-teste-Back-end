// Importa o axios para realizar chamadas HTTP
import axios from 'axios'
// Carrega variáveis de ambiente do arquivo .env
import dotenv from 'dotenv'

dotenv.config()

// Chave da WeatherAPI, vinda do .env (ou fallback para um valor padrão)
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || '015d0d6c88bc4685bb325001252907'

// Serviço responsável por buscar dados de clima
export const WeatherService = {
  /**
   * Busca dados climáticos da cidade informada usando a WeatherAPI
   * @param {string} city - Nome da cidade (ex: "São Paulo")
   * @returns {Object} - Objeto formatado com dados do clima atual e previsão
   */
  async getByCity(city) {
    // Endpoint da API de previsão do tempo
    const url = `http://api.weatherapi.com/v1/forecast.json`

    // Requisição GET com parâmetros necessários
    const response = await axios.get(url, {
      params: {
        key: WEATHER_API_KEY, // Chave da API
        q: city,              // Cidade buscada
        days: 1,              // Apenas 1 dia de previsão
        aqi: 'no',            // Sem qualidade do ar
        alerts: 'yes'         // Ativar alertas climáticos
      }
    })

    // Extrai os dados da resposta
    const data = response.data

    // Retorna somente os campos úteis para o frontend
    return {
      cidade: data.location.name,
      estado: data.location.region,
      pais: data.location.country,
      temperatura: data.current.temp_c,
      condicao: data.current.condition.text,
      umidade: data.current.humidity,
      icone: data.current.condition.icon,
      hora: data.location.localtime,
      // Previsão horária formatada
      previsaoHoras: data.forecast.forecastday[0].hour.map((h) => ({
        hora: h.time,
        temp_c: h.temp_c
      })),
      // Lista de alertas (ou vazia, se não houver)
      alertas: data.alerts?.alert || []
    }
  }
}