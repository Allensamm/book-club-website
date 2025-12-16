"use server"

import { stripe } from "@/lib/stripe"
import { MEMBERSHIP_PRODUCTS } from "@/lib/products"

export async function startCheckoutSession(productId: string) {
  const product = MEMBERSHIP_PRODUCTS.find((p) => p.id === productId)

  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  // Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      },
    ],
    mode: "subscription",
  })

  return session.client_secret
}
