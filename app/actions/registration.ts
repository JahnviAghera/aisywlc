"use server"

import { createUser, createRegistration, createNotification, getUser } from "@/lib/db"

export async function submitRegistration(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const phone = formData.get("phone") as string
    const organization = formData.get("organization") as string
    const designation = formData.get("designation") as string
    const registrationType = formData.get("registrationType") as string
    const ieeeNumber = formData.get("ieeeNumber") as string
    const dietaryRequirements = formData.get("dietaryRequirements") as string
    const accommodationNeeded = formData.get("accommodationNeeded") === "on"
    const accommodationType = formData.get("accommodationType") as string
    const specialRequirements = formData.get("specialRequirements") as string

    // Check if user already exists
    const existingUser = await getUser(email)
    if (existingUser) {
      return {
        error: "User with this email already exists",
      }
    }

    // Calculate payment amount
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
      accommodationNeeded,
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

    return {
      success: true,
      registrationId: registration.id,
      paymentAmount,
    }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      error: "Registration failed. Please try again.",
    }
  }
}
