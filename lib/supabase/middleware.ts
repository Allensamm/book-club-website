import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return supabaseResponse
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        )
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect spotlight routes (except login/signup)
  const isSpotlightRoute = request.nextUrl.pathname.startsWith("/spotlight")
  const isAuthRoute =
    request.nextUrl.pathname === "/spotlight/login" ||
    request.nextUrl.pathname === "/spotlight/signup"

  if (isSpotlightRoute && !isAuthRoute && !user) {
    const url = request.nextUrl.clone()
    url.pathname = "/spotlight/login"
    return NextResponse.redirect(url)
  }

  // If logged in user visits login/signup, redirect to spotlight dashboard
  if (isAuthRoute && user) {
    const url = request.nextUrl.clone()
    url.pathname = "/spotlight"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
