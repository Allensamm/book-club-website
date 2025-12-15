import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata = {
  title: "FAQ - ReadLoungeClub",
  description: "Frequently asked questions about ReadLoungeClub membership and book discussions.",
}

export default function FAQPage() {
  const faqs = [
    {
      category: "Membership",
      questions: [
        {
          question: "How do I join ReadLoungeClub?",
          answer:
            "Simply visit our Membership page and choose the plan that works best for you. You can sign up online and start participating immediately.",
        },
        {
          question: "Can I cancel my membership at any time?",
          answer:
            "Yes! All memberships can be canceled at any time with no penalties or fees. Your access will continue until the end of your current billing period.",
        },
        {
          question: "Do you offer gift memberships?",
          answer:
            "Gift memberships make wonderful presents for curious readers. Contact us to purchase a gift membership for any duration.",
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, and Apple Pay for membership payments.",
        },
      ],
    },
    {
      category: "Book Selections",
      questions: [
        {
          question: "How are books selected each month?",
          answer:
            "Our team thoughtfully curates monthly selections based on literary quality, diverse perspectives, and themes that inspire curiosity and meaningful discussion. We consider member feedback and aim for variety throughout the year.",
        },
        {
          question: "Can I suggest a book for the club?",
          answer:
            "Members can submit book recommendations through our online portal. While we can't select every suggestion, we carefully review all submissions.",
        },
        {
          question: "What if I don't enjoy the selected book?",
          answer:
            "That's perfectly fine! Part of the book club experience is exploring beyond your usual preferences. You're never required to finish any book, and you're always welcome to join discussions to hear others' perspectives.",
        },
        {
          question: "Where can I purchase the monthly book?",
          answer:
            "You can purchase books from any retailer, including local independent bookstores, online retailers, or borrow from your library. Members receive 15-25% discounts at partner bookstores.",
        },
      ],
    },
    {
      category: "Discussions & Events",
      questions: [
        {
          question: "What if I can't attend a discussion in real-time?",
          answer:
            "All discussions are recorded and available to members for viewing at any time. You can also participate in ongoing conversations in our online community forum.",
        },
        {
          question: "How long are discussion sessions?",
          answer:
            "Typical discussion sessions last 60-90 minutes, but feel free to arrive late or leave early as needed. We understand schedules can be hectic!",
        },
        {
          question: "Do I need to prepare anything before a discussion?",
          answer:
            "Just read the book! We provide discussion guides with questions to consider, but there's no required preparation. Come with your thoughts, questions, and favorite passages to share.",
        },
        {
          question: "Can I bring a friend to an event?",
          answer:
            "Members at the Bibliophile and Literary Patron levels can bring one guest to in-person events. Virtual events are for members only, but friends are welcome to sign up for a trial membership.",
        },
      ],
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "I'm having trouble accessing the virtual discussion. What should I do?",
          answer:
            "First, check your email for the meeting link and ensure you're using a supported browser (Chrome, Firefox, Safari, or Edge). If issues persist, contact our technical support team at least 30 minutes before the event.",
        },
        {
          question: "How do I update my account information?",
          answer:
            "Log into your account dashboard where you can update your email, password, payment information, and communication preferences at any time.",
        },
        {
          question: "I didn't receive my welcome email. What should I do?",
          answer:
            "Check your spam folder first. If you still don't see it, contact us and we'll resend your welcome information and access credentials.",
        },
      ],
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-center font-serif text-4xl font-bold text-balance md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-primary-foreground/90">
            Find answers to common questions about ReadLoungeClub membership and participation.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-12">
            {faqs.map((section, index) => (
              <div key={index}>
                <h2 className="mb-6 font-serif text-2xl font-bold">{section.category}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {section.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-balance">Still Have Questions?</h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            Can't find what you're looking for? Our team is here to help you discover more.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            Contact Support
          </Button>
        </div>
      </section>
    </>
  )
}
