import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

function Checkout() {

  const [cart,setCart] = useState([]);
  const [orderPlaced,setOrderPlaced] = useState(false);

  useEffect(()=>{

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

  },[])

  const total = cart.reduce((sum,item)=> sum + item.price ,0);

  const placeOrder = ()=>{

    setTimeout(()=>{

      localStorage.removeItem("cart");
      setOrderPlaced(true);

    },700)

  }


  /* SUCCESS SCREEN */

  if(orderPlaced){

    return(

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        <motion.div

          initial={{scale:0}}
          animate={{scale:1}}
          transition={{type:"spring", stiffness:120}}

          className="text-center"

        >

          <motion.div

            initial={{scale:0}}
            animate={{scale:1.3}}
            transition={{delay:0.2}}

            className="text-green-400 text-8xl mb-6"

          >

            ✔

          </motion.div>

          <h1 className="text-4xl font-bold mb-4">
            Order Placed Successfully
          </h1>

          <p className="text-gray-400 mb-10">
            Your order will be delivered soon
          </p>

          <Link
            to="/"
            className="bg-white text-black px-8 py-3 rounded-full font-semibold"
          >
            Back to Home
          </Link>

        </motion.div>

      </div>

    )

  }

  return (

    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Glow Background */}

      <div className="absolute w-[500px] h-[500px] bg-purple-600 blur-[160px] opacity-30 -top-40 -left-40"></div>
      <div className="absolute w-[500px] h-[500px] bg-blue-600 blur-[160px] opacity-30 bottom-0 right-0"></div>


      {/* NAVBAR */}

      <nav className="fixed top-6 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-white/10 border border-white/20 px-10 py-4 rounded-full flex gap-12 items-center shadow-xl z-50">

        <h1 className="text-xl font-bold tracking-wide">
          CodeAlpha Store
        </h1>

        <Link to="/" className="hover:text-blue-400 transition">
          Home
        </Link>

        <Link to="/products" className="hover:text-blue-400 transition">
          Products
        </Link>

        <Link to="/cart" className="hover:text-blue-400 transition">
          Cart
        </Link>

      </nav>


      {/* PAGE CONTENT */}

      <div className="pt-40 px-20 pb-32">

        <h1 className="text-4xl font-bold mb-16">
          Checkout
        </h1>

        <div className="grid grid-cols-2 gap-16">


          {/* DELIVERY FORM */}

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10">

            <h2 className="text-2xl font-semibold mb-8">
              Delivery Information
            </h2>

            <div className="space-y-6">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-white/10 border border-white/20 px-5 py-3 rounded-xl outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/10 border border-white/20 px-5 py-3 rounded-xl outline-none"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full bg-white/10 border border-white/20 px-5 py-3 rounded-xl outline-none"
              />

              <input
                type="text"
                placeholder="City"
                className="w-full bg-white/10 border border-white/20 px-5 py-3 rounded-xl outline-none"
              />

              <input
                type="text"
                placeholder="Address"
                className="w-full bg-white/10 border border-white/20 px-5 py-3 rounded-xl outline-none"
              />

            </div>

          </div>


          {/* ORDER SUMMARY */}

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 h-fit">

            <h2 className="text-2xl font-semibold mb-8">
              Order Summary
            </h2>

            <div className="space-y-6">

              {cart.map((item,index)=>(

                <div
                  key={index}
                  className="flex items-center justify-between gap-4"
                >

                  <div className="flex items-center gap-4">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />

                    <span>
                      {item.name}
                    </span>

                  </div>

                  <span>
                    ₹{item.price}
                  </span>

                </div>

              ))}

            </div>


            <div className="border-t border-white/20 mt-8 pt-6 flex justify-between text-xl font-bold">

              <span>Total</span>

              <span>₹{total}</span>

            </div>


            <button
              onClick={placeOrder}
              className="mt-8 w-full bg-white text-black py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              Place Order
            </button>

            <Link
              to="/cart"
              className="block text-center mt-6 text-gray-400 hover:text-white"
            >
              Back to Cart
            </Link>

          </div>

        </div>

      </div>
        <Footer />
    </div>

  )

}

export default Checkout;