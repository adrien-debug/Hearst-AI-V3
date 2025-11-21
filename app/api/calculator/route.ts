import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Lire le fichier calculator.html depuis le dossier frontend
    const filePath = path.join(process.cwd(), 'frontend', 'calculator.html')
    const htmlContent = fs.readFileSync(filePath, 'utf-8')
    
    // Remplacer les chemins relatifs par des chemins publics Next.js
    const modifiedHtml = htmlContent
      .replace('href="/css/calculator.css"', 'href="/css/calculator.css"')
      .replace('src="/js/calculator.js"', 'src="/js/calculator.js"')
    
    return new NextResponse(modifiedHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  } catch (error) {
    console.error('Error serving calculator:', error)
    return NextResponse.json(
      { error: 'Calculator page not found' },
      { status: 404 }
    )
  }
}

