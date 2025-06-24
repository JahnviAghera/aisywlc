import { NextResponse } from "next/server"
import { sendRegistrationConfirmationEmail } from "@/lib/email"

export async function POST() {
  try {
    // Test email with sample data
    const result = await sendRegistrationConfirmationEmail({
      firstName: "Test",
      lastName: "User",
      email: "jahnviaghera@gmail.com", // Replace with your email for testing
      registrationId: "REG-TEST-001",
      registrationType: "student",
      paymentAmount: 2500,
    })

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully!",
      result: result,
    })
  } catch (error) {
    console.error("Test email error:", error)
    return NextResponse.json(
      {
        error: "Failed to send test email",
        details: error,
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
  })
}
