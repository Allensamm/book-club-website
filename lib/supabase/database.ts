import { createClient, createStaticClient } from "./server"

export async function getBlogPostBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).single()

  if (error) {
    console.error("[v0] Error fetching blog post:", error)
    return null
  }

  return data
}

export async function getAllBlogSlugs() {
  const supabase = await createStaticClient()
  const { data, error } = await supabase.from("blog_posts").select("slug")

  if (error) {
    console.error("[v0] Error fetching blog slugs:", error)
    return []
  }

  return data?.map((item: { slug: string }) => item.slug) || []
}

export async function getProjectBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).single()

  if (error) {
    console.error("[v0] Error fetching project:", error)
    return null
  }

  return {
    ...data,
    details: {
      description: data.description,
      fullDescription: data.full_description,
      metrics: data.metrics.metrics || [],
      analyticsImages: data.analytics_images || [],
      platforms: data.platforms || [],
      timeline: data.timeline,
      budget: data.budget,
    },
  }
}

export async function getAllProjectSlugs() {
  const supabase = await createStaticClient()
  const { data, error } = await supabase.from("projects").select("slug")

  if (error) {
    console.error("[v0] Error fetching project slugs:", error)
    return []
  }

  return data?.map((item: { slug: string }) => item.slug) || []
}
