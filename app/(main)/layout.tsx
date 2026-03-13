import Header from "@/components/header"
import StickyCTAButton from "@/components/sticky-cta-button"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <StickyCTAButton />
      {children}
    </>
  )
}
