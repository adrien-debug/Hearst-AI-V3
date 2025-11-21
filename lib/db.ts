import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

let prismaClient: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prismaClient = createPrismaClient()
} else {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient()
  }
  prismaClient = globalForPrisma.prisma
}

export const prisma = prismaClient

// Vérification que le client est bien initialisé avec le modèle Customer
if (!prisma) {
  console.error('❌ Prisma Client n\'a pas pu être initialisé')
} else {
  const prismaAny = prisma as any
  if (prismaAny.customer) {
    console.log('✅ Prisma Client initialisé avec succès - Modèle Customer disponible')
  } else {
    console.warn('⚠️ Prisma Client initialisé mais modèle Customer non trouvé')
    console.warn('Modèles disponibles:', Object.keys(prisma).filter(key => !key.startsWith('_') && !key.startsWith('$')))
  }
}
