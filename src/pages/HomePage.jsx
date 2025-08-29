import { HeroSection } from "../components/HeroSection"
import { FeaturedProducts } from "../components/FeaturedProducts"
import { Footer } from "../components/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="px-16">
        <HeroSection />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  )
}
