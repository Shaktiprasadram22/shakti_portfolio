import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      service: "TradeNexus + UMS Feed",
      endpoint: "GET /api/news",
      status: "ok",
      generatedAt: new Date().toISOString(),
      items: [
        {
          id: "n-101",
          title: "AI-assisted trading signals gain traction in retail platforms",
          source: "Market Wire",
          category: "FinTech",
          sentiment: "positive",
        },
        {
          id: "n-102",
          title: "Universities adopt retrieval-based chatbots for student support",
          source: "Campus Tech",
          category: "EdTech",
          sentiment: "neutral",
        },
        {
          id: "n-103",
          title: "Low-latency backend architectures improve live API responsiveness",
          source: "Dev Infra Daily",
          category: "Engineering",
          sentiment: "positive",
        },
      ],
    },
    { status: 200 }
  );
}
