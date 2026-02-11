import Image from "next/image";
import Link from "next/link";

import heroImg from "../../public/image/hero.png";
import productImg from "../../public/image/product.png";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-rose-100 via-white to-indigo-100 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block bg-rose-100 text-rose-600 text-sm px-4 py-1 rounded-full mb-6">
            New Fashion Collection
          </span>

          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Discover Your <br />
            <span className="relative inline-block">
              Perfect Style
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-green-500 rounded-full"></span>
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-md mb-8">
            Shop the latest trends in men's and women's fashion.
            Premium quality clothes designed for comfort and style.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-6 mb-10">
            <Link
              href="/products"
              className="bg-green-500 text-white px-8 py-4 rounded-full font-medium hover:bg-green-600 transition shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Shop Collection →
            </Link>

            <Link
              href="/about"
              className="flex items-center gap-2 text-gray-800 font-medium hover:text-indigo-600 transition"
            >
              <span className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:border-indigo-600 transition">
                ▶
              </span>
              Our Story
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-12">
            <div>
              <p className="text-4xl font-bold text-gray-900">12k+</p>
              <p className="text-sm text-gray-500">Happy Customers</p>
            </div>

            <div>
              <p className="text-4xl font-bold text-gray-900">5k+</p>
              <p className="text-sm text-gray-500">
                Fashion Products
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center items-center h-full">
          {/* Background Circle */}
          <div className="absolute w-[420px] h-[420px] lg:w-[500px] lg:h-[500px] bg-indigo-200 rounded-full -z-10"></div>

          {/* Hero Image */}
          <Image
            src={heroImg}
            alt="Fashion Model"
            className="w-full max-h-[520px] lg:max-h-[600px] object-contain relative z-10"
            priority
          />

          {/* Product Card */}
          <div className="absolute bottom-20 lg:bottom-32 -left-6 bg-white rounded-xl shadow-lg p-4 w-44 hover:shadow-xl transition">
            <Image
              src={productImg}
              alt="Clothing Product"
              className="rounded-md mb-2"
            />
            <p className="text-sm font-medium">Classic Denim Jacket</p>
            <p className="text-green-600 font-semibold">$59.00</p>
          </div>

          {/* Badge */}
          <div className="absolute right-0 lg:right-12 top-32 lg:top-40 bg-gradient-to-br from-green-500 to-emerald-600 text-white w-20 h-20 lg:w-24 lg:h-24 rounded-full flex flex-col items-center justify-center text-sm lg:text-base font-semibold shadow-lg animate-pulse">
            <span className="text-2xl lg:text-3xl">50%</span>
            <span className="text-xs font-normal">OFF</span>
          </div>
        </div>
      </div>
    </section>
  );
}