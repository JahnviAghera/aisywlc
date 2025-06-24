import { Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from "@react-email/components"

interface RegistrationConfirmationEmailProps {
  firstName: string
  lastName: string
  registrationId: string
  registrationType: string
  paymentAmount: number
  eventDate: string
}

export default function RegistrationConfirmationEmail({
  firstName = "John",
  lastName = "Doe",
  registrationId = "REG-001",
  registrationType = "student",
  paymentAmount = 2500,
  eventDate = "March 15-16, 2025",
}: RegistrationConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to AISYWLC 2025 - Registration Confirmed!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src="https://your-domain.com/placeholder-logo.png"
              width="150"
              height="50"
              alt="AISYWLC 2025"
              style={logo}
            />
          </Section>

          <Heading style={h1}>Welcome to AISYWLC 2025!</Heading>

          <Text style={text}>
            Dear {firstName} {lastName},
          </Text>

          <Text style={text}>
            Thank you for registering for the{" "}
            <strong>All India Student and Young Professional Women Leadership Conference (AISYWLC) 2025</strong>. We're
            excited to have you join us for this inspiring event!
          </Text>

          <Section style={registrationDetails}>
            <Heading style={h2}>Registration Details</Heading>
            <Text style={detailText}>
              <strong>Registration ID:</strong> {registrationId}
            </Text>
            <Text style={detailText}>
              <strong>Registration Type:</strong> {registrationType.charAt(0).toUpperCase() + registrationType.slice(1)}
            </Text>
            <Text style={detailText}>
              <strong>Event Date:</strong> {eventDate}
            </Text>
            <Text style={detailText}>
              <strong>Venue:</strong> Adani University, Ahmedabad, Gujarat
            </Text>
            <Text style={detailText}>
              <strong>Registration Fee:</strong> ₹{paymentAmount.toLocaleString()}
            </Text>
          </Section>

          <Section style={nextSteps}>
            <Heading style={h2}>Next Steps</Heading>
            <Text style={text}>
              1. <strong>Complete Payment:</strong> Please complete your payment of ₹{paymentAmount.toLocaleString()} to
              confirm your registration.
            </Text>
            <Text style={text}>
              2. <strong>Event Details:</strong> You'll receive detailed event information and schedule closer to the
              event date.
            </Text>
            <Text style={text}>
              3. <strong>Accommodation:</strong> If you've requested accommodation, we'll contact you with booking
              details.
            </Text>
          </Section>

          <Section style={eventHighlights}>
            <Heading style={h2}>Event Highlights</Heading>
            <Text style={text}>
              • Inspiring keynote sessions from industry leaders
              <br />• Technical workshops and skill development sessions
              <br />• Networking opportunities with professionals
              <br />• Student competitions and awards
              <br />• Cultural programs and entertainment
            </Text>
          </Section>

          <Section style={contactInfo}>
            <Heading style={h2}>Contact Information</Heading>
            <Text style={text}>
              For any queries, please contact us at:
              <br />
              <strong>Email:</strong> info@aisywlc2025.org
              <br />
              <strong>Phone:</strong> +91-XXXX-XXXXXX
              <br />
              <strong>Website:</strong>{" "}
              <Link href="https://your-domain.com" style={link}>
                www.aisywlc2025.org
              </Link>
            </Text>
          </Section>

          <Text style={footer}>
            We look forward to seeing you at AISYWLC 2025!
            <br />
            <br />
            Best regards,
            <br />
            <strong>AISYWLC 2025 Organizing Committee</strong>
            <br />
            IEEE Gujarat Section
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
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
