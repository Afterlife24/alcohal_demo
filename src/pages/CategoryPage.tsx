import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products } from '../data/mockData';
import { Star } from 'lucide-react';
import { FiSearch } from 'react-icons/fi'; // Import the search icon

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products.filter(
    (product) => product.category === categoryId
  ));

  useEffect(() => {
    // Scroll to the top of the page when the category page is loaded
    window.scrollTo(0, 0);
  }, [categoryId]);

  useEffect(() => {
    const results = products.filter(
      (product) =>
        product.category === categoryId &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchQuery, categoryId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold capitalize">{categoryId}</h1>
        <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
      </div>
      
      <div className="flex justify-center mb-6"> {/* Center the search bar */}
        <div className="relative w-full max-w-xl"> {/* Make max-width for large screens */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium ml-1">4.5</span>
                </div>
                <span className="text-xs text-gray-500">(120 reviews)</span>
              </div>
              <h2 className="font-semibold mb-1 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h2>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-blue-600">${product.price}</p>
                <span className="text-sm text-gray-500">{product.quantity} left</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
