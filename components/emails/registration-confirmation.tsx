import type * as React from "react"

interface RegistrationConfirmationEmailProps {
  firstName: string
  lastName: string
  registrationId: string
  registrationType: string
  paymentAmount: number
  eventDate: string
}

export const RegistrationConfirmationEmail: React.FC<RegistrationConfirmationEmailProps> = ({
  firstName = "John",
  lastName = "Doe",
  registrationId = "REG-001",
  registrationType = "student",
  paymentAmount = 2500,
  eventDate = "March 15-16, 2025",
}) => {
  return (
    <div style={main}>
      <div style={container}>
        <div style={logoContainer}>
          <img
            src="https://your-domain.com/placeholder-logo.png"
            width="150"
            height="50"
            alt="AISYWLC 2025"
            style={logo}
          />
        </div>

        <h1 style={h1}>Welcome to AISYWLC 2025!</h1>

        <p style={text}>
          Dear {firstName} {lastName},
        </p>

        <p style={text}>
          Thank you for registering for the{" "}
          <strong>All India Student and Young Professional Women Leadership Conference (AISYWLC) 2025</strong>. We're
          excited to have you join us for this inspiring event!
        </p>

        <div style={registrationDetails}>
          <h2 style={h2}>Registration Details</h2>
          <p style={detailText}>
            <strong>Registration ID:</strong> {registrationId}
          </p>
          <p style={detailText}>
            <strong>Registration Type:</strong> {registrationType.charAt(0).toUpperCase() + registrationType.slice(1)}
          </p>
          <p style={detailText}>
            <strong>Event Date:</strong> {eventDate}
          </p>
          <p style={detailText}>
            <strong>Venue:</strong> Adani University, Ahmedabad, Gujarat
          </p>
          <p style={detailText}>
            <strong>Registration Fee:</strong> ₹{paymentAmount.toLocaleString()}
          </p>
        </div>

        <div style={nextSteps}>
          <h2 style={h2}>Next Steps</h2>
          <p style={text}>
            1. <strong>Complete Payment:</strong> Please complete your payment of ₹{paymentAmount.toLocaleString()} to
            confirm your registration.
          </p>
          <p style={text}>
            2. <strong>Event Details:</strong> You'll receive detailed event information and schedule closer to the
            event date.
          </p>
          <p style={text}>
            3. <strong>Accommodation:</strong> If you've requested accommodation, we'll contact you with booking
            details.
          </p>
        </div>

        <div style={eventHighlights}>
          <h2 style={h2}>Event Highlights</h2>
          <p style={text}>
            • Inspiring keynote sessions from industry leaders
            <br />• Technical workshops and skill development sessions
            <br />• Networking opportunities with professionals
            <br />• Student competitions and awards
            <br />• Cultural programs and entertainment
          </p>
        </div>

        <div style={contactInfo}>
          <h2 style={h2}>Contact Information</h2>
          <p style={text}>
            For any queries, please contact us at:
            <br />
            <strong>Email:</strong> info@aisywlc2025.org
            <br />
            <strong>Phone:</strong> +91-XXXX-XXXXXX
            <br />
            <strong>Website:</strong>{" "}
            <a href="https://your-domain.com" style={link}>
              www.aisywlc2025.org
            </a>
          </p>
        </div>

        <p style={footer}>
          We look forward to seeing you at AISYWLC 2025!
          <br />
          <br />
          Best regards,
          <br />
          <strong>AISYWLC 2025 Organizing Committee</strong>
          <br />
          IEEE Gujarat Section
        </p>
      </div>
    </div>
  )
}

// Make it the default export
export default RegistrationConfirmationEmail

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
}

const logoContainer = {
  textAlign: "center" as const,
  padding: "20px 0",
}

const logo = {
  margin: "0 auto",
}

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  textAlign: "center" as const,
}

const h2 = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "30px 0 15px",
}

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
  padding: "0 40px",
}

const detailText = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "8px 0",
  padding: "0 40px",
}

const registrationDetails = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  margin: "32px 0",
  padding: "20px",
}

const nextSteps = {
  margin: "32px 0",
  padding: "0 40px",
}

const eventHighlights = {
  backgroundColor: "#e3f2fd",
  borderRadius: "8px",
  margin: "32px 0",
  padding: "20px 40px",
}

const contactInfo = {
  backgroundColor: "#f1f8e9",
  borderRadius: "8px",
  margin: "32px 0",
  padding: "20px 40px",
}

const link = {
  color: "#1976d2",
  textDecoration: "underline",
}

const footer = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "48px 0 0",
  textAlign: "center" as const,
  padding: "0 40px",
}
