require('dotenv').config({ path: '.env.local' })
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testCustomer() {
  try {
    console.log('🔍 Test du modèle Customer...')
    
    // Vérifier que le modèle existe
    if (!prisma.customer) {
      console.error('❌ Le modèle Customer n\'existe pas dans Prisma Client')
      console.log('Modèles disponibles:', Object.keys(prisma).filter(k => !k.startsWith('_') && !k.startsWith('$')))
      process.exit(1)
    }
    
    console.log('✅ Modèle Customer trouvé')
    
    // Tester une requête
    const customers = await prisma.customer.findMany()
    console.log(`✅ ${customers.length} client(s) trouvé(s)`)
    
    if (customers.length > 0) {
      console.log('\nClients:')
      customers.forEach((c, i) => {
        console.log(`${i + 1}. ${c.name} - ${c.erc20Address}`)
      })
    }
    
    console.log('\n✅ Test réussi - Prisma Client fonctionne correctement')
  } catch (error) {
    console.error('❌ Erreur:', error.message)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testCustomer()

