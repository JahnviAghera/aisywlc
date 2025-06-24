export interface RegistrationEmailData {
  firstName: string
  lastName: string
  email: string
  registrationId: string
  registrationType: string
  paymentAmount: number
}

// Generate HTML email template
function generateRegistrationEmailHTML(data: RegistrationEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to AISYWLC 2025</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f6f9fc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
          
          <!-- Header -->
          <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #e3f2fd;">
            <h1 style="color: #1976d2; margin: 0; font-size: 28px;">AISYWLC 2025</h1>
            <p style="color: #666; margin: 5px 0 0 0;">All India Student & Young Professional Women Leadership Conference</p>
          </div>

          <!-- Welcome Message -->
          <div style="padding: 30px 0;">
            <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">Welcome to AISYWLC 2025!</h2>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Dear ${data.firstName} ${data.lastName},
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
              Thank you for registering for the <strong>All India Student and Young Professional Women Leadership Conference (AISYWLC) 2025</strong>. We're excited to have you join us for this inspiring event!
            </p>
          </div>

          <!-- Registration Details -->
          <div style="background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
            <h3 style="color: #333; font-size: 20px; margin-top: 0; margin-bottom: 20px;">Registration Details</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #333; font-weight: bold;">Registration ID:</td>
                <td style="padding: 8px 0; color: #333;">${data.registrationId}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #333; font-weight: bold;">Registration Type:</td>
                <td style="padding: 8px 0; color: #333;">${data.registrationType.charAt(0).toUpperCase() + data.registrationType.slice(1)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #333; font-weight: bold;">Event Date:</td>
                <td style="padding: 8px 0; color: #333;">March 15-16, 2025</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #333; font-weight: bold;">Venue:</td>
                <td style="padding: 8px 0; color: #333;">Adani University, Ahmedabad, Gujarat</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #333; font-weight: bold;">Registration Fee:</td>
                <td style="padding: 8px 0; color: #333;">₹${data.paymentAmount.toLocaleString()}</td>
              </tr>
            </table>
          </div>

          <!-- Next Steps -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #333; font-size: 20px; margin-bottom: 20px;">Next Steps</h3>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #1976d2;">1. Complete Payment:</strong>
              <span style="color: #333;"> Please complete your payment of ₹${data.paymentAmount.toLocaleString()} to confirm your registration.</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #1976d2;">2. Event Details:</strong>
              <span style="color: #333;"> You'll receive detailed event information and schedule closer to the event date.</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #1976d2;">3. Accommodation:</strong>
              <span style="color: #333;"> If you've requested accommodation, we'll contact you with booking details.</span>
            </div>
          </div>

          <!-- Event Highlights -->
          <div style="background-color: #e3f2fd; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
            <h3 style="color: #333; font-size: 20px; margin-top: 0; margin-bottom: 20px;">Event Highlights</h3>
            
            <ul style="color: #333; font-size: 16px; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li>Inspiring keynote sessions from industry leaders</li>
              <li>Technical workshops and skill development sessions</li>
              <li>Networking opportunities with professionals</li>
              <li>Student competitions and awards</li>
              <li>Cultural programs and entertainment</li>
            </ul>
          </div>

          <!-- Contact Information -->
          <div style="background-color: #f1f8e9; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
            <h3 style="color: #333; font-size: 20px; margin-top: 0; margin-bottom: 20px;">Contact Information</h3>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0;">
              For any queries, please contact us at:<br>
              <strong>Email:</strong> info@aisywlc2025.org<br>
              <strong>Phone:</strong> +91-XXXX-XXXXXX<br>
              <strong>Website:</strong> <a href="https://your-domain.com" style="color: #1976d2;">www.aisywlc2025.org</a>
            </p>
          </div>

          <!-- Footer -->
          <div style="text-align: center; padding: 30px 0; border-top: 1px solid #eee; color: #666;">
            <p style="margin: 0; font-size: 16px; line-height: 1.6;">
              We look forward to seeing you at AISYWLC 2025!
            </p>
            <p style="margin: 20px 0 0 0; font-size: 14px;">
              <strong>AISYWLC 2025 Organizing Committee</strong><br>
              IEEE Gujarat Section
            </p>
          </div>

        </div>
      </body>
    </html>
  `
}

export async function sendRegistrationConfirmationEmail(data: RegistrationEmailData) {
  // Check if we have Resend API key
  if (!process.env.RESEND_API_KEY) {
    console.log("RESEND_API_KEY not found, skipping email send")
    return { success: false, message: "Email service not configured" }
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AISYWLC 2025 <noreply@aisywlc2025.org>",
        to: [data.email],
        subject: "Welcome to AISYWLC 2025 - Registration Confirmed!",
        html: generateRegistrationEmailHTML(data),
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Resend API error:", errorData)
      throw new Error(`Email API error: ${response.status}`)
    }

    const result = await response.json()
    console.log("Registration confirmation email sent:", result)
    return { success: true, data: result }
  } catch (error) {
    console.error("Failed to send registration confirmation email:", error)
    return { success: false, error: error }
  }
}

export async function sendWelcomeEmail(email: string, firstName: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log("RESEND_API_KEY not found, skipping welcome email")
    return { success: false, message: "Email service not configured" }
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AISYWLC 2025 <noreply@aisywlc2025.org>",
        to: [email],
        subject: "Welcome to AISYWLC 2025!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #1976d2; text-align: center;">Welcome to AISYWLC 2025!</h1>
            <p style="font-size: 16px; color: #333;">Dear ${firstName},</p>
            <p style="font-size: 16px; color: #333;">Thank you for your interest in the All India Student and Young Professional Women Leadership Conference 2025.</p>
            <p style="font-size: 16px; color: #333;">We're excited to have you as part of our community!</p>
            <p style="font-size: 16px; color: #333;">Best regards,<br/>AISYWLC 2025 Team</p>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Welcome email error:", errorData)
      throw new Error(`Email API error: ${response.status}`)
    }

    const result = await response.json()
    return { success: true, data: result }
  } catch (error) {
    console.error("Failed to send welcome email:", error)
    return { success: false, error: error }
  }
}
