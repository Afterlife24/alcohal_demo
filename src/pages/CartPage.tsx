// import React, { useState, useEffect } from "react";
// import { useStore } from "../store/useStore";
// import OtpVerification from "./OtpVerification"; // Import the OTP component
// import "./OtpVerification.css";

// interface Coordinates {
//   latitude: number;
//   longitude: number;
// }

// interface ShippingInfo {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   zipCode: string;
// }

// export const CartPage: React.FC = () => {
//   const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
//   const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     zipCode: "",
//   });
//   const [showOtpVerification, setShowOtpVerification] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const { cart, removeFromCart, updateQuantity } = useStore();
//   const [deliveryMessageColor, setDeliveryMessageColor] = useState<string>("green");
//   const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
//   const [orderHistory, setOrderHistory] = useState<any[]>([]);

//   const total = cart.reduce(
//     (sum, item) => sum + item.price * item.cartQuantity,
//     0
//   );

//   const [deliveryMessage, setDeliveryMessage] = useState<string | null>(null);
//   const [isDeliveryAvailable, setIsDeliveryAvailable] = useState<boolean>(false);

//   // Fixed location (17.4703923, 78.3405134)
//   const deliveryLocation = {
//     latitude: 17.4704259,
//     longitude: 78.3405989,
//   };

//   // Haversine formula to calculate distance between two coordinates in kilometers
//   const haversineDistance = (
//     lat1: number,
//     lon1: number,
//     lat2: number,
//     lon2: number
//   ): number => {
//     const toRad = (deg: number) => deg * (Math.PI / 180);

//     const R = 6371; // Earth's radius in kilometers
//     const dLat = toRad(lat2 - lat1);
//     const dLon = toRad(lon2 - lon1);

//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(toRad(lat1)) *
//         Math.cos(toRad(lat2)) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);

//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c; // Distance in kilometers
//   };

//   const fetchDeviceLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setCoordinates({ latitude, longitude });

//           // Calculate the distance to the fixed location
//           const distance = haversineDistance(
//             latitude,
//             longitude,
//             deliveryLocation.latitude,
//             deliveryLocation.longitude
//           );

//           if (distance <= 5000) {
//             setDeliveryMessage("Orders can be delivered to your location.");
//             setDeliveryMessageColor("green");
//             setIsDeliveryAvailable(true);
//           } else {
//             setDeliveryMessage("Orders cannot be delivered to your location.");
//             setDeliveryMessageColor("red");
//             setIsDeliveryAvailable(false);
//           }
//           setIsMessageVisible(true);

//           setTimeout(() => {
//             setIsMessageVisible(false);
//           }, 4000);

