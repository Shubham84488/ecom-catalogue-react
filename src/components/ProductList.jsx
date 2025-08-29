import { useNavigate } from "react-router-dom";
const ProductList = ({ products }) => {

  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
        >
          {/* Product Image */}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover"
          />

          {/* Card Body */}
          <div className="p-4 flex flex-col flex-grow">
            <h5 className="text-lg font-semibold text-gray-800">{product.name}</h5>
            <p className="text-gray-600 text-sm mt-1 flex-grow">
              {product.description}
            </p>

            {/* Price & Stock */}
            <div className="mt-3">
              <p className="text-blue-600 font-bold">₹{product.price}</p>
              <p className="text-green-600 font-medium">
                Current Stock: {product.stock}
              </p>
            </div>

            {/* Button */}
            <button
              onClick={() => navigate(`/products/${product.id}`)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
