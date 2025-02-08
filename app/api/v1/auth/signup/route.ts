import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'
import * as z from 'zod'
import crypto from 'crypto'
import { sendVerificationEmail } from '@/lib/email'

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain uppercase, lowercase, number and special character'
    ),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = signupSchema.parse(body)

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    const hashedPassword = await hash(password, 10)
    const verifyToken = crypto.randomBytes(32).toString('hex')
    const tokenExpiry = new Date(Date.now() + 3600000)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        provider: 'email',
        verifyToken,
        tokenExpiry,
        completed: [],
      },
      select: {
        id: true,
        email: true,
        completed: true,
      }
    })

    const emailSent = await sendVerificationEmail(email, verifyToken)

    if (!emailSent) {
      await prisma.user.delete({ where: { id: user.id } })
      return NextResponse.json(
        { error: 'Failed to send verification email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        message: 'Registration successful. Please check your email to verify your account.',
        user
      },
      { status: 201 }
    )

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues },
        { status: 400 }
      )
    }
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
