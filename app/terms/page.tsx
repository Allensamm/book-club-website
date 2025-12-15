export const metadata = {
  title: "Terms & Privacy - Literary Circle",
  description: "Our terms of service and privacy policy.",
}

export default function TermsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-center font-serif text-4xl font-bold md:text-5xl">Terms & Privacy Policy</h1>
          <p className="mx-auto max-w-2xl text-center text-lg text-primary-foreground/90">
            Last updated: January 1, 2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-12">
            {/* Terms of Service */}
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold">Terms of Service</h2>
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">1. Acceptance of Terms</h3>
                  <p className="leading-relaxed">
                    By accessing and using Literary Circle's services, you accept and agree to be bound by the terms and
                    provisions of this agreement. If you do not agree to these terms, please do not use our services.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">2. Membership</h3>
                  <p className="leading-relaxed">
                    Membership in Literary Circle grants you access to our book club discussions, events, and community
                    features based on your selected membership tier. Memberships are personal and non-transferable.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">3. Payment and Billing</h3>
                  <p className="leading-relaxed">
                    Membership fees are billed monthly or annually based on your selection. All fees are non-refundable
                    except as required by law. You may cancel your membership at any time, and cancellation will take
                    effect at the end of your current billing period.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">4. User Conduct</h3>
                  <p className="leading-relaxed">
                    Members agree to participate respectfully in discussions and events. We maintain a zero-tolerance
                    policy for harassment, hate speech, or discriminatory behavior. Violations may result in membership
                    termination without refund.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">5. Intellectual Property</h3>
                  <p className="leading-relaxed">
                    All content provided by Literary Circle, including discussion guides, recordings, and educational
                    materials, is protected by copyright. Members may not reproduce, distribute, or publicly display
                    this content without permission.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">6. Limitation of Liability</h3>
                  <p className="leading-relaxed">
                    Literary Circle provides services "as is" and makes no warranties regarding availability, accuracy,
                    or fitness for a particular purpose. We are not liable for any indirect or consequential damages
                    arising from use of our services.
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy Policy */}
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold">Privacy Policy</h2>
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">1. Information We Collect</h3>
                  <p className="leading-relaxed">
                    We collect information you provide directly (name, email, payment information) and automatically
                    (usage data, device information, cookies). This information helps us provide and improve our
                    services.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">2. How We Use Your Information</h3>
                  <p className="leading-relaxed">
                    We use your information to process membership, facilitate discussions, send communications about
                    events and books, improve our services, and ensure platform security. We never sell your personal
                    information to third parties.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">3. Information Sharing</h3>
                  <p className="leading-relaxed">
                    We share information only with service providers necessary to operate our platform (payment
                    processors, email services, hosting providers) and as required by law. All partners are bound by
                    confidentiality agreements.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">4. Data Security</h3>
                  <p className="leading-relaxed">
                    We implement industry-standard security measures to protect your information, including encryption,
                    secure servers, and regular security audits. However, no method of transmission over the internet is
                    100% secure.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">5. Your Rights</h3>
                  <p className="leading-relaxed">
                    You have the right to access, correct, or delete your personal information. You may also opt out of
                    marketing communications while remaining a member. Contact us to exercise these rights.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">6. Cookies</h3>
                  <p className="leading-relaxed">
                    We use cookies and similar technologies to enhance your experience, analyze usage, and deliver
                    personalized content. You can control cookie preferences through your browser settings.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">7. Children's Privacy</h3>
                  <p className="leading-relaxed">
                    Our services are not directed to children under 13. We do not knowingly collect personal information
                    from children. If you believe we have collected such information, please contact us immediately.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">8. Changes to This Policy</h3>
                  <p className="leading-relaxed">
                    We may update this privacy policy periodically. We will notify members of significant changes via
                    email. Continued use of our services after changes constitutes acceptance of the updated policy.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-lg border border-border bg-muted/30 p-8">
              <h3 className="mb-4 font-serif text-xl font-bold">Questions About Our Policies?</h3>
              <p className="mb-4 text-muted-foreground">
                If you have questions about our Terms of Service or Privacy Policy, please contact us:
              </p>
              <p className="text-muted-foreground">
                <strong>Email:</strong> legal@literarycircle.com
                <br />
                <strong>Mail:</strong> Literary Circle, 123 Library Lane, New York, NY 10001
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
