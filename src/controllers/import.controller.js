// Importação de dependências para leitura e descompressão
import fs from 'fs'
import zlib from 'zlib'
import csv from 'csv-parser'

// Conexão com o banco via Prisma
import { prisma } from '../lib/prisma.js'

// Controlador de importação de CSV
export const ImportController = {
  /**
   * [POST] /api/import
   * Importa usuários a partir de um arquivo CSV compactado (.csv.gz)
   * Cada usuário é vinculado ao admin logado via createdById
   */
  async importCsv(req, res) {
    const filePath = './users.csv.gz' // Caminho fixo do arquivo
    const createdById = req.user.id   // ID do admin autenticado
    const users = []                  // Array para armazenar os dados lidos

    try {
      // Cria uma stream de leitura com descompressão e parsing de CSV
      const stream = fs
        .createReadStream(filePath)
        .pipe(zlib.createGunzip())   // Descompacta o arquivo
        .pipe(csv())                 // Converte CSV para objetos linha a linha

      // Itera sobre cada linha do CSV
      for await (const row of stream) {
        const { id, name, email, createdAt } = row

        // Armazena os dados normalizados no array
        users.push({
          id,
          name,
          email,
          createdAt: new Date(createdAt),
          createdById  // Vincula ao admin atual
        })
      }

      const total = users.length
      let count = 0

      // Insere cada usuário no banco
      for (const user of users) {
        try {
          await prisma.user.create({ data: user })
          count++
        } catch (err) {
          // Se já existe (violação de unique), apenas avisa e segue
          console.warn(`⚠️ Erro ao importar ${user.email}: ${err.code}`)
        }
      }

      // Resposta final
      return res.status(201).json({
        message: `✅ Importação concluída.`,
        total,       // total lido do CSV
        inseridos: count // total inserido com sucesso
      })
    } catch (err) {
      // Erro inesperado: leitura, parsing, etc.
      return res.status(500).json({ error: err.message })
    }
  }
}