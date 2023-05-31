import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const allowedRoutes = ['/', '/success']
  const regex = new RegExp("^/[a-zA-Z0-9]{6}$");
  const pathname = req.nextUrl.pathname;

  if (regex.test(req.nextUrl.pathname)) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_REDIRECT}/${pathname}`,
        { method: "GET" }
      );
      if (res.status === 200) {
        const data = await res.json();
        return NextResponse.redirect(data.actualURl);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (!allowedRoutes.includes(pathname)) {
    return NextResponse.redirect(req.nextUrl.origin);
  }
}

export const config = {
  matcher: ["/((?!.*\\.).*)"],
  runtime: "experimental-edge",
};
