import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { addToCart } from "../services/cart";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

function Products() {

  const [products,setProducts] = useState([]);
  const [search,setSearch] = useState("");
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

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Glow Background */}

      <div className="absolute w-[500px] h-[500px] bg-purple-600 blur-[160px] opacity-30 -top-40 -left-40"></div>
      <div className="absolute w-[500px] h-[500px] bg-blue-600 blur-[160px] opacity-30 bottom-0 right-0"></div>

      {/* NAVBAR (Same as Home) */}

      <nav className="fixed top-6 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-white/10 border border-white/20 px-10 py-4 rounded-full flex gap-12 items-center shadow-xl z-50">

        <h1 className="text-xl font-bold tracking-wide">
          CodeAlpha Store
        </h1>

        <Link to="/" className="hover:text-blue-400 transition">
          Home
        </Link>

        <Link to="/cart" className="relative">

          🛒

          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
            {cartCount}
          </span>

        </Link>

      </nav>


      {/* PAGE CONTENT */}

      <div className="pt-40 px-20 pb-32">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-16">

          <h2 className="text-5xl font-bold">
            All Products
          </h2>

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="bg-white/10 border border-white/20 px-6 py-3 rounded-full outline-none backdrop-blur-xl"
          />

        </div>


        {/* PRODUCTS GRID */}

        <div className="grid grid-cols-3 gap-16">

          {filteredProducts.map((p)=>(

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
          <Footer />
    </div>

  );
}

export default Products;