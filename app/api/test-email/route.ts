import { NextResponse } from "next/server"
import { sendRegistrationConfirmationEmail } from "@/lib/email"

export async function POST() {
  try {
    // Test email with sample data
    const result = await sendRegistrationConfirmationEmail({
      firstName: "Test",
      lastName: "User",
      email: "test@example.com", // You can change this to your email for testing
      registrationId: "REG-TEST-001",
      registrationType: "student",
      paymentAmount: 2500,
    })

    return NextResponse.json({
      success: result.success,
      message: result.success ? "Test email sent successfully!" : "Email sending failed",
      result: result,
    })
  } catch (error) {
    console.error("Test email error:", error)
    return NextResponse.json(
      {
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
  })
}
