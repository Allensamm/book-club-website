"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check } from "lucide-react"
import { useMembership } from "@/components/membership-provider"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function MembershipPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromRegister = searchParams.get("from") === "register"
  const { isMember, toggleMembership } = useMembership()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  useEffect(() => {
    if (fromRegister) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [fromRegister])

  const handleSelectPlan = (planName: string, price: string) => {
    localStorage.setItem(
      "selectedPlan",
      JSON.stringify({
        name: planName,
        price: price,
        timestamp: Date.now(),
      }),
    )
    router.push("/payment")
  }

  const plans = [
    {
      name: "Explorer",
      price: "$12",
      period: "per month",
      description: "Perfect for curious readers dipping their toes into our community.",
      features: [
        "Monthly book selection",
        "Virtual discussion access",
        "Member community forum",
        "Monthly newsletter & insights",
        "Digital discussion guides",
      ],
      popular: false,
    },
    {
      name: "Discoverer",
      price: "$24",
      period: "per month",
      description: "Our most popular plan for dedicated readers who love to explore.",
      features: [
        "Everything in Explorer",
        "In-person gathering access",
        "Priority event registration",
        "Author Q&A sessions",
        "Personalized recommendations",
        "Member discounts (15% off)",
      ],
      popular: true,
    },
    {
      name: "Curator",
      price: "$55",
      period: "per month",
      description: "Premium experience for passionate literary enthusiasts.",
      features: [
        "Everything in Discoverer",
        "VIP event access",
        "Annual literary retreat",
        "Private author conversations",
        "Exclusive signed editions",
        "Premium discounts (25% off)",
        "Early book announcements",
      ],
      popular: false,
    },
  ]

  const benefits = [
    "Cancel anytime with no commitments",
    "Access to 180+ past discussion recordings",
    "Connect with 12,000+ curious readers worldwide",
    "Curated reading lists and recommendations",
    "Member-exclusive content and literary resources",
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 text-primary-foreground md:py-24">
        <div className="absolute inset-0 z-0">
          <img
            src="/person-reading-book-cozy-setting.jpg"
            alt="Reading at Home"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <h1 className="mb-6 text-center font-serif text-4xl font-bold text-balance md:text-5xl">
            Join ReadLoungeClub
          </h1>
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-primary-foreground/90">
            Choose the membership that fits your reading life and start discovering wonderful stories with our
            community.
          </p>
          {fromRegister && (
            <div className="mx-auto mt-6 max-w-md rounded-lg bg-accent/20 px-6 py-4 text-center backdrop-blur-sm">
              <p className="font-semibold text-lg">✓ Registration Complete!</p>
              <p className="text-sm mt-1 text-primary-foreground/90">Now select your membership plan below</p>
            </div>
          )}
          {isMember && (
            <div className="mx-auto mt-6 max-w-md rounded-lg bg-accent/20 px-6 py-3 text-center">
              <p className="font-semibold">✓ You're already a member!</p>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative flex flex-col ${plan.popular ? "border-accent shadow-lg ring-2 ring-accent" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-sm font-semibold text-accent-foreground">
                    Most Popular
                  </div>
                )}
                <CardContent className="flex-1 pt-6">
                  <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="font-serif text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground"> {plan.period}</span>
                  </div>
                  <p className="mb-6 leading-relaxed text-muted-foreground">{plan.description}</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${plan.popular ? "bg-accent hover:bg-accent/90" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleSelectPlan(plan.name, plan.price)}
                  >
                    Choose {plan.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold">All Members Enjoy</h2>
          <div className="mx-auto max-w-2xl">
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-4">
                  <Check className="mt-1 h-6 w-6 shrink-0 text-accent" />
                  <span className="text-lg leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold">Membership Questions</h2>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="rounded-lg border bg-card px-6">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  Can I switch plans later?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! You can upgrade or downgrade your membership at any time. Changes take effect at the start of
                  your next billing cycle.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="rounded-lg border bg-card px-6">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  What if I can't attend every discussion?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No problem! All discussions are recorded and available to members. You can watch at your convenience
                  and participate in online forums.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="rounded-lg border bg-card px-6">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  Do you offer annual memberships?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! Annual memberships are available at a 15% discount. Contact us for details.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-balance">Still Have Questions?</h2>
          <p className="mb-8 text-lg leading-relaxed text-primary-foreground/90">
            We're here to help you find the perfect membership for your reading journey.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/20 bg-primary-foreground/10 hover:bg-primary-foreground/20"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
