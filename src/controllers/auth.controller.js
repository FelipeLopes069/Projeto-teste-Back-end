// Controller responsável pela autenticação: registro e login
import { AuthService } from '../services/auth.service.js'
import { z } from 'zod' // Lib para validação de dados de entrada

export const AuthController = {
  /**
   * [POST] /api/auth/register
   * Registra um novo admin (usuário autenticável)
   */
  async register(req, res) {
    try {
      console.log("[REGISTER] 🔍 Recebido:", req.body)

      // Validação dos dados usando Zod
      const schema = z.object({
        name: z.string().min(2),               // Nome mínimo de 2 caracteres
        email: z.string().email(),             // E-mail válido
        password: z.string().min(6)            // Senha com no mínimo 6 caracteres
      })

      const data = schema.parse(req.body)
      console.log("[REGISTER] ✅ Dados validados:", data)

      // Chama o serviço de autenticação
      const result = await AuthService.register(data)
      console.log("[REGISTER] ✅ Registro concluído:", result)

      // Retorna dados do novo admin + JWT gerado
      res.status(201).json(result)
    } catch (error) {
      console.error("[REGISTER] ❌ Erro:", error)
      res.status(400).json({ error: error.message })
    }
  },

  /**
   * [POST] /api/auth/login
   * Autentica um admin com email/senha e retorna o token
   */
  async login(req, res) {
    try {
      console.log("[LOGIN] 🔍 Recebido:", req.body)

      // Validação com Zod
      const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
      })

      const data = schema.parse(req.body)
      console.log("[LOGIN] ✅ Dados validados:", data)

      // Chama o serviço de login
      const result = await AuthService.login(data)
      console.log("[LOGIN] ✅ Login bem-sucedido:", result)

      // Retorna dados do admin logado + token
      res.status(200).json(result)
    } catch (error) {
      console.error("[LOGIN] ❌ Erro:", error)
      res.status(401).json({ error: error.message })
    }
  }
}