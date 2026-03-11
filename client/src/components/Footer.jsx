import { Link } from "react-router-dom";

function Footer() {

  return (

    <footer className="bg-black text-white px-20 py-16 border-t border-white/10">

      <div className="grid grid-cols-4 gap-16">

        {/* BRAND */}

        <div>

          <h2 className="text-2xl font-bold mb-4">
            CodeAlpha Store
          </h2>

          <p className="text-gray-400">

            Your one stop destination for modern tech gadgets and accessories.

          </p>

        </div>


        {/* QUICK LINKS */}

        <div>

          <h3 className="font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-400">

            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/products">Products</Link>
            </li>

            <li>
              <Link to="/cart">Cart</Link>
            </li>

          </ul>

        </div>


        {/* CATEGORIES */}

        <div>

          <h3 className="font-semibold mb-4">
            Categories
          </h3>

          <ul className="space-y-2 text-gray-400">

            <li>Phones</li>
            <li>Laptops</li>
            <li>Audio</li>
            <li>Accessories</li>

          </ul>

        </div>


        {/* CONTACT */}

        <div>

          <h3 className="font-semibold mb-4">
            Contact
          </h3>

          <p className="text-gray-400">
            support@codealpha.com
          </p>

          <p className="text-gray-400 mt-2">
            +91 9876543210
          </p>

        </div>

      </div>


      {/* BOTTOM */}

      <div className="border-t border-white/10 mt-12 pt-6 text-center text-gray-500">

        © 2026 CodeAlpha Store. All rights reserved.

      </div>

    </footer>

  );

}

export default Footer;