import Link from 'next/link';

interface FooterProps {
  onCategoryClick?: (category: string) => void;
}

export default function Footer({ onCategoryClick }: FooterProps) {
  return (
    <footer className="bg-green-50 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* BRAND */}
        <div>
          <h3 className="text-2xl font-bold text-green-600 mb-4">TeeSpace</h3>
          <p className="text-sm text-gray-600 mb-3">Sustainable fashion crafted for comfort, quality, and style.</p>
          <p className="text-sm">support@teespace.com</p>
          <p className="text-lg font-semibold mt-2">+855 12 345 678</p>
        </div>

        {/* USEFUL LINKS */}
        <div>
          <h4 className="font-semibold text-lg mb-5">Useful Links</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-green-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-green-600 transition">
                Products
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-600 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-green-600 transition">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* CUSTOMER CARE */}
        <div>
          <h4 className="font-semibold text-lg mb-5">Customer Care</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/account" className="hover:text-green-600 transition">
                My Account
              </Link>
            </li>
            <li>
              <Link href="/account/orders" className="hover:text-green-600 transition">
                Order Tracking
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition">
                Size Guide
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="font-semibold text-lg mb-5">Company</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/about" className="hover:text-green-600 transition">
                About Us
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition">
                Sustainability
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition">
                Press
              </a>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-600 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h4 className="font-semibold text-lg mb-5">Newsletter</h4>
          <p className="text-sm text-gray-600 mb-4">
            Subscribe to get special offers and updates.
          </p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email address"
              className="px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
            <button 
              type="submit"
              className="bg-green-600 text-white py-3 rounded-full font-medium hover:bg-green-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-green-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>© 2024 TeeSpace. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-green-600 transition">Privacy Policy</a>
              <a href="#" className="hover:text-green-600 transition">Terms of Service</a>
              <a href="#" className="hover:text-green-600 transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}