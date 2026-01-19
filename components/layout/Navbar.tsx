'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import CartSidebar from '../cart/CartSideBar';
import SignInModal from '../ui/SignInModal';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock cart count - replace with your actual cart store
  const cartCount = 3;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('Searching for:', searchQuery);
    }
  };
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  return (
    <>
      <nav className="shadow-sm sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <div className="shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-xl lg:text-2xl font-bold text-green-500">
                  TeeSpace
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-all hover:text-green-500 relative ${pathname === link.href
                    ? 'text-green-500'
                    : 'text-gray-700'
                    }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute -bottom-6 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-green-500 rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleSearch}
                    className="w-full pl-10 pr-4 py-2 border-2 border-purple-100 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white shadow-sm transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-green-500 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              </button>

              {/* Account */}
              <button
                onClick={() => setIsSignInOpen(true)}
                className="hidden sm:flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-all shadow-md"
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-semibold hidden lg:block">Sign In</span>
              </button>


              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-green-500 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-purple-100">
              {/* Mobile Search */}
              <div className="mb-4 px-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleSearch}
                    className="w-full pl-10 pr-4 py-2 border-2 border-purple-100 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 text-base font-semibold transition-all rounded-full ${pathname === link.href
                      ? 'text-green-500 bg-gradient-to-r from-purple-50 to-green-50'
                      : 'text-gray-700 hover:bg-purple-50 hover:text-green-500'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Account Link */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsSignInOpen(true);
                  }}
                  className="sm:hidden flex items-center space-x-3 px-4 py-3 text-base font-semibold text-white bg-green-500 hover:bg-green-600 transition-all rounded-full w-full"
                >
                  <User className="w-5 h-5" />
                  <span>Account / Sign In</span>
                </button>

              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {/* Sign In Modal */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
    </>
  );
};

export default Navbar;