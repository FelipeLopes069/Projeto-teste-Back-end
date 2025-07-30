// Importa função que verifica e decodifica o token JWT
import { verifyToken } from '../utils/jwt.js'

// Middleware para proteger rotas privadas
export function authMiddleware(req, res, next) {
  // Extrai o cabeçalho Authorization
  const authHeader = req.headers.authorization

  // Verifica se o token foi enviado corretamente
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não enviado' })
  }

  // Extrai apenas o token da string "Bearer <token>"
  const token = authHeader.split(' ')[1]

  try {
    // Verifica e decodifica o token
    const decoded = verifyToken(token)

    // Anexa os dados do admin autenticado à requisição
    req.user = decoded

    // Libera a requisição para continuar
    next()
  } catch (err) {
    // Token inválido ou expirado
    res.status(401).json({ error: 'Token inválido ou expirado' })
  }
}