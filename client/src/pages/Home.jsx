import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { addToCart } from "../services/cart";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

function Home() {

  const [products,setProducts] = useState([]);
  const [cartCount,setCartCount] = useState(0);

  useEffect(()=>{

    const loadProducts = async()=>{
      const data = await getProducts();
      setProducts(data);
    }

    loadProducts();

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);

  },[])

  const handleAddToCart = (product)=>{

    addToCart(product);

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);

  }

  return (

    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Glow background */}

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

        <Link to="/cart" className="relative">

          🛒

          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
            {cartCount}
          </span>

        </Link>

      </nav>


      {/* HERO SECTION */}

      <div className="pt-40 px-20 flex justify-between items-center">

        <div className="max-w-xl">

          <h1 className="text-7xl font-black leading-tight">

            Future  
            <br/>
            Tech Store

          </h1>

          <p className="text-gray-400 mt-6 text-lg">

            Discover next generation gadgets designed for speed, power and beauty.

          </p>

          <Link
            to="/products"
            className="mt-8 inline-block bg-white text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Shop Now
          </Link>

        </div>

        <motion.img

          initial={{y:40, opacity:0}}
          animate={{y:0, opacity:1}}

          transition={{duration:1}}

          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"

          className="w-[420px] rounded-3xl shadow-2xl"

        />

      </div>


      {/* CATEGORIES */}

      <div className="px-20 mt-32">

        <h2 className="text-4xl font-bold mb-12">
          Shop by Category
        </h2>

        <div className="grid grid-cols-4 gap-12">

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl text-center hover:scale-105 transition">
            📱
            <p className="mt-4 text-lg">Phones</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl text-center hover:scale-105 transition">
            💻
            <p className="mt-4 text-lg">Laptops</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl text-center hover:scale-105 transition">
            🎧
            <p className="mt-4 text-lg">Audio</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl text-center hover:scale-105 transition">
            ⌨️
            <p className="mt-4 text-lg">Accessories</p>
          </div>

        </div>

      </div>


      {/* TRENDING PRODUCTS */}

      <div className="px-20 mt-32 pb-32">

        <div className="flex justify-between items-center mb-16">

          <h2 className="text-4xl font-bold">
            Trending Products
          </h2>

          <Link
            to="/products"
            className="text-blue-400 hover:text-blue-300"
          >
            View All →
          </Link>

        </div>


        <div className="grid grid-cols-3 gap-16">

          {products.slice(0,3).map((p)=>(

            <motion.div

              key={p._id}

              whileHover={{
                scale:1.05,
                rotateX:4,
                rotateY:-4
              }}

              transition={{type:"spring", stiffness:200}}

              className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-xl"

            >

              <div className="overflow-hidden">

                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
                />

              </div>

              <div className="p-8">

                <h3 className="text-2xl font-semibold">
                  {p.name}
                </h3>

                <p className="text-gray-400 mt-2">
                  {p.description}
                </p>

                <div className="flex justify-between items-center mt-6">

                  <span className="text-xl font-bold">
                    ₹{p.price}
                  </span>

                  <button
                    onClick={()=>handleAddToCart(p)}
                    className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
                  >
                    Add
                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>


      {/* PROMO BANNER */}

      <div className="px-20 pb-32">

        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-16 flex justify-between items-center">

          <div>

            <h2 className="text-4xl font-bold mb-4">
              Summer Tech Sale
            </h2>

            <p className="text-lg mb-6">
              Up to 40% Off On Selected Gadgets
            </p>

            <Link
              to="/products"
              className="bg-white text-black px-6 py-3 rounded-full font-semibold"
            >
              Explore Deals
            </Link>

          </div>

        </div>

      </div>
          <Footer />
    </div>

  )

}

export default Home;