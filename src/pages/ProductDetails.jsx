import React, { useEffect, useState } from "react";
import axios, { AxiosHeaders } from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * ProductDetails.jsx
 * - Fetches a single product by :id and displays details
 * - Assumes backend endpoint: GET /api/products/{id}
 * - Tailwind CSS styles
 */

const API_BASE = import.meta?.env?.VITE_API_BASE_URL || "http://localhost:9898"; // e.g., http://localhost:9898

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const addToCart = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:9898/api/cart/add?productId=${productId}&quantity=${quantity}`,{},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
          }
        }
      );
      toast.success("Product added to cart");
    } catch (error) {
      console.log(error);
      toast.error("Unable to add to cart");
    }
  };
  

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");

    axios
      .get(`http://localhost:9898/api/products/${id}`, { withCredentials: true })
      .then((res) => {
        if (!isMounted) return;
        setProduct(res.data);
      })
      .catch((err) => {
        if (!isMounted) return;
        const status = err?.response?.status;
        if (status === 404) setError("Product not found.");
        else setError("Failed to load product. Please try again.");
      })
      .finally(() => isMounted && setLoading(false));

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-80 bg-gray-200 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-1/2" />
            <div className="h-24 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl">
          {error}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 rounded-2xl bg-gray-900 text-white hover:bg-black"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!product) return null;

  const { name, description, imageUrl, price, category } = product;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 rounded-2xl bg-gray-100 hover:bg-gray-200"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="max-h-96 w-full object-contain rounded-xl"
            />
          ) : (
            <div className="h-96 w-full grid place-items-center bg-gray-50 rounded-xl text-gray-500">
              No image
            </div>
          )}
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h1 className="text-3xl font-semibold mb-2">{name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm">
              {category?.name || "Uncategorized"}
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">{description}</p>

          <div className="flex items-center justify-between">
            <div>
                <div className="text-sm text-gray-500">Price</div>
                <div className="text-2xl font-bold">₹{Number(price || 0).toFixed(2)}</div>
                {/* BUTTONS BELOW THE PRICE */}
                <div className="flex gap-3 mt-4">
                <button
                    type="button"
                    className="px-5 py-2 rounded-2xl bg-green-600 text-white hover:bg-green-700"
                    onClick={() => {addToCart(product?.id,1) ; toast.success("Item added to cart")}}
                >
                    Add to Cart
                </button>
                <button
                    type="button"
                    className="px-5 py-2 rounded-2xl bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => {addToCart(product); navigate('/cart')}}
                >
                    Buy Now
                </button>
                </div>
            </div>
        </div>

        </div>
      </div>

      {/* Meta / JSON (dev aid) */}
      <details className="mt-8">
        <summary className="cursor-pointer text-sm text-gray-500">Debug: raw JSON</summary>
        <pre className="mt-2 bg-gray-50 p-4 rounded-xl overflow-auto text-xs">{JSON.stringify(product, null, 2)}</pre>
      </details>
    </div>
  );
}
