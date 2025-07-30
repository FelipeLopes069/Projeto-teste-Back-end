// Importa o gerador de UUID para criar IDs únicos
import { v4 as uuidv4 } from 'uuid'

// Biblioteca para criptografia de senhas
import bcrypt from 'bcrypt'

// Instância do Prisma para acesso ao banco de dados
import { prisma } from '../lib/prisma.js'

// Função utilitária para gerar JWT
import { generateToken } from '../utils/jwt.js'

// Serviço de autenticação com métodos de registro e login
export const AuthService = {
  // Método de registro de novo admin
  async register({ name, email, password }) {
    // Verifica se já existe um admin com esse e-mail
    const existing = await prisma.admin.findUnique({ where: { email } })
    if (existing) throw new Error('Admin já existe com esse e-mail')

    // Criptografa a senha com salt automático (10 rounds)
    const hashed = await bcrypt.hash(password, 10)

    // Gera um UUID único para o novo admin
    const id = uuidv4()

    // Cria o admin no banco de dados
    await prisma.admin.create({
      data: {
        id,
        name,
        email,
        password: hashed, // Salva senha criptografada
      }
    })

    // Gera um token de autenticação para login automático
    const token = generateToken({ id, email })

    // Retorna os dados do usuário e o token
    return { id, name, email, token }
  },

  // Método de login de admin
  async login({ email, password }) {
    // Busca o admin pelo e-mail
    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin) throw new Error('Credenciais inválidas')

    // Compara a senha fornecida com o hash salvo
    const match = await bcrypt.compare(password, admin.password)
    if (!match) throw new Error('Credenciais inválidas')

    // Gera um novo token para o admin autenticado
    const token = generateToken({ id: admin.id, email: admin.email })

    // Retorna os dados essenciais e o token
    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      token
    }
  }
}