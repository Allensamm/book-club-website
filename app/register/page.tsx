import type { Metadata } from "next"
import { RegisterForm } from "./register-form"

export const metadata: Metadata = {
  title: "Join ReadLoungeClub | Become a Member",
  description: "Join ReadLoungeClub and become part of a vibrant community of curious readers.",
}

export default function RegisterPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/95 text-primary-foreground">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-serif text-4xl font-bold leading-tight text-balance md:text-5xl">
              Join ReadLoungeClub
            </h1>
            <p className="text-lg leading-relaxed text-primary-foreground/90">
              Start your literary journey with a community that celebrates curiosity, discovery, and meaningful
              conversations.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <RegisterForm />
        </div>
      </section>
    </>
  )
}
