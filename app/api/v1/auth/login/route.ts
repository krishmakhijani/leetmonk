import { prisma } from '@/lib/prisma'
import { compare } from 'bcrypt'
import { NextResponse } from 'next/server'
import * as z from 'zod'
import crypto from 'crypto'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = loginSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        completed: true,
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const token = crypto.randomUUID()

    await prisma.user.update({
      where: { id: user.id },
      data: { token }
    })

    const userResponse = {
      id: user.id,
      email: user.email,
      completed: user.completed
    }

    return NextResponse.json({
      message: 'Login successful',
      user: userResponse,
      token
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}
