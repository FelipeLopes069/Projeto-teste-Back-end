// Importa o cliente MySQL com suporte a Promises
import mysql from 'mysql2/promise'

// Carrega variáveis de ambiente do .env
import dotenv from 'dotenv'
dotenv.config()

// Cria e exporta um pool de conexões reutilizáveis
export const db = mysql.createPool({
  host: process.env.DB_HOST,       // Ex: localhost
  port: process.env.DB_PORT,       // Ex: 3306
  user: process.env.DB_USER,       // Usuário do banco
  password: process.env.DB_PASS,   // Senha do banco
  database: process.env.DB_NAME    // Nome do banco
})