"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BookOpen, LogOut, Plus, Sun, Moon, User } from "lucide-react"
import { useTheme } from "next-themes"

interface SpotlightHeaderProps {
  userEmail?: string
  displayName?: string
}

export default function SpotlightHeader({ userEmail, displayName }: SpotlightHeaderProps) {
  const router = useRouter()
  const supabase = createClient()
  const { theme, setTheme } = useTheme()

  const initials = displayName
    ? displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : userEmail?.slice(0, 2).toUpperCase() || "U"

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/spotlight/login")
    router.refresh()
  }

  return (
    <header className="h-14 border-b border-border bg-background/95 backdrop-blur-sm flex items-center justify-between px-4 shrink-0">
      <Link href="/spotlight" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <BookOpen className="w-5 h-5 text-primary" />
        <span className="font-bold text-foreground">Spotlight</span>
      </Link>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/spotlight?upload=true">
            <Plus className="w-4 h-4 mr-1" />
            Upload Book
          </Link>
        </Button>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-md text-foreground hover:bg-muted transition-colors"
          aria-label="Toggle theme"
        >
          <Sun className="h-4 w-4 hidden dark:block" />
          <Moon className="h-4 w-4 block dark:hidden" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{displayName || "User"}</p>
              <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/spotlight/profile" className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
