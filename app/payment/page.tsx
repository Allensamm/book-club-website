import type { Metadata } from "next"
import { PaymentForm } from "./payment-form"

export const metadata: Metadata = {
  title: "Complete Payment | ReadLoungeClub",
  description: "Complete your membership payment to join ReadLoungeClub",
}

export default function PaymentPage() {
  return (
    <>
      <section className="relative py-16 text-primary-foreground md:py-24">
        <div className="absolute inset-0 z-0">
          <img
            src="/person-reading-book-cozy-setting.jpg"
            alt="Complete Payment"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <h1 className="mb-6 text-center font-serif text-4xl font-bold text-balance md:text-5xl">
            Complete Your Membership
          </h1>
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-primary-foreground/90">
            You're just one step away from joining our literary community.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <PaymentForm />
        </div>
      </section>
    </>
  )
}
