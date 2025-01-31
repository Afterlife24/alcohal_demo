// import React, { useState } from 'react';
// import { useStore } from '../store/useStore';
// import OtpVerification from './OtpVerification'; // Import the OTP component

// interface ShippingInfo {
//   name: string;
//   email: string;
//   address: string;
//   city: string;
//   zipCode: string;
// }

// export const CartPage: React.FC = () => {
//   const { cart, removeFromCart, updateQuantity } = useStore();
//   const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
//     name: '',
//     email: '',
//     address: '',
//     city: '',
//     zipCode: '',
//   });
//   const [showOtpVerification, setShowOtpVerification] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [orderPlaced, setOrderPlaced] = useState(false);

//   const total = cart.reduce(
//     (sum, item) => sum + item.price * item.cartQuantity,
//     0
//   );

//   const handleOtpVerificationSuccess = () => {
//     setIsOtpVerified(true);
//     setShowOtpVerification(false);
//     handleSubmit(); // Place the order after OTP verification
//   };

//   const handlePlaceOrderClick = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!shippingInfo.email) {
//       alert('Please enter a valid email address before placing the order.');
//       return;
//     }
//     setShowOtpVerification(true);
//   };


//   const handleSubmit = async () => {
//     try {
//       const data = {
//         cart: cart.map((item) => ({
//           name: item.name,
//           cartQuantity: item.cartQuantity,
//         })),
//         shippingInfo: {
//           name: shippingInfo.name,
//           address: shippingInfo.address,
//           zipCode: shippingInfo.zipCode,
//         },
//       };
  
//       const response = await fetch('http://localhost:5000/sendOrders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to send order data');
//       }
  
//       const result = await response.json();
//       console.log('Order submitted successfully:', result);
  
//       setOrderPlaced(true);
//       alert('Order successfully placed!');
//     } catch (error) {
//       console.error('Error submitting order:', error);
//       alert('Failed to place order. Please try again later.');
//     }
//   };
  
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

