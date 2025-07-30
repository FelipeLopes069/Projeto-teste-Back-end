// Importa o roteador do Express
import { Router } from 'express'

// Importa o controller responsável pela lógica dos usuários
import { UserController } from '../controllers/user.controller.js'

// Middleware de autenticação para proteger as rotas
import { authMiddleware } from '../middlewares/auth.middleware.js'

// Instancia o roteador
const router = Router()

// Criação de novo usuário vinculado ao admin logado
// POST /api/users
router.post('/', authMiddleware, UserController.create)

// Listagem de todos os usuários do admin logado (com filtros opcionais)
// GET /api/users
router.get('/', authMiddleware, UserController.list)

// Busca um usuário específico pelo ID
// GET /api/users/:id
router.get('/:id', authMiddleware, UserController.getById)

// Atualiza nome e/ou e-mail do usuário
// PUT /api/users/:id
router.put('/:id', authMiddleware, UserController.update)

// Remove o usuário pelo ID
// DELETE /api/users/:id
router.delete('/:id', authMiddleware, UserController.remove)

// Exporta o roteador para ser utilizado no app principal
export default router