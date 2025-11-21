import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  try {
    // Vérifier que DATABASE_URL est défini
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL n\'est pas défini dans les variables d\'environnement')
      console.error('⚠️ Veuillez configurer DATABASE_URL dans Vercel Dashboard → Settings → Environment Variables')
      throw new Error('DATABASE_URL is not defined')
    }

    // Vérifier le format de DATABASE_URL
    const dbUrl = process.env.DATABASE_URL
    if (dbUrl.includes('xxx') || dbUrl.includes('placeholder') || dbUrl.includes('db.xxx')) {
      console.error('❌ DATABASE_URL contient un placeholder invalide')
      console.error('⚠️ Veuillez remplacer le placeholder par la vraie URL Supabase dans Vercel Dashboard')
      throw new Error('DATABASE_URL contains placeholder')
    }

    const client = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })

    // Test de connexion en production (asynchrone pour ne pas bloquer)
    if (process.env.NODE_ENV === 'production') {
      client.$connect().catch((error) => {
        console.error('❌ Erreur de connexion Prisma à la base de données:')
        console.error('   Message:', error.message)
        console.error('   Code:', error.code)
        console.error('   DATABASE_URL:', process.env.DATABASE_URL ? 'défini' : 'NON DÉFINI')
        console.error('   ⚠️ Vérifiez que DATABASE_URL est correct dans Vercel Dashboard')
      })
    }

    return client
  } catch (error: any) {
    console.error('❌ Erreur lors de la création du client Prisma:', error.message)
    throw error
  }
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
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Prisma Client initialisé avec succès - Modèle Customer disponible')
    }
  } else {
    console.warn('⚠️ Prisma Client initialisé mais modèle Customer non trouvé')
    console.warn('   Modèles disponibles:', Object.keys(prisma).filter(key => !key.startsWith('_') && !key.startsWith('$')))
    console.warn('   ⚠️ Exécutez: npx prisma generate')
  }
}
