import { type NextRequest, NextResponse } from "next/server"
import { getEvents } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const events = await getEvents()
    return NextResponse.json({ events })
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
