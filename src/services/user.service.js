// Importa o gerador de UUID para criar IDs únicos
import { v4 as uuidv4 } from 'uuid'

// Instância do Prisma para operações no banco de dados
import { prisma } from '../lib/prisma.js'

// Serviço responsável por lidar com a lógica de usuários
export const UserService = {
  /**
   * Cria um novo usuário vinculado ao admin logado
   * @param {Object} params - Dados do novo usuário
   * @param {string} params.name - Nome do usuário
   * @param {string} params.email - Email do usuário
   * @param {string} params.createdById - ID do admin que está criando
   * @returns {Object} - Dados básicos do usuário criado
   */
  async create({ name, email, createdById }) {
    // Cria novo usuário com ID único e vinculado ao admin
    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        name,
        email,
        createdById
      }
    })

    // Retorna somente os campos essenciais
    return {
      id: user.id,
      name: user.name,
      email: user.email
    }
  },

  /**
   * Lista todos os usuários criados por um admin específico,
   * com filtros opcionais por nome ou email
   * @param {string} createdById - ID do admin
   * @param {Object} filters - Filtros opcionais (name, email)
   */
  async list(createdById, filters = {}) {
    return prisma.user.findMany({
      where: {
        createdById,
        // Aplica filtro de nome, se informado
        ...(filters.name && {
          name: { contains: filters.name, mode: 'insensitive' }
        }),
        // Aplica filtro de email, se informado
        ...(filters.email && {
          email: { contains: filters.email, mode: 'insensitive' }
        })
      }
    })
  },

  /**
   * Busca um único usuário pelo seu ID
   * @param {string} id - ID do usuário
   * @returns {Object|null} - Usuário encontrado ou null
   */
  async findById(id) {
    return prisma.user.findUnique({
      where: { id }
    })
  },

  /**
   * Atualiza os dados do usuário (nome e/ou email)
   * @param {string} id - ID do usuário a ser atualizado
   * @param {Object} data - Campos a serem atualizados
   * @returns {Object} - Dados atualizados do usuário
   */
  async update(id, data) {
    const user = await prisma.user.update({
      where: { id },
      data
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email
    }
  },

  /**
   * Remove um usuário do banco de dados
   * @param {string} id - ID do usuário a ser removido
   * @returns {Object} - Mensagem de confirmação
   */
  async remove(id) {
    await prisma.user.delete({
      where: { id }
    })

    return { message: 'Usuário removido com sucesso' }
  }
}