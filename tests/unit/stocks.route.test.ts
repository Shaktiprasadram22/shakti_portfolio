/** @jest-environment node */

import { GET } from "@/app/api/stocks/route";

describe("GET /api/stocks", () => {
  it("returns stock data with required fields", async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.service).toBe("SentinelDataCore");
    expect(body.endpoint).toBe("GET /api/stocks");
    expect(body.status).toBe("ok");
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data).toHaveLength(4);

    for (const stock of body.data) {
      expect(typeof stock.symbol).toBe("string");
      expect(typeof stock.price).toBe("number");
      expect(typeof stock.changePct).toBe("number");
      expect(typeof stock.volume).toBe("number");
      expect(stock.currency).toBe("USD");
    }
  });
});

