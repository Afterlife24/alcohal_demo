import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { products } from '../data/mockData';
import { Toast } from '../components/Toast';
import { Star, Truck, Shield, ArrowLeft } from 'lucide-react';

export const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find((p) => p.id === productId);
  const addToCart = useStore((state) => state.addToCart);
  const [showToast, setShowToast] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, cartQuantity: quantity });
    setShowToast(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toast
        message={`${product.name} added to cart!`}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      
      <Link to={`/category/${product.category}`} className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to {product.category}
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:grid md:grid-cols-2">
          <div className="relative aspect-square">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Best Seller
            </div>
          </div>
          <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-yellow-400">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-lg font-medium ml-1">4.5</span>
              </div>
              <span className="text-gray-500">(120 reviews)</span>
            </div>

            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-blue-600 text-3xl font-bold mb-6">
              ${product.price}
            </p>
            
            <div className="prose prose-gray mb-6">
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-gray-600">
                <Truck className="w-5 h-5" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Shield className="w-5 h-5" />
                <span>Secure payment & money-back guarantee</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.quantity} available
                </span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors transform active:scale-[0.98] duration-200 font-medium"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};