import { type NextRequest, NextResponse } from "next/server"
import { getRegistrations, getRegistrationStats } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = (page - 1) * limit

    const registrations = await getRegistrations(limit, offset)
    const stats = await getRegistrationStats()

    return NextResponse.json({
      registrations,
      stats,
      pagination: {
        page,
        limit,
        total: stats.total_registrations,
      },
    })
  } catch (error) {
    console.error("Error fetching registrations:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
