
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'


async function verifyAuth(token: string | null) {
    if (!token) {
        return null;
    }

    const user = await prisma.user.findFirst({
        where: {
            AND: [
                { token },
                { isVerified: true }
            ]
        }
    });

    return user;
}

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get('authorization')
        const token = authHeader?.startsWith('Bearer ')
            ? authHeader.substring(7)
            : null;


        const user = await verifyAuth(token);
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized: Please login first' },
                { status: 401 }
            );
        }

        return NextResponse.json({
            completed: user.completed,
            message: 'Successfully fetched completed questions'
        });

    } catch (error) {
        console.error('Error in GET /api/v1/user/completed:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {

        const authHeader = req.headers.get('authorization')
        const token = authHeader?.startsWith('Bearer ')
            ? authHeader.substring(7)
            : null;

        const user = await verifyAuth(token);
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized: Please login first' },
                { status: 401 }
            );
        }


        const body = await req.json();
        const { questionId, solved } = body;


        if (typeof questionId !== 'number') {
            return NextResponse.json(
                { error: 'Invalid question ID' },
                { status: 400 }
            );
        }

        if (typeof solved !== 'boolean') {
            return NextResponse.json(
                { error: 'Invalid solved status' },
                { status: 400 }
            );
        }


        const updatedCompleted = solved
            ? [...new Set([...user.completed, questionId])] 
            : user.completed.filter(id => id !== questionId);


        await prisma.user.update({
            where: { id: user.id },
            data: { completed: updatedCompleted }
        });

        return NextResponse.json({
            completed: updatedCompleted,
            message: solved ? 'Question marked as completed' : 'Question marked as incomplete'
        });

    } catch (error) {
        console.error('Error in POST /api/v1/user/completed:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET_stats(req: Request) {
    try {
        const authHeader = req.headers.get('authorization')
        const token = authHeader?.startsWith('Bearer ')
            ? authHeader.substring(7)
            : null;

        const user = await verifyAuth(token);
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized: Please login first' },
                { status: 401 }
            );
        }

        const totalQuestions = await prisma.question.count();

        return NextResponse.json({
            total: totalQuestions,
            completed: user.completed.length,
            percentage: ((user.completed.length / totalQuestions) * 100).toFixed(1) + '%'
        });

    } catch (error) {
        console.error('Error in GET_stats /api/v1/user/completed:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
