import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    // Get the correct password from environment variable
    const correctPassword = process.env.APP_PASSWORD || 'AIGTM2025'
    
    if (password === correctPassword) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: 'Invalid password' })
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return NextResponse.json({ success: false, error: 'Authentication failed' }, { status: 500 })
  }
} 