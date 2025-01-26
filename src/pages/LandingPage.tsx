import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/mockData';
import { Sparkles, Gift } from 'lucide-react';

const promotions = [
  {
    id: 1,
    title: 'Summer Sale',
    description: 'Get 20% off on all wines',
    imageUrl: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?auto=format&fit=crop&q=80&w=800',
    badge: 'Limited Time',
  },
  {
    id: 2,
    title: 'New Arrivals',
    description: 'Check out our new craft beers',
    imageUrl: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?auto=format&fit=crop&q=80&w=800',
    badge: 'New',
  },
];

export const LandingPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="h-[50vh] relative overflow-hidden rounded-2xl mb-8">
          <img
            src={promotions[0].imageUrl}
            alt={promotions[0].title}
            className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex items-center justify-center text-white">
            <div className="text-center max-w-2xl px-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">Special Offer</span>
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{promotions[0].title}</h2>
              <p className="text-lg md:text-xl mb-8">{promotions[0].description}</p>
              <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="relative h-48 rounded-xl overflow-hidden group cursor-pointer"
            >
              <img
                src={promo.imageUrl}
                alt={promo.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center text-white">
                <div className="text-center p-6">
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-4">
                    <Gift className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{promo.badge}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
                  <p className="text-sm text-white/90">{promo.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Categories</h2>
          <Link to="/categories" className="text-blue-600 hover:text-blue-700 font-medium">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative rounded-xl overflow-hidden aspect-square bg-gray-100"
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-start p-6">
                <div>
                  <h3 className="text-white text-xl font-bold group-hover:translate-x-2 transition-transform duration-300">
                    {category.name}
                  </h3>
                  <div className="h-1 w-12 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-2"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};