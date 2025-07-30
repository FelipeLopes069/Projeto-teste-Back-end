import NodeCache from 'node-cache'

// Cria uma instância de cache com TTL de 10 minutos
const cache = new NodeCache({ stdTTL: 600 })

export { cache } // 👈 exportação nomeada correta