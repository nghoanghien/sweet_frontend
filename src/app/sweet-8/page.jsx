'use client';
import React from 'react';
import { Heart } from 'lucide-react'; // Using lucide-react for icons

// Sample product data
const products = [
  { id: 1, name: "Cucumber", price: "$2/pc", discount: "-10%", imageUrl: null },
  { id: 2, name: "Cucumber", price: "$2/pc", discount: "-10%", imageUrl: null },
  { id: 3, name: "Cucumber", price: "$2/pc", discount: "-10%", imageUrl: null },
  { id: 4, name: "Cucumber", price: "$2/pc", discount: "-10%", imageUrl: null },
  { id: 5, name: "Cucumber", price: "$2/pc", discount: "-10%", imageUrl: null },
  { id: 6, name: "Cucumber", price: "$2/pc", discount: "-10%", imageUrl: null },
  { id: 7, name: "Cucumber", price: "$2/pc", discount: "-10%", imageUrl: null },
  { id: 8, name: "Cucumber", price: "$2/pc", discount: "-10%", imageUrl: null },
];

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 w-60 flex flex-col relative">
      {/* Heart Icon */}
      <button className="absolute top-3 left-3 text-gray-400 hover:text-red-500 focus:outline-none">
        <Heart size={20} />
      </button>

      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-3 right-3 bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-md">
          {product.discount}
        </div>
      )}

      {/* Product Image Placeholder */}
      <div className="w-full h-32 bg-gray-300 rounded-md mb-4 mt-8 flex items-center justify-center">
        {/* You can replace this with an <img /> tag when you have image URLs */}
        {/* <span className="text-gray-500 text-sm">Image</span> */}
      </div>

      {/* Product Name */}
      <h3 className="text-sm font-medium text-gray-700 mb-1">{product.name}</h3>

      {/* Product Price */}
      <p className="text-xs text-gray-500 mb-3">{product.price}</p>

      {/* Add to Basket Button */}
      <button className="w-full bg-black text-white text-sm py-2.5 rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
        Add to basket
      </button>
    </div>
  );
};

const Sweet8Page = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sweet8Page;