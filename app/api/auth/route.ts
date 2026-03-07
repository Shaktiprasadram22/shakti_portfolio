import { NextResponse } from "next/server";

type AuthPayload = {
  email?: string;
  password?: string;
};

const demoUser = {
  email: "demo@portfolio.dev",
  password: "portfolio123",
  name: "Recruiter Demo",
  role: "viewer",
};

export async function POST(request: Request) {
  let payload: AuthPayload;

  try {
    payload = (await request.json()) as AuthPayload;
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid JSON body.",
      },
      { status: 400 }
    );
  }

  if (!payload.email || !payload.password) {
    return NextResponse.json(
      {
        status: "error",
        message: "Email and password are required.",
      },
      { status: 400 }
    );
  }

  if (payload.email !== demoUser.email || payload.password !== demoUser.password) {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid credentials.",
      },
      { status: 401 }
    );
  }

  return NextResponse.json(
    {
      status: "ok",
      endpoint: "POST /api/auth",
      token: "demo.jwt.token.eyJwcm9maWxlIjoic2hha3RpIn0",
      expiresIn: "1h",
      user: {
        name: demoUser.name,
        email: demoUser.email,
        role: demoUser.role,
      },
    },
    { status: 200 }
  );
}
