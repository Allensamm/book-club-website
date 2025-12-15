import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, BookOpen } from "lucide-react"

export function Footer() {
  const footerLinks = {
    About: [
      { href: "/about", label: "Our Story" },
      { href: "/book-club", label: "How It Works" },
      { href: "/membership", label: "Membership" },
    ],
    Resources: [
      { href: "/books", label: "Book Selections" },
      { href: "/events", label: "Events" },
      { href: "/blog", label: "Blog" },
    ],
    Support: [
      { href: "/contact", label: "Contact Us" },
      { href: "/faq", label: "FAQ" },
      { href: "/terms", label: "Terms & Privacy" },
    ],
  }

  const socialLinks = [
    { href: "#", icon: Facebook, label: "Facebook" },
    { href: "#", icon: Twitter, label: "Twitter" },
    { href: "#", icon: Instagram, label: "Instagram" },
    { href: "#", icon: Mail, label: "Email" },
  ]

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2 font-serif text-xl font-bold">
              <BookOpen className="h-6 w-6" />
              <span>WonderBookClub</span>
            </Link>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              A thoughtful community where curious minds explore diverse stories and discover new perspectives through
              the written word.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 font-semibold">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} WonderBookClub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
