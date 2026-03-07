import { NextResponse } from "next/server";

const baseStocks = [
  { symbol: "AAPL", base: 223.4 },
  { symbol: "MSFT", base: 431.2 },
  { symbol: "NVDA", base: 918.6 },
  { symbol: "TSLA", base: 182.9 },
];

export async function GET() {
  const data = baseStocks.map((stock) => {
    const randomShift = (Math.random() - 0.5) * 6;
    const price = Number((stock.base + randomShift).toFixed(2));
    const changePct = Number((((price - stock.base) / stock.base) * 100).toFixed(2));
    const volume = Math.floor(1000000 + Math.random() * 8000000);

    return {
      symbol: stock.symbol,
      price,
      changePct,
      volume,
      currency: "USD",
    };
  });

  return NextResponse.json(
    {
      service: "SentinelDataCore",
      endpoint: "GET /api/stocks",
      status: "ok",
      generatedAt: new Date().toISOString(),
      data,
    },
    { status: 200 }
  );
}
