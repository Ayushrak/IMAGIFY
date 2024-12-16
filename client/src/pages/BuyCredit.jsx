import React, { useContext } from 'react';
import { assets, plans } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const BuyCredit = () => {
  const { user, backendUrl, loadCreditsData, token, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const initPay = async (order) => {
    if (!window.Razorpay) {
      console.error("Razorpay script not loaded");
      toast.error("Razorpay script not loaded");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,  // Ensure the key is correct
      amount: order.amount, // Amount in the smallest currency unit (e.g., paise)
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        // try {
          console.log("Razorpay response:", response);

    //       // Send the payment response to your backend to verify the payment
    //       const data = await axios.post(backendUrl + "/api/user/verify-razor", response, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       });

    //       console.log("Payment verification response:", data);

    //       if (data.data.success) {
    //         loadCreditsData();
    //         navigate("/");
    //         toast.success("Credit Added");
    //       } else {
    //         console.error("Payment verification failed:", data.data);
    //         toast.error("Payment verification failed");
    //       }
    //     } catch (error) {
    //       console.error("Error during payment verification:", error);
    //       toast.error(error.message);
    //     }
    //   },
    //   prefill: {
    //     name: user?.name || 'Guest',
    //     email: user?.email || '',
    //     contact: user?.phone || '',
    //   },
    //   theme: {
    //     color: "#3399cc",
       }
     };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }

      // Step 1: Request the backend to create the Razorpay order
      const {data} = await axios.post(backendUrl + "/api/user/pay-razor", { planId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Backend order creation response:", data);

      if (data.success) {
        // Step 2: If order creation is successful, initialize Razorpay payment
        initPay(data.order);
      } else {
        toast.error("Failed to create order.");
      }
    } catch (error) {
      console.error("Error during payment request:", error);
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-14 mb-10"
    >
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">Our Plans</button>
      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">Choose the plan</h1>

      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, index) => (
          <div
            key={index}
            className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
          >
            <img width={40} src={assets.logo_icon} alt="" />
            <p className="mt-3 mb-1 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${item.price}</span>/{item.credits} credits
            </p>
            <button
              onClick={() => paymentRazorpay(item.id)}
              className="w-full bg-gray-800 text-white mt-8 text-sm rounded-sm py-2.5 min-w-52"
            >
              {user ? "Purchase" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
