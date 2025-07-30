// Importações principais
import express from 'express'         // Framework web para construir a API
import cors from 'cors'               // Middleware para permitir requisições de outras origens (CORS)
import dotenv from 'dotenv'           // Carrega variáveis de ambiente a partir do arquivo .env

// Importação das rotas da aplicação
import authRoutes from './routes/auth.routes.js'       // Rotas de autenticação (login/registro)
import userRoutes from './routes/user.routes.js'       // Rotas de gerenciamento de usuários
import weatherRoutes from './routes/weather.routes.js' // Rotas para dados climáticos
import importRoutes from './routes/import.routes.js'   // Rotas para importar dados (ex: CSV)

// Carrega as variáveis de ambiente do .env
dotenv.config()

// Cria a instância principal do Express
const app = express()

// Middleware global para logar todas as requisições recebidas
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.url} - Origin: ${req.headers.origin}`)
  next()
})

// Configuração personalizada do CORS
const corsOptions = {
  origin: (origin, callback) => {
    console.log(`[CORS] Origem da requisição: ${origin}`)
    // Permite chamadas locais durante o desenvolvimento
    if (!origin || origin.startsWith('http://localhost:')) {
      callback(null, true)
    } else {
      // Bloqueia outras origens e registra tentativa no console
      console.warn(`[CORS] ❌ Origem bloqueada: ${origin}`)
      callback(new Error('Não permitido pelo CORS'))
    }
  },
  credentials: true, // Permite envio de cookies/autenticação entre domínios
}

// Aplica o middleware de CORS com a configuração acima
app.use(cors(corsOptions))

// Middleware para tratar requisições com JSON no corpo
app.use(express.json())

// Rota de teste para verificar se a API está online
app.get('/', (req, res) => {
  res.send('🚀 API SkyDash online')
})

// Rotas da aplicação, separadas por responsabilidade
app.use('/api/auth', authRoutes)         // Autenticação (login, registro)
app.use('/api/users', userRoutes)        // CRUD de usuários (protegido por JWT)
app.use('/api/import', importRoutes)     // Importação de dados (ex: CSV)
app.use('/api/weather', weatherRoutes)   // Consulta de clima (com cache)

// Exporta o app já configurado para ser utilizado no server.js
export default app