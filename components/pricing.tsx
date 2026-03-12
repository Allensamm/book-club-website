"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"
import CustomQuoteModal from "./custom-quote-modal"
import { Button } from "@/components/ui/button"

const adManagementTiers = [
  {
    service: "Google Ads Management",
    price: "$299",
    period: "/month (management fee)",
    description:
      "Professional setup and ongoing management of your Google Ads campaigns so your budget is spent efficiently.",
    features: [
      "Keyword research & campaign setup",
      "Ad copy creation and optimization",
      "Daily monitoring & adjustments",
      "Monthly performance reports",
    ],
    notIncluded: "Google ad spend (paid directly to Google)",
  },
  {
    service: "Social Media Ads Management",
    price: "$359",
    period: "/month (management fee)",
    description:
      "Strategic planning and optimization of paid ads across Facebook, Instagram, and Pinterest to drive traffic and conversions.",
    features: [
      "Campaign strategy & structure",
      "Ad creative design",
      "Audience targeting & testing",
      "Performance tracking and optimization",
    ],
    notIncluded: "Ad spend (paid directly to Meta or Pinterest)",
  },
  {
    service: "Amazon Advertising Management",
    price: "$499",
    period: "/month (management fee)",
    description: "Hands-on management of your Amazon ads to improve visibility, conversions, and ROI.",
    features: [
      "Product & keyword research",
      "Bid and budget management",
      "Conversion optimization",
      "Weekly performance updates",
    ],
    notIncluded: "Amazon ad spend (paid directly to Amazon)",
  },
]

const additionalServices = [
  {
    service: "Author Websites",
    price: "$499",
    period: "/month",
    description: "Custom-built professional website with ongoing maintenance",
    features: [
      "Responsive design & mobile optimization",
      "Book showcase with sales integration",
      "Email capture & newsletter integration",
      "SEO optimization & Google Analytics",
      "Blog section for author updates",
      "Social media integration",
      "Monthly updates & maintenance",
      "Author bio & media kit pages",
    ],
  },
  {
    service: "Campaign Optimization",
    price: "$499",
    period: "/month",
    description: "Continuous testing & refinement",
    features: ["A/B testing", "Performance analysis", "Strategy adjustment", "ROI focus"],
  },
  {
    service: "Analytics & Reporting",
    price: "$299",
    period: "/month",
    description: "Transparent monthly reports",
    features: ["Comprehensive dashboards", "Custom reports", "Performance insights", "Strategy recommendations"],
  },
]

export default function Pricing() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

  const handleCTAClick = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <section className="py-24 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                Ad Management & Strategy Fees
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                (Ad spend is separate and paid directly to the platform)
              </p>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our management fees cover strategy, setup, optimization, and reporting. Everything is billed monthly with
              no long-term contracts.
            </p>
          </div>

          {/* Ad Management Services */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {adManagementTiers.map((tier, idx) => (
              <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${0.1 * idx}s` }}>
                <Card className="border-border hover:border-primary hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-primary">{tier.service}</CardTitle>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                        <span className="text-muted-foreground text-sm">{tier.period}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-foreground mb-3">This includes:</p>
                      <ul className="space-y-3">
                        {tier.features.map((feature, fidx) => (
                          <li key={fidx} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t border-border pt-4 mt-auto">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold text-orange-600 dark:text-orange-400">Not included:</span>{" "}
                        {tier.notIncluded}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-950 border border-border rounded-lg p-6 mb-20 animate-fade-in-up">
            <h3 className="font-semibold text-foreground mb-4">Important:</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>✓ Management fees cover strategy, setup, optimization, and reporting.</li>
              <li>✓ Ad spend is separate and paid directly to the advertising platform.</li>
              <li>✓ There are no long-term contracts — services are billed monthly.</li>
            </ul>
          </div>

          <div className="mb-20 animate-fade-in-up">
            <h3 className="text-3xl font-bold text-foreground text-center mb-12">How It Works</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "You choose a management plan",
                  description: "Select the ad platforms you want to manage",
                },
                {
                  step: "2",
                  title: "We build and optimize your ad campaigns",
                  description: "Setup, strategy, and creative optimization",
                },
                {
                  step: "3",
                  title: "You control your ad budget",
                  description: "Pay ad spend directly to the platform",
                },
                {
                  step: "4",
                  title: "We manage & improve performance",
                  description: "Monthly testing, optimization, and reporting",
                },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Services */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Additional Services</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalServices.map((tier, idx) => (
                <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${0.1 * idx}s` }}>
                  <Card className="border-border hover:border-primary hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-primary">{tier.service}</CardTitle>
                      <div className="mt-4 space-y-1">
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                          <span className="text-muted-foreground text-sm">{tier.period}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{tier.description}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-3">
                        {tier.features.map((feature, fidx) => (
                          <li key={fidx} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16 animate-fade-in-up space-y-4">
            <p className="text-muted-foreground">
              Need a custom package? Let's create a tailored solution for your specific goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => setIsQuoteModalOpen(true)}
                variant="outline"
                className="hover:border-primary hover:text-primary transition-all"
              >
                Get a Custom Quote
              </Button>
              <Button
                onClick={handleCTAClick}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
              >
                Tell us what you want <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Quote Modal Component */}
      <CustomQuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </>
  )
}
