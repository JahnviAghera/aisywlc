import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase";
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
        first_name,
        last_name,
      phone,
      organization,
      designation,
      category,
      ieeeNumber,
      dietaryRequirements,
      accommodationNeeded,
      accommodationType,
      specialRequirements,
    } = body

    // Create a Supabase client
    const supabase = createClient();

    // Check if user already exists in Supabase
    const { data: existingUsers, error: existingUserError } = await supabase
      .from('users')
      .select()
      .eq('email', email)

    if (existingUserError) {
      console.error("Supabase user check error:", existingUserError)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }

    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Generate random password
    const password = crypto.randomBytes(16).toString('hex');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user in Supabase
    const { data: newUser, error: createUserError } = await supabase
      .from('users')
      .insert({
        email,
        first_name,
        last_name,
        phone,
        organization,
        designation,
        password_hash: hashedPassword, // Store the hashed password
      })
      .select()

    if (createUserError) {
      console.error("Supabase user creation error:", createUserError)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }

    if (!newUser || newUser.length === 0) {
      console.error("Supabase user creation error: No user returned")
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }

    const user = newUser[0];

    // Create registration in Supabase
    const { data: newRegistration, error: createRegistrationError } = await supabase
      .from('registrations')
      .insert({
        user_id: user.id,
        registration_type: category,
        ieee_membership_number: ieeeNumber,
        dietary_requirements: dietaryRequirements,
        accommodation_needed: accommodationNeeded,
        accommodation_type: accommodationType,
        special_requirements: specialRequirements,
      })
      .select()

    if (createRegistrationError) {
      console.error("Supabase registration creation error:", createRegistrationError)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }

    if (!newRegistration || newRegistration.length === 0) {
      console.error("Supabase registration creation error: No registration returned")
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }

    const registration = newRegistration[0];

    return NextResponse.json({
      success: true,
      userId: user.id,
      registrationId: registration.id,
      message: "Registration successful! Please proceed with payment.",
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
