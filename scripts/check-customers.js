require('dotenv').config({ path: '.env.local' })
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkCustomers() {
  try {
    console.log('🔍 Vérification des clients...')
    
    const customers = await prisma.customer.findMany()
    
    console.log(`✅ ${customers.length} client(s) trouvé(s):`)
    customers.forEach((customer, index) => {
      console.log(`\n${index + 1}. ${customer.name}`)
      console.log(`   - ID: ${customer.id}`)
      console.log(`   - Adresse: ${customer.erc20Address}`)
      console.log(`   - Tag: ${customer.tag}`)
      console.log(`   - Chaînes: ${customer.chains}`)
      console.log(`   - Protocoles: ${customer.protocols}`)
    })
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
    if (error.message.includes('customer')) {
      console.error('⚠️  Le modèle Customer n\'existe pas dans Prisma Client')
      console.error('💡 Solution: Exécutez "npx prisma generate"')
    }
  } finally {
    await prisma.$disconnect()
  }
}

checkCustomers()

