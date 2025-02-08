import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get('authorization')
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Unauthorized: No token provided' },
                { status: 401 }
            )
        }

        const token = authHeader.split(' ')[1]

        const user = await prisma.user.findFirst({
            where: { token }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized: Invalid token' },
                { status: 401 }
            )
        }

        const questions = await prisma.question.findMany({
            orderBy: {
                questionId: 'asc',
            },
            select: {
                id: true,
                questionId: true,
                name: true,
                difficulty: true,
                questionTags: true,
                companyTags: true,
                questionUrl: true,
                totalSubmissions: true,
                totalAccepted: true,
            }
        })

        return NextResponse.json({ questions })

    } catch (error) {
        console.error('Error fetching questions:', error)
        return NextResponse.json(
            { error: 'Failed to fetch questions' },
            { status: 500 }
        )
    }
}
