require('dotenv').config({ path: '.env.local' })
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function setupCustomer() {
  try {
    console.log('🔄 Suppression des clients existants...')
    
    // Supprimer tous les clients existants
    const deleted = await prisma.customer.deleteMany({})
    console.log(`✅ ${deleted.count} client(s) supprimé(s)`)

    console.log('🔄 Ajout du nouveau client...')
    
    // Créer le nouveau client
    const customer = await prisma.customer.create({
      data: {
        name: 'Adrien Nejkovic',
        erc20Address: '0xb3d525155609ea680125acdd9ee61c2a74610eaa',
        tag: 'ETH',
        chains: JSON.stringify(['eth']),
        protocols: JSON.stringify(['morpho', 'compound']),
      }
    })

    console.log('✅ Client créé avec succès:')
    console.log('   - ID:', customer.id)
    console.log('   - Nom:', customer.name)
    console.log('   - Adresse:', customer.erc20Address)
    console.log('   - Tag:', customer.tag)
    console.log('   - Chaînes:', customer.chains)
    console.log('   - Protocoles:', customer.protocols)
    
  } catch (error) {
    console.error('❌ Erreur:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

setupCustomer()
  .then(() => {
    console.log('✅ Opération terminée avec succès')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Erreur lors de l\'opération:', error)
    process.exit(1)
  })

