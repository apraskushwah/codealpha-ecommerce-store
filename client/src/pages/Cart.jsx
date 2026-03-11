import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQty = (index, delta) => {

    const updatedCart = [...cart];

    if (!updatedCart[index].qty) {
      updatedCart[index].qty = 1;
    }

    updatedCart[index].qty += delta;

    if (updatedCart[index].qty < 1) {
      updatedCart[index].qty = 1;
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);

  };

  const removeItem = (index) => {

    const updatedCart = [...cart];
    updatedCart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);

  };

  const total = cart.reduce((sum, item) => {
    const qty = item.qty || 1;
    return sum + item.price * qty;
  }, 0);

  return (

    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-20 pt-40 pb-32 overflow-hidden">

      {/* glow background */}

      <div className="absolute w-[400px] h-[400px] bg-purple-600 blur-[160px] opacity-20 -top-20 -left-20"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-600 blur-[160px] opacity-20 bottom-0 right-0"></div>


      <h1 className="text-5xl font-bold mb-10">
        Your Cart
      </h1>


      {/* SHIPPING BANNER */}

      <div className="bg-green-500/10 border border-green-400/20 text-green-300 px-6 py-4 rounded-xl mb-12">
        🚚 Free shipping on all orders
      </div>


      {cart.length === 0 && (

        <div className="text-center mt-40">

          <p className="text-gray-400 text-xl mb-8">
            Your cart is empty
          </p>

          <Link
            to="/products"
            className="bg-white text-black px-8 py-3 rounded-full font-semibold"
          >
            Browse Products
          </Link>

        </div>

      )}


      <div className="grid grid-cols-3 gap-16">

        {/* CART ITEMS */}

        <div className="col-span-2 space-y-10">

          {cart.map((item, index) => {

            const qty = item.qty || 1;
            const subtotal = item.price * qty;

            return (

              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex gap-8 items-center hover:scale-[1.02] transition"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-xl"
                />

                <div className="flex-1">

                  <h3 className="text-xl font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-gray-400 mt-1">
                    Price: ₹{item.price}
                  </p>

                  <p className="text-gray-400">
                    Subtotal: ₹{subtotal}
                  </p>

                  {/* QUANTITY */}

                  <div className="flex items-center gap-4 mt-4">

                    <button
                      onClick={() => updateQty(index, -1)}
                      className="bg-white/10 px-3 py-1 rounded"
                    >
                      -
                    </button>

                    <span>
                      {qty}
                    </span>

                    <button
                      onClick={() => updateQty(index, 1)}
                      className="bg-white/10 px-3 py-1 rounded"
                    >
                      +
                    </button>

                  </div>

                </div>


                <button
                  onClick={() => removeItem(index)}
                  className="text-red-400 hover:text-red-500"
                >
                  Remove
                </button>

              </div>

            );

          })}

        </div>


        {/* ORDER SUMMARY */}

        {cart.length > 0 && (

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sticky top-32 h-fit">

            <h2 className="text-2xl font-semibold mb-8">
              Order Summary
            </h2>

            <div className="flex justify-between mb-4">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span className="text-green-400">Free</span>
            </div>

            <div className="border-t border-white/20 mt-6 pt-6 flex justify-between text-xl font-bold">

              <span>Total</span>
              <span>₹{total}</span>

            </div>


            <Link
              to="/checkout"
              className="block mt-8 text-center bg-white text-black py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              Checkout
            </Link>


            <Link
              to="/products"
              className="block text-center mt-4 text-gray-400 hover:text-white"
            >
              Continue Shopping
            </Link>

          </div>

        )}

      </div>

    </div>

  );

}

export default Cart;