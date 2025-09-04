import { Search, ShoppingCart, Menu, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('jwt')
    if(token == null){
      navigate('/login')
    }
  },[])

  return (
    <header className="sticky top-2 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              ShopHub
            </Link>
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Products
            </Link>
          </nav>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8  p-2 ">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border border-2 focus:ring-2 focus:ring-ring focus:rounded-xl w-[420px] rounded-lg p-2"
              />
            </div>
          </div>

          {/* Cart, Profile, and Mobile Menu */}
          <div className="flex items-center space-x-10">
            <Link to="/cart">
              <button
                variant="ghost"
                size="icon"
                className="relative cursor-pointer"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </button>
            </Link>

            <Link to="/profile">
              <button
                variant="ghost"
                size="icon"
                className="relative cursor-pointer"
              >
                <User className="h-5 w-5" />
              </button>
            </Link>

            {/* Mobile menu button */}
            <button variant="ghost" size="icon" className="md:hidden cursor-pointer hover:bg-accent transition">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input border-border focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
