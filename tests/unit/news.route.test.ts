/** @jest-environment node */

import { GET } from "@/app/api/news/route";

describe("GET /api/news", () => {
  it("returns a valid news feed payload", async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe("ok");
    expect(body.endpoint).toBe("GET /api/news");
    expect(Array.isArray(body.items)).toBe(true);
    expect(body.items).toHaveLength(3);
    expect(body.items[0]).toHaveProperty("title");
    expect(body.items[0]).toHaveProperty("source");
  });
});

