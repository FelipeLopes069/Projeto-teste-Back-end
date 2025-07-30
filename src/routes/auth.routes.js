// Importa o roteador do Express para criar rotas agrupadas
import { Router } from 'express'

// Importa o controlador responsável pela autenticação
import { AuthController } from '../controllers/auth.controller.js'

// Cria uma instância do roteador
const router = Router()

// Rota de registro de novo admin
// POST /api/auth/register
router.post('/register', AuthController.register)

// Rota de login para obter o token JWT
// POST /api/auth/login
router.post('/login', AuthController.login)

// Exporta o roteador para ser usado no app principal
export default router