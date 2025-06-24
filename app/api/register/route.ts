import { type NextRequest, NextResponse } from "next/server"
import { createUser, createRegistration, createNotification, getUser } from "@/lib/db"
import { sendRegistrationConfirmationEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      firstName,
      lastName,
      phone,
      organization,
      designation,
      registrationType,
      ieeeNumber,
      dietaryRequirements,
      accommodationNeeded,
      accommodationType,
      specialRequirements,
    } = body

    // Check if user already exists
    const existingUser = await getUser(email)
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Calculate payment amount based on registration type
    const paymentAmounts = {
      student: 2500,
      professional: 5000,
      ieee_member: 2000,
    }
    const paymentAmount = paymentAmounts[registrationType as keyof typeof paymentAmounts] || 5000

    // Create user
    const user = await createUser({
      email,
      firstName,
      lastName,
      phone,
      organization,
      designation,
    })

    // Create registration
    const registration = await createRegistration({
      userId: user.id,
      registrationType,
      ieeeNumber,
      dietaryRequirements,
      accommodationNeeded: accommodationNeeded || false,
      accommodationType,
      specialRequirements,
      paymentAmount,
    })

    // Create welcome notification
    await createNotification({
      userId: user.id,
      title: "Welcome to AISYWLC 2025!",
      message: "Thank you for registering. Please complete your payment to confirm your registration.",
      type: "success",
    })

    // Send registration confirmation email
    try {
      await sendRegistrationConfirmationEmail({
        firstName,
        lastName,
        email,
        registrationId: registration.id,
        registrationType,
        paymentAmount,
      })
      console.log("Registration confirmation email sent successfully")
    } catch (emailError) {
      console.error("Failed to send registration confirmation email:", emailError)
      // Don't fail the registration if email fails
    }

    return NextResponse.json({
      success: true,
      user,
      registration,
      message: "Registration successful! Please check your email for confirmation details.",
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
