import { Resend } from "resend"
import RegistrationConfirmationEmail from "@/components/emails/registration-confirmation"

const resend = new Resend(process.env.RESEND_API_KEY)

export interface RegistrationEmailData {
  firstName: string
  lastName: string
  email: string
  registrationId: string
  registrationType: string
  paymentAmount: number
}

export async function sendRegistrationConfirmationEmail(data: RegistrationEmailData) {
  try {
    const { data: emailResult, error } = await resend.emails.send({
      from: "AISYWLC 2025 <noreply@aisywlc2025.org>",
      to: [data.email],
      subject: "Welcome to AISYWLC 2025 - Registration Confirmed!",
      react: RegistrationConfirmationEmail({
        firstName: data.firstName,
        lastName: data.lastName,
        registrationId: data.registrationId,
        registrationType: data.registrationType,
        paymentAmount: data.paymentAmount,
        eventDate: "March 15-16, 2025",
      }),
    })

    if (error) {
      console.error("Email sending error:", error)
      throw error
    }

    console.log("Registration confirmation email sent:", emailResult)
    return emailResult
  } catch (error) {
    console.error("Failed to send registration confirmation email:", error)
    throw error
  }
}

export async function sendWelcomeEmail(email: string, firstName: string) {
  try {
    const { data: emailResult, error } = await resend.emails.send({
      from: "AISYWLC 2025 <noreply@aisywlc2025.org>",
      to: [email],
      subject: "Welcome to AISYWLC 2025!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">Welcome to AISYWLC 2025!</h1>
          <p>Dear ${firstName},</p>
          <p>Thank you for your interest in the All India Student and Young Professional Women Leadership Conference 2025.</p>
          <p>We're excited to have you as part of our community!</p>
          <p>Best regards,<br/>AISYWLC 2025 Team</p>
        </div>
      `,
    })

    if (error) {
      console.error("Welcome email error:", error)
      throw error
    }

    return emailResult
  } catch (error) {
    console.error("Failed to send welcome email:", error)
    throw error
  }
}