//       {cart.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-8">
//           <div>
//             {cart.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-white rounded-lg shadow-md p-4 mb-4"
//               >
//                 <div className="flex items-center">
//                   <img
//                     src={item.imageUrl}
//                     alt={item.name}
//                     className="w-20 h-20 object-cover rounded"
//                   />
//                   <div className="ml-4 flex-1">
//                     <h2 className="font-semibold">{item.name}</h2>
//                     <p className="text-blue-600">${item.price}</p>
//                     <div className="flex items-center mt-2">
//                       <input
//                         type="number"
//                         min="1"
//                         max={item.quantity}
//                         value={item.cartQuantity}
//                         onChange={(e) =>
//                           updateQuantity(item.id, parseInt(e.target.value))
//                         }
//                         className="w-20 border rounded px-2 py-1"
//                       />
//                       <button
//                         onClick={() => removeFromCart(item.id)}
//                         className="ml-4 text-red-600 hover:text-red-700"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <div className="bg-white rounded-lg shadow-md p-4">
//               <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//               <div className="flex justify-between mb-2">
//                 <span>Subtotal:</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total:</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-md p-4">
//             <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
//             <form onSubmit={handlePlaceOrderClick}>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={shippingInfo.name}
//                     onChange={(e) =>
//                       setShippingInfo({ ...shippingInfo, name: e.target.value })
//                     }
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     required
//                     value={shippingInfo.email}
//                     onChange={(e) =>
//                       setShippingInfo({ ...shippingInfo, email: e.target.value })
//                     }
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={shippingInfo.address}
//                     onChange={(e) =>
//                       setShippingInfo({
//                         ...shippingInfo,
//                         address: e.target.value,
//                       })
//                     }
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     City
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={shippingInfo.city}
//                     onChange={(e) =>
//                       setShippingInfo({ ...shippingInfo, city: e.target.value })
//                     }
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     ZIP Code
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={shippingInfo.zipCode}
//                     onChange={(e) =>
//                       setShippingInfo({
//                         ...shippingInfo,
//                         zipCode: e.target.value,
//                       })
//                     }
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Place Order
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {showOtpVerification && (
//         <OtpVerification
//           onVerify={handleOtpVerificationSuccess}
//           onCancel={() => setShowOtpVerification(false)}
//           onEmailUpdate={(email) => setShippingInfo({ ...shippingInfo, email })}
//         />
//       )}
//     </div>
//   );
// };

// ---------------------------------------------------------------------------------------------------------------------------

// import React, { useState } from 'react';
// import { useStore } from '../store/useStore';
// import OtpVerification from './OtpVerification'; // Import the OTP component
// import './OtpVerification.css';


// interface ShippingInfo {
//   name: string;
//   email: string;
//   address: string;
//   city: string;
//   zipCode: string;
// }

// export const CartPage: React.FC = () => {
//   const { cart, removeFromCart, updateQuantity } = useStore();
//   const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
//     name: '',
//     email: '',
//     address: '',
//     city: '',
//     zipCode: '',
//   });
//   const [showOtpVerification, setShowOtpVerification] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [orderPlaced, setOrderPlaced] = useState(false);

//   const total = cart.reduce(
//     (sum, item) => sum + item.price * item.cartQuantity,
//     0
//   );

//   const handleOtpVerificationSuccess = () => {
//     setIsOtpVerified(true);
//     setShowOtpVerification(false);
//     handleSubmit(); // Place the order after OTP verification
//   };

//   const handlePlaceOrderClick = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!shippingInfo.email) {
//       alert('Please enter a valid email address before placing the order.');
//       return;
//     }
//     setShowOtpVerification(true);
//   };

//   const handleSubmit = () => {
//     // Handle order submission
//     setOrderPlaced(true);
//     console.log('Order placed:', { cart, shippingInfo, total });
//     alert('Order successfully placed!');
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 relative">
//       <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

//       {cart.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-8">
//           <div>
//             {cart.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-white rounded-lg shadow-md p-4 mb-4"
//               >
//                 <div className="flex items-center">
//                   <img
//                     src={item.imageUrl}
//                     alt={item.name}
//                     className="w-20 h-20 object-cover rounded"
//                   />
//                   <div className="ml-4 flex-1">
//                     <h2 className="font-semibold">{item.name}</h2>
//                     <p className="text-blue-600">${item.price}</p>
//                     <div className="flex items-center mt-2">
//                       <input
//                         type="number"
//                         min="1"
//                         max={item.quantity}
//                         value={item.cartQuantity}
//                         onChange={(e) =>
//                           updateQuantity(item.id, parseInt(e.target.value))
//                         }
//                         className="w-20 border rounded px-2 py-1"
//                       />
//                       <button
//                         onClick={() => removeFromCart(item.id)}
//                         className="ml-4 text-red-600 hover:text-red-700"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <div className="bg-white rounded-lg shadow-md p-4">
//               <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//               <div className="flex justify-between mb-2">
//                 <span>Subtotal:</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total:</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-md p-4">
//             <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
//             <form onSubmit={handlePlaceOrderClick}>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={shippingInfo.name}
//                     onChange={(e) =>
//                       setShippingInfo({ ...shippingInfo, name: e.target.value })
//                     }
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     required
//                     value={shippingInfo.email}
//                     onChange={(e) =>
//                       setShippingInfo({ ...shippingInfo, email: e.target.value })
//                     }
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={shippingInfo.address}
//                     onChange={(e) =>
//                       setShippingInfo({
//                         ...shippingInfo,
//                         address: e.target.value,
//                       })
//                     }
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     City
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={shippingInfo.city}
//                     onChange={(e) =>
//                       setShippingInfo({ ...shippingInfo, city: e.target.value })
//                     }
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     ZIP Code
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={shippingInfo.zipCode}
//                     onChange={(e) =>
//                       setShippingInfo({
//                         ...shippingInfo,
//                         zipCode: e.target.value,
//                       })
//                     }
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Place Order
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* OTP Verification Modal */}
//       {showOtpVerification && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <OtpVerification
//               onVerify={handleOtpVerificationSuccess}
//               onCancel={() => setShowOtpVerification(false)}
//               onEmailUpdate={(email) =>
//                 setShippingInfo({ ...shippingInfo, email })
//               }
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };






















// ---------------------------------------------------------------------------------------------------------------------------



// import React, { useState } from 'react';
// import { useStore } from '../store/useStore';
// import OtpVerification from './OtpVerification'; // Import the OTP component
// import './OtpVerification.css';

