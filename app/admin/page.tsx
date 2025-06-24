import { EmailTest } from "@/components/admin/email-test"

export default function AdminPage() {
  return (
    <div>
      <h1>Admin Page</h1>
      {/* Existing tabs or other content here */}

      <div className="mt-8">
        <EmailTest />
      </div>
    </div>
  )
}
