// Importa o serviço que consulta a API externa de clima
import { WeatherService } from '../services/weather.service.js'

// Importa o cache em memória (NodeCache configurado)
import { cache } from '../utils/cache.js'

// Controlador responsável por lidar com requisições de clima
export const WeatherController = {
  // [GET] /api/weather/:city
  async getByCity(req, res) {
    try {
      const { city } = req.params
      const cityKey = city.toLowerCase() // Chave normalizada para uso no cache

      // 🔁 1. Verifica se já existe dado em cache para essa cidade
      const cachedData = cache.get(cityKey)
      if (cachedData) {
        console.log(`🔁 Cache HIT para ${cityKey}`)
        return res.json(cachedData) // Retorna direto do cache
      }

      // 🌐 2. Se não tiver cache, consulta a API externa
      console.log(`🌐 Cache MISS para ${cityKey}`)
      const data = await WeatherService.getByCity(city)

      // 💾 3. Armazena a resposta no cache para futuras chamadas
      cache.set(cityKey, data)

      // 4. Retorna os dados buscados da API
      res.json(data)
    } catch (err) {
      // Trata erro e responde com status 500
      res.status(500).json({
        error: 'Erro ao buscar clima',
        message: err.message,
      })
    }
  }
}