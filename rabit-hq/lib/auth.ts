import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare, hash } from 'bcryptjs'
import { prisma } from './db'

// Demo accounts for testing (will be overridden by DB if available)
const DEMO_ACCOUNTS = [
  {
    id: '1',
    email: 'founder@rabit.test',
    name: 'Founder Demo',
    passwordHash: '$2a$10$Xxxx', // placeholder
    role: 'FOUNDER',
  },
  {
    id: '2',
    email: 'finance@rabit.test',
    name: 'Finance Demo',
    passwordHash: '$2a$10$Xxxx', // placeholder
    role: 'FINANCE',
  },
  {
    id: '3',
    email: 'investor@rabit.test',
    name: 'Investor Demo',
    passwordHash: '$2a$10$Xxxx', // placeholder
    role: 'INVESTOR',
  },
]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required')
        }

        try {
          // Try to get user from database first
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (!user || !user.password) {
            throw new Error('Invalid email or password')
          }

          const passwordMatch = await compare(credentials.password, user.password)
          if (!passwordMatch) {
            throw new Error('Invalid email or password')
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (dbError: any) {
          // If database is unavailable, use demo mode
          if (dbError.message?.includes('ECONNREFUSED') || dbError.message?.includes('database')) {
            console.log('[AUTH] Database unavailable, using demo mode')
            
            // Demo mode: accept all credentials with password "password123"
            if (credentials.password === 'password123') {
              const demoAccount = DEMO_ACCOUNTS.find((acc) => acc.email === credentials.email)
              if (demoAccount) {
                return {
                  id: demoAccount.id,
                  email: demoAccount.email,
                  name: demoAccount.name,
                  role: demoAccount.role as any,
                }
              }
            }
            throw new Error('Invalid email or password')
          }
          throw new Error('Authentication error')
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).role = token.role
        ;(session.user as any).id = token.id
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 24 * 60 * 60,
  },
}

export async function hashPassword(password: string): Promise<string> {
  const { hash } = await import('bcryptjs')
  return hash(password, 10)
}
