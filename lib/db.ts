import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Database utility functions
export async function getUser(email: string) {
  const result = await sql`
    SELECT * FROM users WHERE email = ${email} LIMIT 1
  `
  return result[0] || null
}

export async function createUser(userData: {
  email: string
  firstName: string
  lastName: string
  phone?: string
  organization?: string
  designation?: string
}) {
  const result = await sql`
    INSERT INTO users (email, first_name, last_name, phone, organization, designation)
    VALUES (${userData.email}, ${userData.firstName}, ${userData.lastName}, 
            ${userData.phone || null}, ${userData.organization || null}, ${userData.designation || null})
    RETURNING *
  `
  return result[0]
}

export async function createRegistration(registrationData: {
  userId: number
  registrationType: string
  ieeeNumber?: string
  dietaryRequirements?: string
  accommodationNeeded: boolean
  accommodationType?: string
  specialRequirements?: string
  paymentAmount: number
}) {
  const result = await sql`
    INSERT INTO registrations (
      user_id, registration_type, ieee_membership_number, dietary_requirements,
      accommodation_needed, accommodation_type, special_requirements, payment_amount
    )
    VALUES (
      ${registrationData.userId}, ${registrationData.registrationType}, 
      ${registrationData.ieeeNumber || null}, ${registrationData.dietaryRequirements || null},
      ${registrationData.accommodationNeeded}, ${registrationData.accommodationType || null},
      ${registrationData.specialRequirements || null}, ${registrationData.paymentAmount}
    )
    RETURNING *
  `
  return result[0]
}

export async function getRegistrations(limit = 50, offset = 0) {
  const result = await sql`
    SELECT r.*, u.first_name, u.last_name, u.email, u.organization
    FROM registrations r
    JOIN users u ON r.user_id = u.id
    ORDER BY r.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `
  return result
}

export async function getRegistrationStats() {
  const result = await sql`
    SELECT 
      COUNT(*) as total_registrations,
      COUNT(CASE WHEN registration_status = 'confirmed' THEN 1 END) as confirmed_registrations,
      COUNT(CASE WHEN payment_status = 'completed' THEN 1 END) as paid_registrations,
      SUM(CASE WHEN payment_status = 'completed' THEN payment_amount ELSE 0 END) as total_revenue
    FROM registrations
  `
  return result[0]
}

export async function getEvents() {
  const result = await sql`
    SELECT * FROM events 
    WHERE is_active = true 
    ORDER BY start_time ASC
  `
  return result
}

export async function getSponsors() {
  const result = await sql`
    SELECT * FROM sponsors 
    WHERE is_active = true 
    ORDER BY 
      CASE tier 
        WHEN 'platinum' THEN 1 
        WHEN 'gold' THEN 2 
        WHEN 'silver' THEN 3 
        WHEN 'bronze' THEN 4 
      END,
      name ASC
  `
  return result
}

export async function createPayment(paymentData: {
  userId: number
  registrationId: number
  amount: number
  paymentMethod: string
  paymentGatewayId?: string
}) {
  const result = await sql`
    INSERT INTO payments (user_id, registration_id, amount, payment_method, payment_gateway_id)
    VALUES (${paymentData.userId}, ${paymentData.registrationId}, ${paymentData.amount}, 
            ${paymentData.paymentMethod}, ${paymentData.paymentGatewayId || null})
    RETURNING *
  `
  return result[0]
}

export async function updatePaymentStatus(paymentId: number, status: string, transactionId?: string) {
  const result = await sql`
    UPDATE payments 
    SET payment_status = ${status}, transaction_id = ${transactionId || null}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${paymentId}
    RETURNING *
  `
  return result[0]
}

export async function updateRegistrationStatus(registrationId: number, status: string) {
  const result = await sql`
    UPDATE registrations 
    SET registration_status = ${status}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${registrationId}
    RETURNING *
  `
  return result[0]
}

export async function createNotification(notificationData: {
  userId: number
  title: string
  message: string
  type?: string
}) {
  const result = await sql`
    INSERT INTO notifications (user_id, title, message, type)
    VALUES (${notificationData.userId}, ${notificationData.title}, 
            ${notificationData.message}, ${notificationData.type || "info"})
    RETURNING *
  `
  return result[0]
}

export async function getUserNotifications(userId: number, limit = 10) {
  const result = await sql`
    SELECT * FROM notifications 
    WHERE user_id = ${userId} 
    ORDER BY created_at DESC 
    LIMIT ${limit}
  `
  return result
}

export async function logAdminAction(logData: {
  adminUserId: number
  action: string
  targetTable?: string
  targetId?: number
  oldValues?: any
  newValues?: any
  ipAddress?: string
  userAgent?: string
}) {
  const result = await sql`
    INSERT INTO admin_logs (
      admin_user_id, action, target_table, target_id, 
      old_values, new_values, ip_address, user_agent
    )
    VALUES (
      ${logData.adminUserId}, ${logData.action}, ${logData.targetTable || null},
      ${logData.targetId || null}, ${JSON.stringify(logData.oldValues) || null},
      ${JSON.stringify(logData.newValues) || null}, ${logData.ipAddress || null},
      ${logData.userAgent || null}
    )
    RETURNING *
  `
  return result[0]
}
