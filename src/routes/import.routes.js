// Importa o roteador do Express
import { Router } from 'express'

// Importa o controller responsável pela lógica de importação de CSV
import { ImportController } from '../controllers/import.controller.js'

// Importa middleware de autenticação para proteger a rota
import { authMiddleware } from '../middlewares/auth.middleware.js'

// Instancia o roteador
const router = Router()

// Rota para importação de usuários via CSV
// Protegida por authMiddleware (precisa estar logado)
// Endpoint: POST /api/import/users
router.post('/users', authMiddleware, ImportController.importCsv)

// Exporta o roteador para ser usado na aplicação principal
export default router