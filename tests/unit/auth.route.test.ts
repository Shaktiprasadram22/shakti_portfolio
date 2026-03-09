/** @jest-environment node */

import { POST } from "@/app/api/auth/route";

describe("POST /api/auth", () => {
  it("returns 400 for invalid JSON body", async () => {
    const request = new Request("http://localhost/api/auth", {
      method: "POST",
      body: "{bad-json",
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({
      status: "error",
      message: "Invalid JSON body.",
    });
  });

  it("returns 400 when email or password is missing", async () => {
    const request = new Request("http://localhost/api/auth", {
      method: "POST",
      body: JSON.stringify({ email: "demo@portfolio.dev" }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.message).toBe("Email and password are required.");
  });

  it("returns 401 for invalid credentials", async () => {
    const request = new Request("http://localhost/api/auth", {
      method: "POST",
      body: JSON.stringify({ email: "demo@portfolio.dev", password: "wrong" }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.message).toBe("Invalid credentials.");
  });

  it("returns token payload for valid credentials", async () => {
    const request = new Request("http://localhost/api/auth", {
      method: "POST",
      body: JSON.stringify({ email: "demo@portfolio.dev", password: "portfolio123" }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe("ok");
    expect(body.token).toContain("demo.jwt.token");
    expect(body.user.email).toBe("demo@portfolio.dev");
  });
});