// interface ShippingInfo {
//   name: string;
//   email: string;
//   address: string;
//   city: string;
//   zipCode: string;
// }

// export const CartPage: React.FC = () => {
//   const { cart, removeFromCart, updateQuantity } = useStore();
//   const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
//     name: '',
//     email: '',
//     address: '',
//     city: '',
//     zipCode: '',
//   });
//   const [showOtpVerification, setShowOtpVerification] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [orderPlaced, setOrderPlaced] = useState(false);

//   const total = cart.reduce(
//     (sum, item) => sum + item.price * item.cartQuantity,
//     0
//   );

//   const handleOtpVerificationSuccess = () => {
//     setIsOtpVerified(true);
//     setShowOtpVerification(false);
//     handleSubmit(); // Place the order after OTP verification
//   };

//   const handlePlaceOrderClick = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!shippingInfo.email) {
//       alert('Please enter a valid email address before placing the order.');
//       return;
//     }
//     setShowOtpVerification(true);
//   };

//   const handleSubmit = async () => {
//     try {
//       const data = {
//         cart: cart.map((item) => ({
//           name: item.name,
//           cartQuantity: item.cartQuantity,
//         })),
//         shippingInfo: {
//           name: shippingInfo.name,
//           address: shippingInfo.address,
//           zipCode: shippingInfo.zipCode,
//         },
//       };

//       const response = await fetch('http://localhost:5000/sendOrders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to send order data');
//       }

//       const result = await response.json();
//       console.log('Order submitted successfully:', result);

//       setOrderPlaced(true);
//       alert('Order successfully placed!');
//     } catch (error) {
//       console.error('Error submitting order:', error);
//       alert('Failed to place order. Please try again later.');
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

