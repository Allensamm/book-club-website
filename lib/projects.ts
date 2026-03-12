export const projects = [
  {
    id: "romance-author-campaign",
    slug: "romance-author-campaign",
    title: "Romance Author Campaign",
    category: "Facebook & Instagram Ads",
    results: "3.2M Impressions, 12K Sales",
    image: "/romance-book-cover-promotion.jpg",
    tags: ["Facebook", "Instagram", "E-book"],
    details: {
      description:
        "A targeted Facebook and Instagram ads campaign for a romance author that resulted in exceptional engagement and sales conversion.",
      fullDescription:
        "This comprehensive romance author campaign leveraged the power of Facebook and Instagram advertising to reach potential readers across multiple demographics. Through careful audience targeting and compelling ad creatives, we achieved industry-leading metrics in both impressions and conversions.",
      metrics: [
        { label: "Impressions", value: "3.2M" },
        { label: "Sales", value: "12K" },
        { label: "Click-Through Rate", value: "8.5%" },
        { label: "Cost Per Sale", value: "$2.50" },
      ],
      analyticsImages: ["/images/image.png"],
      platforms: ["Facebook Ads", "Instagram Ads", "E-Book Platform"],
      timeline: "6 months",
      budget: "Custom",
    },
  },
  {
    id: "mystery-thriller-website",
    slug: "mystery-thriller-website",
    title: "Mystery Thriller Website",
    category: "Author Website Design",
    results: "5K Monthly Visitors",
    image: "/mystery-thriller-book-website-design.jpg",
    tags: ["Web Design", "Responsive", "E-commerce"],
    details: {
      description:
        "Professional author website with e-commerce integration, allowing direct book sales and reader engagement.",
      fullDescription:
        "A custom-built mystery author website featuring a professional design, integrated e-commerce functionality, and reader engagement tools. The site successfully drives monthly visitor traffic and enables direct book sales.",
      metrics: [
        { label: "Monthly Visitors", value: "5K" },
        { label: "Bounce Rate", value: "32%" },
        { label: "Avg Session Time", value: "3m 24s" },
        { label: "Conversion Rate", value: "6.2%" },
      ],
      analyticsImages: [],
      platforms: ["Website Design", "E-commerce", "Email Integration"],
      timeline: "3 months",
      budget: "$499/month",
    },
  },
  {
    id: "sci-fi-amazon-campaign",
    slug: "sci-fi-amazon-campaign",
    title: "Sci-Fi Amazon Campaign",
    category: "Amazon Ads & Google Ads",
    results: "8.5K Sales, 450% ROI",
    image: "/science-fiction-book-amazon-promotion.jpg",
    tags: ["Amazon Ads", "Google Ads", "Sci-Fi"],
    details: {
      description: "Multi-platform advertising strategy combining Amazon Ads and Google Ads for maximum reach and ROI.",
      fullDescription:
        "A strategic multi-platform approach combining Amazon Ads and Google Ads to maximize visibility and sales for a science fiction series. Our optimization strategy resulted in exceptional ROI through careful keyword research and bid management.",
      metrics: [
        { label: "Total Sales", value: "8.5K" },
        { label: "ROI", value: "450%" },
        { label: "Ad Spend", value: "$4,200" },
        { label: "Revenue Generated", value: "$23,400" },
      ],
      analyticsImages: ["/images/whisk-fd7b6ad08bc004ba03844515e496ad48dr.jpeg", "/images/ads.png"],
      platforms: ["Amazon Ads", "Google Ads", "Keyword Optimization"],
      timeline: "4 months",
      budget: "Custom",
    },
  },
  {
    id: "self-help-author-bundle",
    slug: "self-help-author-bundle",
    title: "Self-Help Author Bundle",
    category: "Multi-Platform Campaign",
    results: "2.1M Impressions, 28K Sales",
    image: "/self-help-book-marketing-campaign.jpg",
    tags: ["Multi-Channel", "Landing Page", "Email"],
    details: {
      description:
        "Comprehensive marketing campaign across multiple platforms with dedicated landing pages and email sequences.",
      fullDescription:
        "An all-encompassing marketing campaign for a self-help author featuring coordinated efforts across Google Ads, Facebook Ads, dedicated landing pages, and email marketing sequences to build an engaged audience.",
      metrics: [
        { label: "Impressions", value: "2.1M" },
        { label: "Sales", value: "28K" },
        { label: "Email Subscribers", value: "15K" },
        { label: "Landing Page Conversion", value: "9.8%" },
      ],
      analyticsImages: ["/images/pihoidhd.png"],
      platforms: ["Google Ads", "Facebook Ads", "Email Marketing", "Landing Pages"],
      timeline: "5 months",
      budget: "Custom",
    },
  },
  {
    id: "childrens-book-launch",
    slug: "childrens-book-launch",
    title: "Children's Book Launch",
    category: "Complete Marketing Package",
    results: "15K Pre-Orders",
    image: "/children-book-launch-marketing.jpg",
    tags: ["Website", "Social Media", "PR"],
    details: {
      description:
        "Full-service launch campaign including website, social media strategy, and PR outreach for a children's book series.",
      fullDescription:
        "A complete launch strategy for a children's book series including custom website development, comprehensive social media campaigns, and strategic PR outreach to generate maximum buzz and pre-orders.",
      metrics: [
        { label: "Pre-Orders", value: "15K" },
        { label: "Social Media Reach", value: "850K" },
        { label: "Press Mentions", value: "24" },
        { label: "Media Value", value: "$45K" },
      ],
      analyticsImages: [],
      platforms: ["Website Design", "Social Media", "PR Outreach", "Influencer Marketing"],
      timeline: "3 months",
      budget: "Custom",
    },
  },
  {
    id: "non-fiction-publisher-site",
    slug: "non-fiction-publisher-site",
    title: "Non-Fiction Publisher Site",
    category: "Publisher Website",
    results: "8K Daily Visitors",
    image: "/publisher-website-design-platform.jpg",
    tags: ["Web Design", "CMS", "Multi-Author"],
    details: {
      description:
        "Custom CMS platform for a non-fiction publisher managing multiple author profiles and book listings.",
      fullDescription:
        "A sophisticated custom CMS platform designed for a non-fiction publisher to manage 50+ authors and 300+ book listings. The platform includes author portals, advanced analytics, and e-commerce integration.",
      metrics: [
        { label: "Daily Visitors", value: "8K" },
        { label: "Books Listed", value: "300+" },
        { label: "Authors Managed", value: "50+" },
        { label: "Monthly Revenue", value: "$125K" },
      ],
      analyticsImages: [],
      platforms: ["Custom CMS", "Multi-Author Management", "E-commerce", "Analytics Dashboard"],
      timeline: "6 months",
      budget: "$499/month",
    },
  },
]

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export function getAllProjectSlugs() {
  return projects.map((p) => p.slug)
}
