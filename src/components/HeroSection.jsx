import { useNavigate } from "react-router-dom"

export function HeroSection() {

  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-r from-background to-muted py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-balance">
              Discover Amazing
              <span className="text-primary"> Products</span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Shop the latest trends and find everything you need in one place. Quality products, unbeatable prices, and
              fast delivery guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={()=>navigate('/products')} className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md hover:cursor-pointer">
                Shop Now
              </button>
              <button className="border-border bg-transparent px-4 py-2 rounded-md border-2 hover:bg-fuchsia-600 hover:text-white hover:cursor-pointer">
                View Categories
              </button>
            </div>
          </div>

          <div className="relative">
            <img
              src="/modern-ecommerce-hero-image-with-shopping-bags-and.png"
              alt="Shopping hero image"
              width={600}
              height={500}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
