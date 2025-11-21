import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.DEFAULT_USER_EMAIL || 'admin@hearst.ai'
  const name = process.env.DEFAULT_USER_NAME || 'Admin User'

  console.log('🔐 Création de l\'utilisateur par défaut...')
  console.log(`📧 Email: ${email}`)
  console.log(`👤 Nom: ${name}`)

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.log('✅ L\'utilisateur existe déjà dans la base de données')
      console.log(`   ID: ${existingUser.id}`)
      console.log(`   Email: ${existingUser.email}`)
      console.log(`   Nom: ${existingUser.name || 'Non défini'}`)
      console.log('\n💡 Vous pouvez vous connecter avec cet email et n\'importe quel mot de passe')
      console.log('   (la vérification du mot de passe n\'est pas encore implémentée)')
      return
    }

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    })

    console.log('✅ Utilisateur créé avec succès!')
    console.log(`   ID: ${user.id}`)
    console.log(`   Email: ${user.email}`)
    console.log(`   Nom: ${user.name}`)
    console.log('\n💡 Vous pouvez maintenant vous connecter avec:')
    console.log(`   Email: ${email}`)
    console.log('   Mot de passe: n\'importe quel mot de passe')
    console.log('   (la vérification du mot de passe n\'est pas encore implémentée)')
  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'utilisateur:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

