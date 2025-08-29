import { useNavigate } from "react-router-dom"
import ProductList from "./ProductCard"

const featuredProducts = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviewCount: 124,
    image: "/premium-wireless-headphones.png",
    isOnSale: true,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 299.99,
    rating: 4.6,
    reviewCount: 89,
    image: "/smart-fitness-watch.png",
    isOnSale: false,
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    price: 449.99,
    originalPrice: 599.99,
    rating: 4.9,
    reviewCount: 156,
    image: "/ergonomic-office-chair.png",
    isOnSale: true,
  },
  {
    id: "4",
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    rating: 4.5,
    reviewCount: 203,
    image: "/portable-bluetooth-speaker.png",
    isOnSale: false,
  },
  {
    id: "5",
    name: "Professional Camera Lens",
    price: 899.99,
    rating: 4.7,
    reviewCount: 67,
    image: "/professional-camera-lens.png",
    isOnSale: false,
  },
  {
    id: "6",
    name: "Gaming Mechanical Keyboard",
    price: 159.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviewCount: 312,
    image: "/gaming-mechanical-keyboard.png",
    isOnSale: true,
  },
]

export function FeaturedProducts() {

  const navigate = useNavigate();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Featured Products</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Discover our handpicked selection of the most popular and highly-rated products
          </p>
        </div>

        {<ProductList products={featuredProducts}/>}
        

        <div className="text-center mt-12">
          <button onClick={()=>navigate('/products')} className="border-border bg-transparent  px-4 py-2 rounded-md border-2 w-fit hover:cursor-pointer hover:bg-fuchsia-600 hover:text-white">
            View All Products
          </button>
        </div>
      </div>
    </section>
  )
}
