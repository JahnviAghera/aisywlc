"use server"

import { createRegistration, createNotification, getUser } from "@/lib/db"
import { createClient } from "@/lib/supabase";

import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

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

    const supabase = createClient();

    // Check if user already exists in Supabase
    const { data: existingUser, error: existingUserError } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .single()

    if (existingUserError) {
      console.error("Supabase user check error:", existingUserError)
      return {
        error: "Registration failed. Please try again.",
      }
    }

    if (existingUser) {
      return {
        error: "User with this email already exists",
      }
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      }),
    })

    const data = await res.json()

    if (data.error) {
      return {
        error: data.error,
      }
    }

    if (data.success) {
      redirect(`/register/success?registrationId=${data.registrationId}`)
    }

    return {
      error: "Registration failed. Please try again.",
    }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      error: "Registration failed. Please try again.",
    }
  }
}
