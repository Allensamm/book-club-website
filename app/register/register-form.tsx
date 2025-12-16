"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2 } from "lucide-react"

export function RegisterForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    membershipTier: "",
    interests: [] as string[],
    howHeard: "",
    message: "",
    newsletter: false,
    eventUpdates: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // TODO: Replace with actual endpoint when provided
    console.log("Form data:", formData)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card className="border-accent/20 bg-accent/5">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-accent/10 p-4">
                <CheckCircle2 className="h-12 w-12 text-accent" />
              </div>
            </div>
            <h2 className="mb-4 font-serif text-3xl font-bold">Welcome to ReadLoungeClub!</h2>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              Thank you for joining our community. Check your email for next steps and exclusive member content.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
              <a href="/">Return Home</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Personal Information */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="John"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Doe"
                  className="bg-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your@email.com"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="membershipTier">Membership Tier *</Label>
              <Select
                required
                value={formData.membershipTier}
                onValueChange={(value) => handleInputChange("membershipTier", value)}
              >
                <SelectTrigger id="membershipTier" className="bg-background">
                  <SelectValue placeholder="Select a membership tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="explorer">Explorer - $12/month</SelectItem>
                  <SelectItem value="discoverer">Discoverer - $25/month</SelectItem>
                  <SelectItem value="curator">Curator - $45/month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Preferences & Interests */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Your Interests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>What genres interest you? (Select all that apply)</Label>
              <div className="space-y-3">
                {["Fiction", "Non-Fiction", "Mystery", "Science Fiction", "Romance", "Biography"].map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest}
                      checked={formData.interests.includes(interest)}
                      onCheckedChange={() => handleInterestToggle(interest)}
                    />
                    <Label htmlFor={interest} className="cursor-pointer font-normal">
                      {interest}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="howHeard">How did you hear about us?</Label>
              <Select value={formData.howHeard} onValueChange={(value) => handleInputChange("howHeard", value)}>
                <SelectTrigger id="howHeard" className="bg-background">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="friend">Friend or Family</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="search">Search Engine</SelectItem>
                  <SelectItem value="article">Article or Blog</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Tell us about yourself (optional)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="What are you hoping to find in our book club?"
                className="bg-background min-h-[120px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Newsletter & Preferences */}
      <Card className="mt-8 border-border/50">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="newsletter"
                checked={formData.newsletter}
                onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
              />
              <div className="space-y-1">
                <Label htmlFor="newsletter" className="cursor-pointer font-semibold">
                  Subscribe to our newsletter
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates about new books, upcoming events, and exclusive member content.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="eventUpdates"
                checked={formData.eventUpdates}
                onCheckedChange={(checked) => handleInputChange("eventUpdates", checked as boolean)}
              />
              <div className="space-y-1">
                <Label htmlFor="eventUpdates" className="cursor-pointer font-semibold">
                  I'm interested in event updates
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about author conversations, book discussions, and community gatherings.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              By joining, you agree to our Terms of Service and Privacy Policy.
            </p>
            <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 sm:w-auto w-full">
              Complete Registration
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
