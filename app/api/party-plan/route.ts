import { NextRequest, NextResponse } from "next/server";

type PartyPlanRequest = {
  guestSize: number;
  partyType: string;
  under21: boolean;
  location: string;
};

type PartyPlanResponse = {
  plan: string;
  error?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body: PartyPlanRequest = await req.json();
    const { guestSize, partyType, under21, location } = body;

    if (!guestSize || !partyType || !location) {
      return NextResponse.json(
        { error: "Missing required fields: guestSize, partyType, or location" },
        { status: 400 }
      );
    }

    // Send request to the Flask server
    const response = await fetch("http://127.0.0.1:4200/api/party_plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guestSize, partyType, under21, location }),
      signal: AbortSignal.timeout(10000), // 10 seconds timeout
    });

    // Check if response is actually JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid response from the Flask server. It may be down or misconfigured." },
        { status: 500 }
      );
    }

    const data: PartyPlanResponse = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Error communicating with Flask server:", error);
    return NextResponse.json(
      { error: "Internal server error or timeout" },
      { status: 500 }
    );
  }
}
