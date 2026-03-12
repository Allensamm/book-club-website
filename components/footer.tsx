import Link from "next/link"
import { Linkedin, Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-white border-t border-primary py-16 px-4 animate-fade-in-up">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Removed logo section from footer */}
          <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h4 className="font-semibold text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-white/80 hover:text-white transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h4 className="font-semibold text-white">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#services" className="text-white/80 hover:text-white transition-colors duration-300">
                  Google Ads
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-white/80 hover:text-white transition-colors duration-300">
                  Social Media
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-white/80 hover:text-white transition-colors duration-300">
                  Amazon Ads
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-white/80 hover:text-white transition-colors duration-300">
                  Web Design
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h4 className="font-semibold text-white">Learn</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <h4 className="font-semibold text-white">Follow</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-white/80 hover:text-white transition-colors duration-300 hover:scale-110 transform"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-white transition-colors duration-300 hover:scale-110 transform"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-white transition-colors duration-300 hover:scale-110 transform"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-white transition-colors duration-300 hover:scale-110 transform"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div
          className="border-t border-white/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/80 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <p>© 2026 JOINTASK. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
