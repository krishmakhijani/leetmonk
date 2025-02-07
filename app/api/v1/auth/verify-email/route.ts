import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const token = searchParams.get('token')

        if (!token) {
            return NextResponse.json(
                { error: 'Invalid verification link' },
                { status: 400 }
            )
        }

        const user = await prisma.user.findFirst({
            where: {
                verifyToken: token,
                tokenExpiry: {
                    gt: new Date()
                }
            }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid or expired verification link' },
                { status: 400 }
            )
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verifyToken: null,
                tokenExpiry: null
            }
        })

        return NextResponse.json({
            message: 'Email verified successfully! You can now log in.'
        })

    } catch (error) {
        console.error('Verification error:', error)
        return NextResponse.json(
            { error: 'Verification failed' },
            { status: 500 }
        )
    }
}