//           console.log("Coordinates:", latitude, longitude);
//           console.log("Distance:", distance, "km");
//         },
//         (error) => {
//           if (error.code === error.PERMISSION_DENIED) {
//             alert("Please allow location access to fetch the coordinates.");
//           } else {
//             alert("Error fetching location.");
//           }
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   const handleOtpVerificationSuccess = () => {
//     setIsOtpVerified(true);
//     setShowOtpVerification(false);
//     handleSubmit(); // Place the order after OTP verification
//   };

//   const handlePlaceOrderClick = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Define allowed cities (in lowercase)
//     const allowedCities = ["tirupati", "chittoor", "renigunta"];

//     // Convert the entered city to lowercase and check if it is in the allowed cities list
//     if (!allowedCities.includes(shippingInfo.city.toLowerCase())) {
//       alert("We can only deliver to Tirupati, Chittoor, and Renigunta.");
//       return; // Stop further actions if the city is not allowed
//     }

//     // Check if the email is valid
//     if (!shippingInfo.email) {
//       alert("Please enter a valid email address before placing the order.");
//       return;
//     }

//     setShowOtpVerification(true); // Show OTP verification modal
//   };

// const handleSubmit = async () => {
//   // Define allowed cities
//   const allowedCities = ["tirupati", "chittoor", "renigunta"];

//   // Check if the entered city is in the allowed cities list
//   if (!allowedCities.includes(shippingInfo.city.toLowerCase())) {
//     alert("We can only deliver to Tirupati, Chittoor, and Renigunta.");
//     return; // Stop order placement if city is not allowed
//   }

//   try {
//     // Calculate the total price for the order
//     const totalPrice = cart.reduce(
//       (sum, item) => sum + item.price * item.cartQuantity,
//       0
//     );

//     const data = {
//       cart: cart.map((item) => ({
//         id: item.id, // Include the item ID
//         name: item.name,
//         cartQuantity: item.cartQuantity,
//         price: item.price,
//         imageUrl: item.imageUrl, // Include the image URL
//       })),
//       shippingInfo: {
//         name: shippingInfo.name,
//         email: shippingInfo.email,
//         phone: shippingInfo.phone,
//         address: shippingInfo.address,
//         zipCode: shippingInfo.zipCode,
//       },
//       location: coordinates
//         ? `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`
//         : "",
//       totalPrice: totalPrice, // Include the total price in the data
//     };
//     console.log("Order Data:", data);

//     const response = await fetch("https://dev-server.gofastapi.com/sendOrders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to send order data");
//     }

//     const result = await response.json();
//     console.log("Order submitted successfully:", result);

//     // Store the order history in session storage
//     const orderHistory = JSON.parse(sessionStorage.getItem("orderHistory") || "[]");
//     orderHistory.push({
//       items: cart.map((item) => ({
//         id: item.id,
//         name: item.name,
//         cartQuantity: item.cartQuantity,
//         price: item.price,
//         imageUrl: item.imageUrl,
//       })),
//       totalPrice: totalPrice, // Include the total price
//       date: new Date().toISOString(),
//     });
//     sessionStorage.setItem("orderHistory", JSON.stringify(orderHistory));

//     // Update the order history state
//     setOrderHistory(orderHistory);

//     // Clear the cart
//     sessionStorage.removeItem("cart");
//     useStore.setState({ cart: [] });

//     setOrderPlaced(true);
//     alert("Order successfully placed!");
//   } catch (error) {
//     console.error("Error submitting order:", error);
//     alert("Failed to place order. Please try again later.");
//   }
// };

//   // Update address field with city after selection
//   const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedCity = e.target.value;
//     setShippingInfo({
//       ...shippingInfo,
//       city: selectedCity,
//       address: `${shippingInfo.address}, ${selectedCity}`, // Append the city to address
//     });
//   };

//   // Initialize order history from session storage
//   useEffect(() => {
//     const storedOrderHistory = sessionStorage.getItem("orderHistory");
//     if (storedOrderHistory) {
//       setOrderHistory(JSON.parse(storedOrderHistory));
//     }
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

//       {cart.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-8">
//           {/* Cart Items and Order Summary */}
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

//           {/* Shipping Information Form */}
//           <div className="bg-white rounded-lg shadow-md p-4">
//             <h1 className="text-red-600 text-lg mb-5">
//               Please note: Orders will be delivered only within certain areas.
//             </h1>
//             <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
//             <form onSubmit={handlePlaceOrderClick}>
//               <button
//                 type="button"
//                 onClick={fetchDeviceLocation}
//                 className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
//               >
//                 Check Delivery Availability
//               </button>
//               <div className="space-y-4 mt-6">
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
//                       setShippingInfo({
//                         ...shippingInfo,
//                         email: e.target.value,
//                       })
//                     }
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     required
//                     value={shippingInfo.phone}
//                     onChange={(e) =>
//                       setShippingInfo({
//                         ...shippingInfo,
//                         phone: e.target.value,
//                       })
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
//                   <select
//                     required
//                     value={shippingInfo.city}
//                     onChange={handleCityChange}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   >
//                     <option value="">Select a city</option>
//                     <option value="tirupati">Tirupati</option>
//                     <option value="chittoor">Chittoor</option>
//                     <option value="renigunta">Renigunta</option>
//                   </select>
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
//                 disabled={!isDeliveryAvailable}
//                 className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Place Order
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {deliveryMessage && isMessageVisible && (
//         <div
//           style={{
//             position: "fixed",
//             top: "10px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             backgroundColor: deliveryMessageColor,
//             color: "white",
//             padding: "10px 20px",
//             borderRadius: "5px",
//             fontWeight: "bold",
//             zIndex: 1000,
//           }}
//         >
//           {deliveryMessage}
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

//       {/* Order History Section */}
//       {/* Order History Section */}
// <div className="mt-8">
//   <h2 className="text-xl font-bold mb-4">Order History</h2>
//   {orderHistory && orderHistory.length === 0 ? (
//     <p>No orders placed yet.</p>
//   ) : (
//     orderHistory.map((order, index) => (
//       <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
//         <h3 className="font-semibold">
//           Order placed on: {new Date(order.date).toLocaleString()}
//         </h3>
//         <ul className="mt-2">
//           {order.items.map((item: any) => (
//             <li key={item.id} className="flex justify-between items-center">
//               <div className="flex items-center">
//                 <img
//                   src={item.imageUrl}
//                   alt={item.name}
//                   className="w-16 h-16 object-cover rounded mr-4"
//                 />
//                 <span>{item.name}</span>
//               </div>
//               {/* Safely handle undefined price */}
//               <span>
//                 {item.cartQuantity} x $
//                 {(item.price || 0).toFixed(2)} {/* Add fallback for price */}
//               </span>
//             </li>
//           ))}
//         </ul>
//         <div className="mt-4 text-right font-bold">
//           {/* Safely handle undefined totalPrice */}
//           Total: ${(order.totalPrice || 0).toFixed(2)}
//         </div>
//       </div>
//     ))
//   )}
// </div>
//     </div>
//   );
// };





























//perfectly working
import React, { useState, useEffect } from "react";
import { useStore } from "../store/useStore";
import OtpVerification from "./OtpVerification"; // Import the OTP component
import "./OtpVerification.css";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const CartPage: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { cart, removeFromCart, updateQuantity } = useStore();
  const [deliveryMessageColor, setDeliveryMessageColor] = useState<string>("green");
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [isDeliveryChecked, setIsDeliveryChecked] = useState<boolean>(false); // Track if delivery availability is checked

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.cartQuantity,
    0
  );

  const [deliveryMessage, setDeliveryMessage] = useState<string | null>(null);
  const [isDeliveryAvailable, setIsDeliveryAvailable] = useState<boolean>(false);

  // Fixed location (17.4703923, 78.3405134)
  const deliveryLocation = {
    latitude: 17.4704259,
    longitude: 78.3405989,
  };

  // Haversine formula to calculate distance between two coordinates in kilometers
  const haversineDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const toRad = (deg: number) => deg * (Math.PI / 180);

    const R = 6371; // Earth's radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
  };

  const fetchDeviceLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });

          // Calculate the distance to the fixed location
          const distance = haversineDistance(
            latitude,
            longitude,
            deliveryLocation.latitude,
            deliveryLocation.longitude
          );

          if (distance <= 5000) {
            setDeliveryMessage("Orders can be delivered to your location.");
            setDeliveryMessageColor("green");
            setIsDeliveryAvailable(true);
          } else {
            setDeliveryMessage("Orders cannot be delivered to your location.");
            setDeliveryMessageColor("red");
            setIsDeliveryAvailable(false);
          }
          setIsMessageVisible(true);
          setIsDeliveryChecked(true); // Enable form fields after checking delivery availability

          setTimeout(() => {
            setIsMessageVisible(false);
          }, 4000);

          console.log("Coordinates:", latitude, longitude);
          console.log("Distance:", distance, "km");
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            alert("Please allow location access to fetch the coordinates.");
          } else {
            alert("Error fetching location.");
          }
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleOtpVerificationSuccess = () => {
    setIsOtpVerified(true);
    setShowOtpVerification(false);
    handleSubmit(); // Place the order after OTP verification
  };

  const handlePlaceOrderClick = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the email is valid
    if (!shippingInfo.email) {
      alert("Please enter a valid email address before placing the order.");
      return;
    }

    setShowOtpVerification(true); // Show OTP verification modal
  };

  const handleSubmit = async () => {
    try {
      // Calculate the total price for the order
      const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.cartQuantity,
        0
      );

      const data = {
        cart: cart.map((item) => ({
          id: item.id, // Include the item ID
          name: item.name,
          cartQuantity: item.cartQuantity,
          price: item.price,
          imageUrl: item.imageUrl, // Include the image URL
        })),
        shippingInfo: {
          name: shippingInfo.name,
          email: shippingInfo.email,
          phone: shippingInfo.phone,
          address: shippingInfo.address,
        },
        location: coordinates
          ? `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`
          : "",
        totalPrice: totalPrice, // Include the total price in the data
      };
      console.log("Order Data:", data);

      const response = await fetch("https://dev-server.gofastapi.com/sendOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send order data");
      }

      const result = await response.json();
      console.log("Order submitted successfully:", result);

      // Store the order history in session storage
      const orderHistory = JSON.parse(sessionStorage.getItem("orderHistory") || "[]");
      orderHistory.push({
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          cartQuantity: item.cartQuantity,
          price: item.price,
          imageUrl: item.imageUrl,
        })),
        totalPrice: totalPrice, // Include the total price
        date: new Date().toISOString(),
      });
      sessionStorage.setItem("orderHistory", JSON.stringify(orderHistory));

      // Update the order history state
      setOrderHistory(orderHistory);

      // Clear the cart
      sessionStorage.removeItem("cart");
      useStore.setState({ cart: [] });

      setOrderPlaced(true);
      alert("Order successfully placed!");
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to place order. Please try again later.");
    }
  };

  // Initialize order history from session storage
  useEffect(() => {
    const storedOrderHistory = sessionStorage.getItem("orderHistory");
    if (storedOrderHistory) {
      setOrderHistory(JSON.parse(storedOrderHistory));
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Cart Items and Order Summary */}
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
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Information Form */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h1 className="text-red-600 text-lg mb-5">
              Please note: Orders will be delivered only within certain areas.
            </h1>
            <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
            <form onSubmit={handlePlaceOrderClick}>
              <button
                type="button"
                onClick={fetchDeviceLocation}
                className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Check Delivery Availability
              </button>
              <div
                className={`space-y-4 mt-6 ${!isDeliveryChecked ? "opacity-50 pointer-events-none" : ""}`}
              >
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
                    disabled={!isDeliveryChecked}
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
                      setShippingInfo({
                        ...shippingInfo,
                        email: e.target.value,
                      })
                    }
                    disabled={!isDeliveryChecked}
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
                      setShippingInfo({
                        ...shippingInfo,
                        phone: e.target.value,
                      })
                    }
                    disabled={!isDeliveryChecked}
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
                    disabled={!isDeliveryChecked}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={!isDeliveryAvailable || !isDeliveryChecked}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}

      {deliveryMessage && isMessageVisible && (
        <div
          style={{
            position: "fixed",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: deliveryMessageColor,
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            fontWeight: "bold",
            zIndex: 1000,
          }}
        >
          {deliveryMessage}
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

      {/* Order History Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Order History</h2>
        {orderHistory && orderHistory.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          orderHistory.map((order, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h3 className="font-semibold">
                Order placed on: {new Date(order.date).toLocaleString()}
              </h3>
              <ul className="mt-2">
                {order.items.map((item: any) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <span>{item.name}</span>
                    </div>
                    <span>
                      {item.cartQuantity} x ${(item.price || 0).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-right font-bold">
                Total: ${(order.totalPrice || 0).toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};







