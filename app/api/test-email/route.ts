import { NextResponse } from "next/server"
import { sendRegistrationConfirmationEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const testEmail = body.testEmail || "test@example.com"

    // Test email with sample data
    const result = await sendRegistrationConfirmationEmail({
      firstName: "Test",
      lastName: "User",
      email: testEmail,
      registrationId: "REG-TEST-001",
      registrationType: "student",
      paymentAmount: 2500,
    })

    return NextResponse.json({
      success: result.success,
      message: result.success ? `Test email sent successfully to ${testEmail}!` : "Email sending failed",
      result: result,
      testEmail: testEmail,
    })
  } catch (error) {
    console.error("Test email error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send test email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Email test endpoint - use POST to send test email",
    status: "ready",
    hasApiKey: !!process.env.RESEND_API_KEY,
    apiKeyPreview: process.env.RESEND_API_KEY ? `${process.env.RESEND_API_KEY.substring(0, 10)}...` : "Not set",
    instructions: {
      "1": "Add RESEND_API_KEY to environment variables",
      "2": "Send POST request with { testEmail: 'your@email.com' }",
      "3": "Check your email inbox (and spam folder)",
    },
  })
}
