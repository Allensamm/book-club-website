export interface MembershipProduct {
  id: string
  name: string
  description: string
  priceInCents: number
  displayPrice: string
  period: string
  features: string[]
  popular: boolean
}

export const MEMBERSHIP_PRODUCTS: MembershipProduct[] = [
  {
    id: "explorer-monthly",
    name: "Explorer",
    description: "Perfect for curious readers dipping their toes into our community.",
    priceInCents: 1200, // $12.00
    displayPrice: "$12",
    period: "per month",
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
    id: "discoverer-monthly",
    name: "Discoverer",
    description: "Our most popular plan for dedicated readers who love to explore.",
    priceInCents: 2400, // $24.00
    displayPrice: "$24",
    period: "per month",
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
    id: "curator-monthly",
    name: "Curator",
    description: "Premium experience for passionate literary enthusiasts.",
    priceInCents: 5500, // $55.00
    displayPrice: "$55",
    period: "per month",
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
