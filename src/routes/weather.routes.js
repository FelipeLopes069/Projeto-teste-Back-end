// Importa o Router do Express para criar rotas modulares
import { Router } from 'express'

// Importa o controller responsável por lidar com a lógica da rota de clima
import { WeatherController } from '../controllers/weather.controller.js'

// Cria uma instância do roteador
const router = Router()

// Rota GET que busca informações do clima de uma cidade
// Exemplo: GET /api/weather/SaoPaulo
router.get('/:city', WeatherController.getByCity)

// Exporta o roteador para ser usado no app principal
export default router