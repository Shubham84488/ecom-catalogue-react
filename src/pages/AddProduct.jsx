import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [product, setProduct] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    stock: ""
  });

  // Fetch categories from backend on mount
  useEffect(() => {
    axios.get("http://localhost:9898/api/categories") // your backend endpoint
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let categoryId = selectedCategory;

    // If user entered a new category, create it first
    if (newCategory.trim() !== "") {
      try {
        const res = await axios.post("http://localhost:9898/api/categories", {
          name: newCategory,
        });
        categoryId = res.data.id;
      } catch (error) {
        console.error("Error creating category:", error);
        return;
      }
    }

    // Submit product with categoryId
    try {
      await axios.post("http://localhost:9898/api/products", {
        ...product,
        price: parseFloat(product.price),
        category: { id: categoryId },
      });
      alert("Product created successfully!");
      setProduct({ name: "", description: "", imageUrl: "", price: "" ,stock: ""});
      setNewCategory("");
      setSelectedCategory("");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Category Section */}
        <div>
          <label className="block font-medium mb-1">Select Category</label>
          <select
            className="w-full border rounded p-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Choose a category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Or Create New Category</label>
          <input
            type="text"
            placeholder="Enter new category name"
            className="w-full border rounded p-2"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </div>

        {/* Product Info */}
        <div>
          <label className="block font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleProductChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleProductChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleProductChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={product.price}
            onChange={handleProductChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Stock</label>
          <input
            type="number"
            step="0.01"
            name="stock"
            value={product.stock}
            onChange={handleProductChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