//       {cart.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-8">
//           <div>
//             {cart.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-white rounded-lg shadow-md p-4 mb-4"
//               >
//                 <div className="flex items-center">
//                   <img
//                     src={item.imageUrl}
//                     alt={item.name}
//                     className="w-20 h-20 object-cover rounded"
//                   />
//                   <div className="ml-4 flex-1">
//                     <h2 className="font-semibold">{item.name}</h2>
//                     <p className="text-blue-600">${item.price}</p>
//                     <div className="flex items-center mt-2">
//                       <input
//                         type="number"
//                         min="1"
//                         max={item.quantity}
//                         value={item.cartQuantity}
//                         onChange={(e) =>
//                           updateQuantity(item.id, parseInt(e.target.value))
//                         }
//                         className="w-20 border rounded px-2 py-1"
//                       />
//                       <button
//                         onClick={() => removeFromCart(item.id)}
//                         className="ml-4 text-red-600 hover:text-red-700"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <div className="bg-white rounded-lg shadow-md p-4">
//               <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//               <div className="flex justify-between mb-2">
//                 <span>Subtotal:</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total:</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-md p-4">
//             <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
//             <form onSubmit={handlePlaceOrderClick}>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={shippingInfo.name}
//                     onChange={(e) =>
//                       setShippingInfo({ ...shippingInfo, name: e.target.value })
//                     }
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     required
//                     value={shippingInfo.email}
//                     onChange={(e) =>
//                       setShippingInfo({ ...shippingInfo, email: e.target.value })
//                     }
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={shippingInfo.address}
//                     onChange={(e) =>
//                       setShippingInfo({
//                         ...shippingInfo,
//                         address: e.target.value,
//                       })
//                     }
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     City
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={shippingInfo.city}
//                     onChange={(e) =>
//                       setShippingInfo({ ...shippingInfo, city: e.target.value })
//                     }
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     ZIP Code
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={shippingInfo.zipCode}
//                     onChange={(e) =>
//                       setShippingInfo({
//                         ...shippingInfo,
//                         zipCode: e.target.value,
//                       })
//                     }
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Place Order
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {showOtpVerification && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <OtpVerification
//               onVerify={handleOtpVerificationSuccess}
//               onCancel={() => setShowOtpVerification(false)}
//               onEmailUpdate={(email) =>
//                 setShippingInfo({ ...shippingInfo, email })
//               }
//             />
//           </div>
//         </div>
//       )}

      
//     </div>
//   );
// };





// ----------------------------------------------------------
// -----------------------------------------

// import React, { useState } from 'react';
// import { useStore } from '../store/useStore';
// import OtpVerification from './OtpVerification'; // Import the OTP component
// import './OtpVerification.css';

// interface ShippingInfo {
//   name: string;
//   email: string;
//   phone: string;  // Added phone field
//   address: string;
//   city: string;
//   zipCode: string;
// }

// export const CartPage: React.FC = () => {
//   const { cart, removeFromCart, updateQuantity } = useStore();
//   const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
//     name: '',
//     email: '',
//     phone: '',  // Initialized phone
//     address: '',
//     city: '',
//     zipCode: '',
//   });
//   const [showOtpVerification, setShowOtpVerification] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [orderPlaced, setOrderPlaced] = useState(false);

//   const total = cart.reduce(
//     (sum, item) => sum + item.price * item.cartQuantity,
//     0
//   );

//   const handleOtpVerificationSuccess = () => {
//     setIsOtpVerified(true);
//     setShowOtpVerification(false);
//     handleSubmit(); // Place the order after OTP verification
//   };

//   const handlePlaceOrderClick = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!shippingInfo.email) {
//       alert('Please enter a valid email address before placing the order.');
//       return;
//     }
//     setShowOtpVerification(true); // Show OTP verification modal
//   };

//   const handleSubmit = async () => {
//     try {
//       const data = {
//         cart: cart.map((item) => ({
//           name: item.name,
//           cartQuantity: item.cartQuantity,
//         })),
//         shippingInfo: {
//           name: shippingInfo.name,
//           email: shippingInfo.email, // Include email in the request
//           phone:shippingInfo.phone,
//           address: shippingInfo.address,
//           zipCode: shippingInfo.zipCode,
//         },
//       };

//       const response = await fetch('http://localhost:5000/sendOrders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to send order data');
//       }

//       const result = await response.json();
//       console.log('Order submitted successfully:', result);

//       setOrderPlaced(true);
//       alert('Order successfully placed!');

//     } catch (error) {
//       console.error('Error submitting order:', error);
//       alert('Failed to place order. Please try again later.');
//     }
// };


//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

//       {cart.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-8">
//           <div>
//             {cart.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-white rounded-lg shadow-md p-4 mb-4"
//               >
//                 <div className="flex items-center">
//                   <img
//                     src={item.imageUrl}
//                     alt={item.name}
//                     className="w-20 h-20 object-cover rounded"
//                   />
//                   <div className="ml-4 flex-1">
//                     <h2 className="font-semibold">{item.name}</h2>
//                     <p className="text-blue-600">${item.price}</p>
//                     <div className="flex items-center mt-2">
//                       <input
//                         type="number"
//                         min="1"
//                         max={item.quantity}
//                         value={item.cartQuantity}
//                         onChange={(e) =>
//                           updateQuantity(item.id, parseInt(e.target.value))
//                         }
//                         className="w-20 border rounded px-2 py-1"
//                       />
//                       <button
//                         onClick={() => removeFromCart(item.id)}
//                         className="ml-4 text-red-600 hover:text-red-700"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <div className="bg-white rounded-lg shadow-md p-4">
//               <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//               <div className="flex justify-between mb-2">
//                 <span>Subtotal:</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total:</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>
//             </div>
//             </div>
            
            

//             <div className="bg-white rounded-lg shadow-md p-4">
//               <h1 className="text-red-600 text-lg mb-5">
//     Please note: Orders will be delivered only within certain areas.
//   </h1>
//             <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
//             <form onSubmit={handlePlaceOrderClick}>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={shippingInfo.name}
//                     onChange={(e) =>
//                       setShippingInfo({ ...shippingInfo, name: e.target.value })
//                     }
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     required
//                     value={shippingInfo.email}
//                     onChange={(e) =>
//                       setShippingInfo({ ...shippingInfo, email: e.target.value })
//                     }
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                   </div>
//                   <div>
//   <label className="block text-sm font-medium text-gray-700">
//     Phone Number
//   </label>
//   <input
//     type="tel"
//     required
//     value={shippingInfo.phone}
//     onChange={(e) =>
//       setShippingInfo({ ...shippingInfo, phone: e.target.value })
//     }
//     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//   />
// </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={shippingInfo.address}
//                     onChange={(e) =>
//                       setShippingInfo({
//                         ...shippingInfo,
//                         address: e.target.value,
//                       })
//                     }
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     City
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={shippingInfo.city}
//                     onChange={(e) =>
//                       setShippingInfo({ ...shippingInfo, city: e.target.value })
//                     }
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     ZIP Code
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={shippingInfo.zipCode}
//                     onChange={(e) =>
//                       setShippingInfo({
//                         ...shippingInfo,
//                         zipCode: e.target.value,
//                       })
//                     }
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Place Order
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {showOtpVerification && shippingInfo.email && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <OtpVerification
//               email={shippingInfo.email} // Pass the email directly
//               onVerify={handleOtpVerificationSuccess}
//               onCancel={() => setShowOtpVerification(false)}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };




import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import OtpVerification from './OtpVerification'; // Import the OTP component
import './OtpVerification.css';

interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.cartQuantity,
    0
  );

  const handleOtpVerificationSuccess = () => {
    setIsOtpVerified(true);
    setShowOtpVerification(false);
    handleSubmit(); // Place the order after OTP verification
  };

  const handlePlaceOrderClick = (e: React.FormEvent) => {
    e.preventDefault();

    // Define allowed cities (in lowercase)
    const allowedCities = ['tirupati', 'chittoor', 'renigunta'];

    // Convert the entered city to lowercase and check if it is in the allowed cities list
    if (!allowedCities.includes(shippingInfo.city.toLowerCase())) {
      alert('We can only deliver to Tirupati, Chittoor, and Renigunta.');
      return; // Stop further actions if the city is not allowed
    }

    // Check if the email is valid
    if (!shippingInfo.email) {
      alert('Please enter a valid email address before placing the order.');
      return;
    }

    setShowOtpVerification(true); // Show OTP verification modal
  };

  const handleSubmit = async () => {
    // Define allowed cities
    const allowedCities = ['tirupati', 'chittoor', 'renigunta'];

    // Check if the entered city is in the allowed cities list
    if (!allowedCities.includes(shippingInfo.city.toLowerCase())) {
      alert('We can only deliver to Tirupati, Chittoor, and Renigunta.');
      return; // Stop order placement if city is not allowed
    }

    try {
      const data = {
        cart: cart.map((item) => ({
          name: item.name,
          cartQuantity: item.cartQuantity,
        })),
        shippingInfo: {
          name: shippingInfo.name,
          email: shippingInfo.email,
          phone: shippingInfo.phone,
          address: shippingInfo.address,
          zipCode: shippingInfo.zipCode,
        },
      };

      const response = await fetch('http://localhost:5000/sendOrders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send order data');
      }

      const result = await response.json();
      console.log('Order submitted successfully:', result);

      setOrderPlaced(true);
      alert('Order successfully placed!');

    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to place order. Please try again later.');
    }
  };

  // Update address field with city after selection
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = e.target.value;
    setShippingInfo({
      ...shippingInfo,
      city: selectedCity,
      address: `${shippingInfo.address}, ${selectedCity}`, // Append the city to address
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 mb-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="ml-4 flex-1">
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-blue-600">${item.price}</p>
                    <div className="flex items-center mt-2">
                      <input
                        type="number"
                        min="1"
                        max={item.quantity}
                        value={item.cartQuantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="w-20 border rounded px-2 py-1"
                      />
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h1 className="text-red-600 text-lg mb-5">
              Please note: Orders will be delivered only within certain areas.
            </h1>
            <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
            <form onSubmit={handlePlaceOrderClick}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.name}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, name: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={shippingInfo.email}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, email: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={shippingInfo.phone}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, phone: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.address}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        address: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <select
                    required
                    value={shippingInfo.city}
                    onChange={handleCityChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select a city</option>
                    <option value="tirupati">Tirupati</option>
                    <option value="chittoor">Chittoor</option>
                    <option value="renigunta">Renigunta</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.zipCode}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        zipCode: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}

      {showOtpVerification && shippingInfo.email && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <OtpVerification
              email={shippingInfo.email} // Pass the email directly
              onVerify={handleOtpVerificationSuccess}
              onCancel={() => setShowOtpVerification(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
