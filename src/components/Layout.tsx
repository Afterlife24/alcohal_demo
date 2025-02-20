// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, ShoppingCart, X, ChevronDown } from 'lucide-react';
// import { categories } from '../data/mockData';
// import { useStore } from '../store/useStore';

// export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isCategoryOpen, setIsCategoryOpen] = useState(false);
//   const cart = useStore((state) => state.cart);

//   const cartItemCount = cart.reduce((sum, item) => sum + item.cartQuantity, 0);
//   const location = useLocation();

//   // Check if the current route is a category page (using the category path)
//   const isCategoryPage = location.pathname.includes('');

//   return (
//     <div className="min-h-screen flex flex-col">
//       <header className="bg-white shadow-sm fixed w-full top-0 z-50">
//         <div className="container mx-auto px-4 h-16 flex items-center justify-between">
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             aria-label="Menu"
//           >
//             <Menu className="h-6 w-6" />
//           </button>

//           <Link to="/" className="text-2xl font-bold">
//             Spirits
//           </Link>

//           <Link 
//             to="/cart" 
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
//             aria-label="Cart"
//           >
//             <ShoppingCart className="h-6 w-6" />
//             {cartItemCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                 {cartItemCount}
//               </span>
//             )}
//           </Link>
//         </div>
//       </header>

//       {/* Hamburger Menu */}
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
//         onClick={() => setIsMenuOpen(false)}
//       >
//         <div
//           className={`fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="p-4">
//             <button
//               onClick={() => setIsMenuOpen(false)}
//               className="absolute top-4 right-4"
//             >
//               <X className="h-6 w-6" />
//             </button>
//             <nav className="mt-8">
//               <Link
//                 to="/"
//                 className="block py-2 hover:bg-gray-50 rounded px-4"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Home
//               </Link>
//               <button
//                 className="w-full text-left py-2 hover:bg-gray-50 rounded px-4 flex items-center justify-between"
//                 onClick={() => setIsCategoryOpen(!isCategoryOpen)}
//               >
//                 Categories
//                 <ChevronDown className={`h-5 w-5 transform transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
//               </button>
//               {isCategoryOpen && (
//                 <div className="ml-4 space-y-1">
//                   {categories.map((category) => (
//                     <Link
//                       key={category.id}
//                       to={`/category/${category.id}`}
//                       className="block py-2 hover:bg-gray-50 rounded px-4 text-gray-600"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       {category.name}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//               <Link
//                 to="/cart"
//                 className="block py-2 hover:bg-gray-50 rounded px-4"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Cart
//               </Link>
//               <Link
//                 to="/about"
//                 className="block py-2 hover:bg-gray-50 rounded px-4"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 About Us
//               </Link>
//             </nav>
//           </div>
//         </div>
//       </div>

//       <main className="flex-1 pt-16 md:pt-16">{children}</main>

//       <footer className="bg-gray-900 text-gray-300 py-12">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="font-bold text-white mb-4">About</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link to="/about" className="hover:text-white transition-colors">
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/contact" className="hover:text-white transition-colors">
//                     Contact
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-bold text-white mb-4">Legal</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link to="/privacy" className="hover:text-white transition-colors">
//                     Privacy Policy
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/terms" className="hover:text-white transition-colors">
//                     Terms of Service
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-bold text-white mb-4">Social</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="https://facebook.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:text-white transition-colors"
//                   >
//                     Facebook
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="https://twitter.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:text-white transition-colors"
//                   >
//                     Twitter
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="https://instagram.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:text-white transition-colors"
//                   >
//                     Instagram
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-bold text-white mb-4">Contact</h3>
//               <ul className="space-y-2">
//                 <li>info@example.com</li>
//                 <li>(555) 123-4567</li>
//                 <li>123 Main St, City</li>
//               </ul>
//             </div>
//           </div>
//           <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
//             <p>&copy; 2024 Spirits Store. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

















import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingCart, X, ChevronDown } from 'lucide-react';
import { categories } from '../data/mockData';
import { useStore } from '../store/useStore';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const cart = useStore((state) => state.cart);

  // Count the number of unique items in the cart (based on their IDs)
  const cartItemCount = new Set(cart.map((item) => item.id)).size;

  const location = useLocation();

  // Check if the current route is a category page (using the category path)
  const isCategoryPage = location.pathname.includes('');

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="text-2xl font-bold">
            Spirits
          </Link>

          <Link 
            to="/cart" 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Hamburger Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4"
            >
              <X className="h-6 w-6" />
            </button>
            <nav className="mt-8">
              <Link
                to="/"
                className="block py-2 hover:bg-gray-50 rounded px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <button
                className="w-full text-left py-2 hover:bg-gray-50 rounded px-4 flex items-center justify-between"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                Categories
                <ChevronDown className={`h-5 w-5 transform transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCategoryOpen && (
                <div className="ml-4 space-y-1">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.id}`}
                      className="block py-2 hover:bg-gray-50 rounded px-4 text-gray-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
              <Link
                to="/cart"
                className="block py-2 hover:bg-gray-50 rounded px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart
              </Link>
              <Link
                to="/about"
                className="block py-2 hover:bg-gray-50 rounded px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <main className="flex-1 pt-16 md:pt-16">{children}</main>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-white mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Social</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>info@example.com</li>
                <li>(555) 123-4567</li>
                <li>123 Main St, City</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 Spirits Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};