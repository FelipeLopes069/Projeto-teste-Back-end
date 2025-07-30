// Importa o PrismaClient, que é o cliente gerado automaticamente a partir do schema.prisma
import { PrismaClient } from '@prisma/client'

// Cria e exporta uma instância única do Prisma para ser reutilizada na aplicação
export const prisma = new PrismaClient()