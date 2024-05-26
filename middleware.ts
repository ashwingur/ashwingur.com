import { NextRequest, NextResponse } from "next/server";

type CheckAuth = {
  authenticated: boolean;
  role: string;
  username: string;
};

export async function middleware(req: NextRequest) {
  console.log("calling middlware");
  // Define the URL of the Flask authentication endpoint
  const authCheckUrl = `${process.env.NEXT_PUBLIC_ASHWINGUR_API}/checkauth`;

  // Fetch the authentication status from the Flask backend
  const authResponse = await fetch(authCheckUrl, {
    headers: {
      "Content-Type": "application/json",
      Cookie: req.headers.get("cookie") || "", // Pass cookies to backend for authentication
    },
  });

  const authData: CheckAuth = await authResponse.json();

  console.log(authData);
  console.log(req.cookies.getAll());

  // Check if the user is authenticated
  if (!authData.authenticated) {
    // If not authenticated, redirect to the login page
    const loginUrl = new URL("/Login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // If it's an admin path
  if (req.nextUrl.pathname.startsWith("/Admin") && authData.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If authenticated, allow the request to proceed
  return NextResponse.next();
}

// Define the matcher function to specify which paths should use the middleware
export const config = {
  matcher: ["/Admin/:path*"], // Adjust this to match your protected routes
};
