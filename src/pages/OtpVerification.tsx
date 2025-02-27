// // import React, { useState } from "react";

// // interface OtpVerificationProps {
// //   onVerify: () => void;
// //   onCancel: () => void;
// //   onEmailUpdate: (email: string) => void;
// // }

// // const OtpVerification: React.FC<OtpVerificationProps> = ({
// //   onVerify,
// //   onCancel,
// //   onEmailUpdate,
// // }) => {
// //   const [email, setEmail] = useState<string>("");
// //   const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
// //   const [loading, setLoading] = useState<boolean>(false);
// //   const [error, setError] = useState<string>("");
// //   const [success, setSuccess] = useState<boolean>(false);

// //   const regex = new RegExp("[a-zA-Z0-9]+@[a-z]+\\.[a-z]{2,3}");

// //   const sendOtp = async () => {
// //     if (!regex.test(email)) {
// //       setError("Invalid email address");
// //       return;
// //     }

// //     setLoading(true);
// //     setError("");
// //     try {
// //       const response = await fetch(
// //         "https://dev-server.gofastapi.com/sendotp",
// //         {
// //           method: "POST",
// //           body: JSON.stringify({ email }),
// //           headers: { "Content-Type": "application/json" },
// //         }
// //       );

// //       if (response.ok) {
// //         setSuccess(true);
// //         onEmailUpdate(email);
// //       } else {
// //         setError("Email not found");
// //       }
// //     } catch (err) {
// //       setError("Something went wrong. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const verifyOtp = async () => {
// //     const otpCheck = otp.join("");
// //     if (otpCheck.length !== 4) {
// //       setError("Please enter a valid OTP");
// //       return;
// //     }

// //     try {
// //       const response = await fetch(
// //         "https://dev-server.gofastapi.com/verify",
// //         {
// //           method: "POST",
// //           body: JSON.stringify({ email, otp: otpCheck }),
// //           headers: { "Content-Type": "application/json" },
// //         }
// //       );

// //       if (response.ok) {
// //         onVerify();
// //       } else {
// //         setError("Invalid OTP");
// //       }
// //     } catch (err) {
// //       setError("Verification failed. Please try again.");
// //     }
// //   };

// //   const handleOtpChange = (index: number, value: string) => {
// //     const newOtp = [...otp];

// //     if (value.length === 1) {
// //       newOtp[index] = value;
// //       setOtp(newOtp);

// //       if (index < 3) {
// //         const nextInput = document.querySelector<HTMLInputElement>(
// //           `.otp-input-${index + 1}`
// //         );
// //         nextInput?.focus();
// //       }
// //     } else if (value === "") {
// //       newOtp[index] = "";
// //       setOtp(newOtp);

// //       if (index > 0) {
// //         const prevInput = document.querySelector<HTMLInputElement>(
// //           `.otp-input-${index - 1}`
// //         );
// //         prevInput?.focus();
// //       }
// //     }
// //   };

// //   return (
// //     <div className="otp-verification-modal">
// //       <div className="otp-verification-content">
// //         <button className="close-button" onClick={onCancel}>
// //           &times;
// //         </button>
// //         <h3>Verify Your Identity</h3>
// //         <p>Please enter your email</p>

// //         <input
// //           type="email"
// //           className="form-control email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           placeholder="Enter your email address"
// //         />
// //         <button className="btn btn-primary" onClick={sendOtp} disabled={loading}>
// //           {loading ? "Sending OTP..." : "Send OTP"}
// //         </button>

// //         {success && (
// //           <div className="verification">
// //             <p className="success">
// //               An OTP has been sent to <strong>{email}</strong>.
// //             </p>
// //             <p>Please enter the OTP below:</p>
// //             <div className="otp-input-fields">
// //               {otp.map((digit, index) => (
// //                 <input
// //                   key={index}
// //                   type="text"
// //                   maxLength={1}
// //                   className={`otp-input-${index}`}
// //                   value={digit}
// //                   onChange={(e) => handleOtpChange(index, e.target.value)}
// //                   inputMode="numeric"
// //                 />
// //               ))}
// //             </div>
// //             <button className="btn btn-success" onClick={verifyOtp}>
// //               Verify OTP
// //             </button>
// //             <button className="btn btn-secondary" onClick={onCancel}>
// //               Cancel
// //             </button>
// //           </div>
// //         )}

// //         {error && <div className="error">{error}</div>}
// //       </div>
// //     </div>
// //   );
// // };

// // export default OtpVerification;


// import React, { useState } from "react";

// interface OtpVerificationProps {
//   onVerify: () => void;
//   onCancel: () => void;
//   onEmailUpdate: (email: string) => void;
// }

// const OtpVerification: React.FC<OtpVerificationProps> = ({
//   onVerify,
//   onCancel,
//   onEmailUpdate,
// }) => {
//   const [email, setEmail] = useState<string>("");
//   const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>("");
//   const [success, setSuccess] = useState<boolean>(false);

//   const regex = new RegExp("[a-zA-Z0-9]+@[a-z]+\\.[a-z]{2,3}");

