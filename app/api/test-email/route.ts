import { NextResponse } from "next/server"
import { sendRegistrationConfirmationEmail } from "@/lib/email"

export async function POST() {
  try {
    // Test email with sample data
    await sendRegistrationConfirmationEmail({
      firstName: "Test",
      lastName: "User",
      email: "test@example.com", // Replace with your email for testing
      registrationId: "REG-TEST-001",
      registrationType: "student",
      paymentAmount: 2500,
    })

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully!",
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
