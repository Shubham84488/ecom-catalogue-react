import React, { useEffect,useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cart, setCart] = useState(null); // store full cart
  const [cartItems, setCartItems] = useState([]); // store items only

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get("http://localhost:9898/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        console.log("Cart response:", response.data);

        // store in state
        setCart(response.data);
        setCartItems(response.data.items || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.delete(
        `http://localhost:9898/api/cart/remove/${itemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart(response.data);
      setCartItems(response.data.items || []);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.delete("http://localhost:9898/api/cart/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data);
      setCartItems([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          🛒 Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-lg">No items in cart.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map((item, index) => (
                <li
                  key={`${item.id}-${index}`}
                  className="flex items-center justify-between bg-gray-100 rounded-xl p-4 shadow-sm"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {item.product.name}
                    </h4>
                    <p className="text-gray-600">
                      ₹{item.product.price} × {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t pt-4">
              <h3 className="text-xl font-bold text-gray-800">
                Total: ₹{cart?.totalPrice}
              </h3>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={clearCart}
                className="w-1/2 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Clear Cart
              </button>
              <button
                onClick={() => alert("Proceeding to checkout...")}
                className="w-1/2 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


export default CartPage;
