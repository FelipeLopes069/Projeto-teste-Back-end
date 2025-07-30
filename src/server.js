// Importa o app configurado (rotas, middlewares, etc.)
import app from './app.js'

// Define a porta do servidor. Usa variável de ambiente ou 3333 como padrão
const PORT = process.env.PORT || 3333

// Inicia o servidor na porta definida
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
})