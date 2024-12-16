import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transcationModel from "../models/transcationModel.js";


const registeredUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check for missing details
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing Details" });
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Email already registered" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save new user
        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "1h" });

        res.status(201).json({ success: true, token, user: { name: user.name } });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "1h" });

        res.status(200).json({ success: true, token, user: { name: user.name } });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const userCredits = async (req,res)=>{
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId);

        res.json({success:true,credits:user.creditBalance,user:{name:user.name}})
    } catch (error) {
        
    }
}

const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,

})


  
  // Payment Razorpay Controller
  const paymentRazorpay = async (req, res) => {
      try {
          const { userId, planId } = req.body;
          const userData = await userModel.findById(userId);
  
          // Ensure userId and planId are present
          if (!userId || !planId) {
              return res.json({
                  success: false,
                  message: "User ID and Plan ID are required",
              });
          }
  
  
          let credits, plan, amount, date;
  
          // Switch case for different plans
          switch (planId) {
              case "Basic":
                  plan = "Basic";
                  credits = 100;
                  amount = 10;
                  break;
              case "Advanced":
                  plan = "Advanced";
                  credits = 500;
                  amount = 50;
                  break;
              case "Business":
                  plan = "Business";
                  credits = 5000;
                  amount = 250;
                  break;
              default:
                  return res.json({
                      success: false,
                      message: "Plan not found",
                  });
          }
  
          // Store transaction data
          date = Date.now();
          const transactionData = {
              userId,
              plan,
              amount,
              credits,
              date,
          };
  
          const newTransaction = await transcationModel.create(transactionData);
  
          // Razorpay order creation options
          const options = {
              amount: amount * 100,  // Razorpay expects amount in paise
              currency: process.env.CURRENCY || 'INR',  // Default to INR if not set
              receipt: newTransaction._id,
          };
  
          // Create Razorpay order
          await razorpayInstance.orders.create(options, (error, order) => {
              if (error) {
                  console.log(error);
                  return res.json({ success: false, message: error.message });
              }
              console.log("Order created:", order);
              res.json({ success: true, order });
          });
      } catch (error) {
          console.log(error);
          res.json({ success: false, message: error.message });
      }
  };
  
  // Verify Payment Controller
  const verifyController = async (req, res) => {
      try {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
          // Check if required fields are present
          if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
              return res.json({ success: false, message: "Missing required payment information" });
          }
  
          // Fetch order details from Razorpay
          const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
  
          if (orderInfo.status === 'paid') {
              // Find transaction from receipt
              const transactionData = await transcationModel.findById(orderInfo.receipt);
  
              // Check if payment was already marked as successful
              if (transactionData.payment) {
                  return res.json({ success: false, message: "Payment already processed" });
              }
  
              // Verify payment on the backend (you can implement Razorpay's signature verification here)
              const userData = await userModel.findById(transactionData.userId);
              const creditBalance = userData.creditBalance + transactionData.credits;
  
              // Update the user credit balance
              await userModel.findByIdAndUpdate(userData._id, { creditBalance });
  
              // Mark transaction as paid
              await transcationModel.findByIdAndUpdate(transactionData._id, { payment: true });
  
              res.json({ success: true, message: "Credits Added" });
          } else {
              res.json({ success: false, message: "Payment failed" });
          }
  
      } catch (error) {
          console.log(error);
          res.json({ success: false, message: error.message });
      }
  };

export { registeredUser, loginUser, userCredits,paymentRazorpay ,verifyController};
