// Importa o serviço responsável pela lógica de usuários
import { UserService } from '../services/user.service.js'

// Validador de schema de dados
import { z } from 'zod'

// Controlador de usuários: expõe endpoints para manipular usuários criados pelo admin logado
export const UserController = {
  /**
   * [POST] /api/users
   * Cria um novo usuário vinculado ao admin autenticado
   */
  async create(req, res) {
    try {
      // Define e valida o corpo da requisição
      const schema = z.object({
        name: z.string().min(2),
        email: z.string().email()
      })
      const data = schema.parse(req.body)

      // Obtém ID do admin logado (injetado pelo middleware de autenticação)
      const createdById = req.user.id

      // Cria o novo usuário
      const created = await UserService.create({ ...data, createdById })

      // Busca o usuário completo (com createdAt, etc.)
      const userCompleto = await UserService.findById(created.id)

      // Retorna com status 201 (Created)
      res.status(201).json(userCompleto)
    } catch (err) {
      // Erro de validação ou outro erro de regra
      res.status(400).json({ error: err.message })
    }
  },

  /**
   * [GET] /api/users
   * Lista todos os usuários vinculados ao admin logado, com filtros opcionais
   */
  async list(req, res) {
    try {
      const filters = {
        name: req.query.name || '',
        email: req.query.email || ''
      }

      // Lista com possíveis filtros por nome ou e-mail
      const users = await UserService.list(req.user.id, filters)
      res.json(users)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  /**
   * [GET] /api/users/:id
   * Retorna dados completos de um usuário por ID
   */
  async getById(req, res) {
    try {
      const user = await UserService.findById(req.params.id)

      if (!user)
        return res.status(404).json({ error: 'Usuário não encontrado' })

      res.json(user)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  /**
   * [PUT] /api/users/:id
   * Atualiza nome e/ou e-mail de um usuário existente
   */
  async update(req, res) {
    try {
      const schema = z.object({
        name: z.string().min(2).optional(),
        email: z.string().email().optional()
      })

      const data = schema.parse(req.body)
      const id = req.params.id

      const updated = await UserService.update(id, data)

      if (!updated)
        return res.status(404).json({ error: 'Usuário não encontrado' })

      // Busca atualizado para retornar os dados finais
      const usuarioAtualizado = await UserService.findById(id)
      res.json(usuarioAtualizado)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  },

  /**
   * [DELETE] /api/users/:id
   * Remove um usuário do sistema
   */
  async remove(req, res) {
    try {
      const id = req.params.id
      const removed = await UserService.remove(id)

      if (!removed)
        return res.status(404).json({ error: 'Usuário não encontrado' })

      res.json({ message: 'Usuário removido com sucesso' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}