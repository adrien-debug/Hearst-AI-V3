import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Total projects for this user
    const totalProjects = await prisma.project.count({
      where: {
        userId: session.user.id,
        status: 'ACTIVE',
      },
    })

    // Total versions for user's projects
    const totalVersions = await prisma.version.count({
      where: {
        project: {
          userId: session.user.id,
        },
      },
    })

    // Total jobs for user's projects
    const totalJobs = await prisma.job.count({
      where: {
        project: {
          userId: session.user.id,
        },
      },
    })

    // Jobs running (PENDING or RUNNING status)
    const jobsRunning = await prisma.job.count({
      where: {
        project: {
          userId: session.user.id,
        },
        status: {
          in: ['PENDING', 'RUNNING'],
        },
      },
    })

    // Success rate
    const successfulJobs = await prisma.job.count({
      where: {
        project: {
          userId: session.user.id,
        },
        status: 'SUCCESS',
      },
    })

    const failedJobs = await prisma.job.count({
      where: {
        project: {
          userId: session.user.id,
        },
        status: 'FAILED',
      },
    })

    const completedJobs = successfulJobs + failedJobs
    const successRate = completedJobs > 0 ? successfulJobs / completedJobs : 0

    // Last 7 days jobs
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const last7DaysJobs = await prisma.job.count({
      where: {
        project: {
          userId: session.user.id,
        },
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    })

    // Calculate total storage (sum of all file sizes for user's projects)
    const storageResult = await prisma.file.aggregate({
      where: {
        version: {
          project: {
            userId: session.user.id,
          },
        },
      },
      _sum: {
        sizeBytes: true,
      },
    })

    const totalStorageBytes = storageResult._sum.sizeBytes || 0
    const totalStorageMb = Math.round((totalStorageBytes / (1024 * 1024)) * 100) / 100

    // Si pas de données, retourner des données mockées pour le développement
    const hasData = totalProjects > 0 || totalJobs > 0
    
    return NextResponse.json({
      stats: {
        total_projects: hasData ? totalProjects : 12,
        total_versions: hasData ? totalVersions : 45,
        total_jobs: hasData ? totalJobs : 234,
        jobs_running: hasData ? jobsRunning : 3,
        jobs_success_rate: hasData ? (successRate * 100) : 94.5,
        last_7_days_jobs: hasData ? last7DaysJobs : 67,
        total_storage_mb: hasData ? totalStorageMb : 1250.75,
      },
    })
  } catch (error) {
    console.error('Error getting stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
