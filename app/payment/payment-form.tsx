"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Phone, CheckCircle2, ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { StripeCheckout } from "@/components/stripe-checkout"

export function PaymentForm() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "defer">("stripe")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [registrationData, setRegistrationData] = useState<any>(null)

  useEffect(() => {
    // Load selected plan and registration data
    const plan = localStorage.getItem("selectedPlan")
    const registration = localStorage.getItem("pendingRegistration")

    if (plan) setSelectedPlan(JSON.parse(plan))
    if (registration) setRegistrationData(JSON.parse(registration))

    // Redirect if no plan selected
    if (!plan) {
      router.push("/membership")
    }
  }, [router])

  const handleDeferPayment = async () => {
    setIsProcessing(true)

    try {
      const supabase = createClient()

      if (registrationData && selectedPlan) {
        const registrationPayload = {
          first_name: registrationData.firstName || "",
          last_name: registrationData.lastName || "",
          email: registrationData.email || "",
          phone: registrationData.phone || null,
          membership_tier: selectedPlan.name?.toLowerCase() || "explorer",
          address: registrationData.address || null,
          city: registrationData.city || null,
          postal_code: registrationData.postalCode || null,
          country: registrationData.country || null,
          favorite_genres: registrationData.favoriteGenres || [],
          reading_frequency: registrationData.readingFrequency || null,
          newsletter_updates: registrationData.newsletterUpdates || false,
          newsletter_recommendations: registrationData.newsletterRecommendations || false,
          newsletter_events: registrationData.newsletterEvents || false,
          event_updates: registrationData.eventUpdates || false,
          payment_method: "defer",
          payment_status: "pending",
        }

        const { error } = await supabase.from("member_registrations").insert([registrationPayload])

        if (error) {
          throw new Error(error.message)
        }
      }

      // Clear localStorage
      localStorage.removeItem("selectedPlan")
      localStorage.removeItem("pendingRegistration")

      setIsProcessing(false)
      setShowSuccessModal(true)
    } catch (error: any) {
      console.error("[v0] Payment processing error:", error)
      setIsProcessing(false)
      alert("There was an error processing your registration. Please try again or contact support.")
    }
  }

  const handleSuccessClose = () => {
    setShowSuccessModal(false)
    router.push("/")
  }

  if (!selectedPlan) {
    return null
  }

  return (
    <>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Plans
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Order Summary */}
          <Card className="border-border/50 lg:col-span-1">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="font-semibold text-lg">{selectedPlan.name} Membership</p>
                <p className="text-3xl font-bold text-accent mt-2">
                  {selectedPlan.price}
                  <span className="text-base font-normal text-muted-foreground">/month</span>
                </p>
              </div>

              {registrationData && (
                <div className="space-y-2 text-sm">
                  <p className="font-semibold">Account Details:</p>
                  <p className="text-muted-foreground">
                    {registrationData.firstName} {registrationData.lastName}
                  </p>
                  <p className="text-muted-foreground">{registrationData.email}</p>
                </div>
              )}

              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">{selectedPlan.price}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total Due Today</span>
                  <span className="text-accent">{selectedPlan.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card className="border-border/50 lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                <div className="space-y-4">
                  <div
                    className={`rounded-lg border-2 p-4 cursor-pointer transition-all ${paymentMethod === "stripe" ? "border-accent bg-accent/5" : "border-border"}`}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="stripe" id="stripe" />
                      <Label htmlFor="stripe" className="cursor-pointer font-semibold">
                        Credit Card or PayPal
                      </Label>
                    </div>
                    {paymentMethod === "stripe" && (
                      <p className="mt-3 text-sm text-muted-foreground ml-8">
                        Pay securely with your credit card or PayPal account
                      </p>
                    )}
                  </div>

                  {/* Defer Payment */}
                  <div
                    className={`rounded-lg border-2 p-4 cursor-pointer transition-all ${paymentMethod === "defer" ? "border-accent bg-accent/5" : "border-border"}`}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="defer" id="defer" />
                      <Label htmlFor="defer" className="flex items-center gap-2 cursor-pointer font-semibold">
                        <Phone className="h-5 w-5" />
                        Contact Us for Payment
                      </Label>
                    </div>
                    {paymentMethod === "defer" && (
                      <p className="mt-3 text-sm text-muted-foreground ml-8">
                        We'll reach out to you directly to arrange payment. This option is great if you prefer
                        alternative payment methods or have questions.
                      </p>
                    )}
                  </div>
                </div>
              </RadioGroup>

              {paymentMethod === "stripe" && selectedPlan.productId && (
                <div className="pt-4 border-t">
                  <StripeCheckout productId={selectedPlan.productId} />
                </div>
              )}

              {paymentMethod === "defer" && (
                <div className="pt-6">
                  <Button
                    onClick={handleDeferPayment}
                    disabled={isProcessing}
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90"
                  >
                    {isProcessing ? "Processing..." : "Submit Registration"}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    By completing this registration, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-accent/10 p-3">
                <CheckCircle2 className="h-10 w-10 text-accent" />
              </div>
            </div>
            <DialogTitle className="text-center font-serif text-2xl">Registration Received!</DialogTitle>
            <DialogDescription className="text-center pt-2">
              We've received your registration. Our team will contact you shortly to arrange payment.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button onClick={handleSuccessClose} size="lg" className="bg-accent hover:bg-accent/90">
              Return Home
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