//   const sendOtp = async () => {
//     if (!regex.test(email)) {
//       setError("Invalid email address");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     try {
//       const response = await fetch(
//         "https://dev-server.gofastapi.com/sendotp",
//         {
//           method: "POST",
//           body: JSON.stringify({ email }),
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       if (response.ok) {
//         setSuccess(true);
//         onEmailUpdate(email);
//       } else {
//         setError("Email not found");
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyOtp = async () => {
//     const otpCheck = otp.join("");
//     if (otpCheck.length !== 4) {
//       setError("Please enter a valid OTP");
//       return;
//     }

//     try {
//       const response = await fetch(
//         "https://dev-server.gofastapi.com/verify",
//         {
//           method: "POST",
//           body: JSON.stringify({ email, otp: otpCheck }),
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       if (response.ok) {
//         onVerify();
//       } else {
//         setError("Invalid OTP");
//       }
//     } catch (err) {
//       setError("Verification failed. Please try again.");
//     }
//   };

//   const handleOtpChange = (
//     index: number,
//     value: string,
//     event: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newOtp = [...otp];

//     if (
//       event instanceof KeyboardEvent &&
//       event.key === "Backspace" &&
//       newOtp[index] === ""
//     ) {
//       if (index > 0) {
//         const prevInput = document.querySelector<HTMLInputElement>(
//           `.otp-input-${index - 1}`
//         );
//         prevInput?.focus();
//       }
//     } else if (value.length === 1) {
//       newOtp[index] = value;
//       setOtp(newOtp);

//       if (index < 3) {
//         const nextInput = document.querySelector<HTMLInputElement>(
//           `.otp-input-${index + 1}`
//         );
//         nextInput?.focus();
//       }
//     } else {
//       newOtp[index] = value;
//       setOtp(newOtp);
//     }
//   };

//   return (
//     <div className="otp-verification-modal">
//       <div className="otp-verification-content">
//         <button className="close-button" onClick={onCancel}>
//           &times;
//         </button>
//         <h3>Verify Your Identity</h3>
//         <p>Please enter your email</p>

//         <input
//           type="email"
//           className="form-control email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email address"
//         />
//         <button className="btn btn-primary" onClick={sendOtp} disabled={loading}>
//           {loading ? "Sending OTP..." : "Send OTP"}
//         </button>

//         {success && (
//           <div className="verification">
//             <p className="success">
//               An OTP has been sent to <strong>{email}</strong>.
//             </p>
//             <p>Please enter the OTP below:</p>
//             <div className="otp-input-fields">
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   maxLength={1}
//                   className={`otp-input-${index}`}
//                   value={digit}
//                   onChange={(e) => handleOtpChange(index, e.target.value, e)}
//                   inputMode="numeric"
//                   onKeyDown={(e) => handleOtpChange(index, e.currentTarget.value, e)}
//                 />
//               ))}
//             </div>
//             <button className="btn btn-success" onClick={verifyOtp}>
//               Verify OTP
//             </button>
//             <button className="btn btn-secondary" onClick={onCancel}>
//               Cancel
//             </button>
//           </div>
//         )}

//         {error && <div className="error">{error}</div>}
//       </div>
//     </div>
//   );
// };

// export default OtpVerification;








import React, { useState } from "react";

interface OtpVerificationProps {
  email: string; // Accept email as prop
  onVerify: () => void;
  onCancel: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
  email,
  onVerify,
  onCancel,
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const sendOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://dev-server.gofastapi.com/sendotp",
        {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        setSuccess(true);
      } else {
        setError("Email not found");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    const otpCheck = otp.join("");
    if (otpCheck.length !== 4) {
      setError("Please enter a valid OTP");
      return;
    }

    try {
      const response = await fetch(
        "https://dev-server.gofastapi.com/verify",
        {
          method: "POST",
          body: JSON.stringify({ email, otp: otpCheck }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        onVerify();
      } else {
        setError("Invalid OTP");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    }
  };

  const handleOtpChange = (
  index: number,
  value: string,
  event: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>
) => {
  const newOtp = [...otp];

  if (
    event instanceof KeyboardEvent ||
    (event as React.KeyboardEvent<HTMLInputElement>).key === "Backspace"
  ) {
    if (value === "" && index > 0) {
      const prevInput = document.querySelector<HTMLInputElement>(`.otp-input-${index - 1}`);
      prevInput?.focus();
    }
  }

  if (value.length === 1 && /^[0-9]$/.test(value)) {
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 3) {
      const nextInput = document.querySelector<HTMLInputElement>(`.otp-input-${index + 1}`);
      nextInput?.focus();
    }
  } else if (value === "") {
    newOtp[index] = "";
    setOtp(newOtp);
  }
};


  return (
    <div className="otp-verification-modal">
      <div className="otp-verification-content">
        <button className="close-button" onClick={onCancel}>
          &times;
        </button>
        <h3>Verify Your Identity</h3>
        <p>An OTP has been sent to <strong>{email}</strong>.</p>

        {success ? (
          <>
            <p>Please enter the OTP below:</p>
            <div className="otp-input-fields">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className={`otp-input-${index}`}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value, e)}
                  inputMode="numeric"
                  onKeyDown={(e) => handleOtpChange(index, e.currentTarget.value, e)}
                />
              ))}
            </div>
            <button className="btn btn-success" onClick={verifyOtp}>
              Verify OTP
            </button>
            <button className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={sendOtp} disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        )}

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default OtpVerification;
