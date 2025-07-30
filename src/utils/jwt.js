// Importa a biblioteca jsonwebtoken para geração e verificação de tokens JWT
import jwt from 'jsonwebtoken'

// Chave secreta usada para assinar/verificar tokens (vinda do arquivo .env)
const secret = process.env.JWT_SECRET

// Função utilitária para gerar um token JWT
// payload: dados que serão codificados no token (ex: id, email, role, etc.)
export function generateToken(payload) {
  return jwt.sign(payload, secret, {
    expiresIn: '7d', // Token válido por 7 dias
  })
}

// Função utilitária para verificar e decodificar um token JWT
// Retorna o conteúdo original (payload) se o token for válido
export function verifyToken(token) {
  return jwt.verify(token, secret)
}