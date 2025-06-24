import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/types/supabase"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type Registration = Database["public"]["Tables"]["registrations"]["Row"]
type Event = Database["public"]["Tables"]["events"]["Row"]
type Sponsor = Database["public"]["Tables"]["sponsors"]["Row"]
type Payment = Database["public"]["Tables"]["payments"]["Row"]

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching profile:", error)
    return null
  }

  return data
}

export async function createProfile(profileData: {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  organization?: string
  designation?: string
}) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: profileData.id,
      email: profileData.email,
      first_name: profileData.firstName,
      last_name: profileData.lastName,
      phone: profileData.phone,
      organization: profileData.organization,
      designation: profileData.designation,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating profile:", error)
    throw error
  }

  return data
}

export async function createRegistration(registrationData: {
  userId: string
  registrationType: "student" | "professional" | "ieee_member"
  ieeeNumber?: string
  dietaryRequirements?: string
  accommodationNeeded: boolean
  accommodationType?: string
  specialRequirements?: string
  paymentAmount: number
}) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("registrations")
    .insert({
      user_id: registrationData.userId,
      registration_type: registrationData.registrationType,
      ieee_membership_number: registrationData.ieeeNumber,
      dietary_requirements: registrationData.dietaryRequirements,
      accommodation_needed: registrationData.accommodationNeeded,
      accommodation_type: registrationData.accommodationType,
      special_requirements: registrationData.specialRequirements,
      payment_amount: registrationData.paymentAmount,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating registration:", error)
    throw error
  }

  return data
}

export async function getRegistrations(limit = 50, offset = 0) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("registrations")
    .select(`
      *,
      profiles:user_id (
        first_name,
        last_name,
        email,
        organization
      )
    `)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching registrations:", error)
    throw error
  }

  return data
}

export async function getRegistrationStats() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("registrations")
    .select("registration_status, payment_status, payment_amount")

  if (error) {
    console.error("Error fetching registration stats:", error)
    throw error
  }

  const stats = {
    total_registrations: data.length,
    confirmed_registrations: data.filter((r) => r.registration_status === "confirmed").length,
    paid_registrations: data.filter((r) => r.payment_status === "completed").length,
    total_revenue: data
      .filter((r) => r.payment_status === "completed")
      .reduce((sum, r) => sum + (r.payment_amount || 0), 0),
  }

  return stats
}

export async function getEvents(): Promise<Event[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_active", true)
    .order("start_time", { ascending: true })

  if (error) {
    console.error("Error fetching events:", error)
    throw error
  }

  return data || []
}

export async function getSponsors(): Promise<Sponsor[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("sponsors")
    .select("*")
    .eq("is_active", true)
    .order("tier", { ascending: true })

  if (error) {
    console.error("Error fetching sponsors:", error)
    throw error
  }

  return data || []
}

export async function createPayment(paymentData: {
  userId: string
  registrationId: string
  amount: number
  paymentMethod: string
  paymentGatewayId?: string
}) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("payments")
    .insert({
      user_id: paymentData.userId,
      registration_id: paymentData.registrationId,
      amount: paymentData.amount,
      payment_method: paymentData.paymentMethod,
      payment_gateway_id: paymentData.paymentGatewayId,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating payment:", error)
    throw error
  }

  return data
}

export async function updatePaymentStatus(paymentId: string, status: string, transactionId?: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("payments")
    .update({
      payment_status: status,
      transaction_id: transactionId,
    })
    .eq("id", paymentId)
    .select()
    .single()

  if (error) {
    console.error("Error updating payment status:", error)
    throw error
  }

  return data
}

export async function createNotification(notificationData: {
  userId: string
  title: string
  message: string
  type?: "info" | "success" | "warning" | "error"
}) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("notifications")
    .insert({
      user_id: notificationData.userId,
      title: notificationData.title,
      message: notificationData.message,
      type: notificationData.type || "info",
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating notification:", error)
    throw error
  }

  return data
}

export async function getUserNotifications(userId: string, limit = 10) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching notifications:", error)
    throw error
  }

  return data || []
}
