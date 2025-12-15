import { Card, CardContent } from "@/components/ui/card"
import { Heart, Target, Users } from "lucide-react"

export const metadata = {
  title: "About Us - WonderBookClub",
  description: "Learn about our mission, values, and the thoughtful community behind WonderBookClub.",
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 text-primary-foreground md:py-24">
        <div className="absolute inset-0 z-0">
          <img src="/library-books-warm-atmosphere.jpg" alt="Library" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <h1 className="mb-6 text-center font-serif text-4xl font-bold text-balance md:text-5xl">
            About WonderBookClub
          </h1>
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-primary-foreground/90">
            We're cultivating a community of curious readers who believe every book holds a world of wonder waiting to
            be explored together.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold">Our Mission</h2>
              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                At WonderBookClub, we believe reading is an act of curiosity—a doorway to understanding lives, cultures,
                and ideas beyond our own experience.
              </p>
              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                Our mission is to create a welcoming space where thoughtful readers gather to explore literature that
                challenges assumptions, sparks imagination, and deepens our connection to the human experience.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Through carefully selected books, engaging conversations, and genuine community, we're fostering a
                culture of literary curiosity and mutual discovery.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg">
              <img
                src="/thoughtful-readers-discussing-books-in-cozy-space.jpg"
                alt="WonderBookClub members in discussion"
                className="h-full w-full rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold">Our Values</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Heart,
                title: "Welcoming",
                description:
                  "Every voice matters. We create an inclusive environment where all readers feel valued and heard.",
              },
              {
                icon: Target,
                title: "Thoughtful",
                description:
                  "We choose books that reward careful reading and inspire meaningful conversations about what matters.",
              },
              {
                icon: Users,
                title: "Curious",
                description:
                  "We embrace questions, different perspectives, and the joy of discovering something new in every story.",
              },
            ].map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{value.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 font-serif text-3xl font-bold">Who We Are</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                WonderBookClub began in 2019 when a small group of friends realized they were having their most
                meaningful conversations over books. What started as casual coffee shop meetings has grown into a
                community of over 12,000 curious readers across the globe.
              </p>
              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                Our team includes avid readers, educators, and literature enthusiasts who are passionate about making
                great books accessible and book discussions genuinely enriching. We partner with independent bookstores,
                publishers, and authors to bring you selections that inspire wonder and conversation.
              </p>
            </div>
            <div>
              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                Today, we host discussions both online and in select cities, organize intimate author conversations, and
                maintain a vibrant community where members exchange recommendations, insights, and the occasional
                literary debate.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Whether you read one book a year or fifty, there's a place for you here. Join us in celebrating the
                wonder that comes from turning pages and sharing stories.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
