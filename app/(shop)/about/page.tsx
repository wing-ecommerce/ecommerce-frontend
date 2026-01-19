'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-peach-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About Chic Outfit
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            We are here to help you go places in style – empowering confidence through timeless, high-quality fashion for everyone.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://media.gettyimages.com/id/1715503978/photo/happy-business-owner-smiling-at-a-clothing-store.jpg?s=1024x1024&w=gi&k=20&c=4LxSQ6lbvTgMSUsd7IBz8kz6k4qGd9DB0sIsksxPvfU="
                alt="Happy boutique owner smiling in store"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://c8.alamy.com/comp/2EA1EYE/portrait-of-female-fashion-store-owner-woman-standing-in-fashion-shop-and-smiling-2EA1EYE.jpg"
                alt="Female fashion store owner standing proudly"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story & Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded with a passion for accessible luxury, Chic Outfit started as a small boutique dedicated to curating pieces that make every wearer feel extraordinary.
              </p>
              <p className="text-lg text-gray-600">
                Today, we continue that mission by offering trendy yet timeless collections – dresses, jeans, skirts, t-shirts – all designed for comfort, quality, and personal expression.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <img
                src="https://media.istockphoto.com/id/511671874/photo/team-of-multi-tasking-fashion-designers-in-a-design-studio.jpg?s=1024x1024&w=is&k=20&c=utdmKKXB0DcKkchcy1wDHsIFZNBbImalhjjQ9EUlfEk="
                alt="Fashion design team at work"
                className="rounded-2xl shadow-lg object-cover h-64"
              />
              <img
                src="https://media.istockphoto.com/id/1458823494/photo/clothing-fashion-studio-and-women-designer-team-working-and-planning-a-creative-project.jpg?s=1024x1024&w=is&k=20&c=bc1haFQhn1eHVh0f6lynK__iMQR6ik1iW0f6C989qrU="
                alt="Designers planning creative project"
                className="rounded-2xl shadow-lg object-cover h-64 mt-12"
              />
              <img
                src="https://static.vecteezy.com/system/resources/previews/035/740/984/large_2x/team-of-fashionable-freelance-dressmaker-sewing-on-new-custom-made-dress-while-working-inside-artistic-workshop-studio-for-fashion-design-and-clothing-business-industry-photo.jpg"
                alt="Dressmakers sewing custom dress"
                className="rounded-2xl shadow-lg object-cover h-64"
              />
              <img
                src="https://media.istockphoto.com/id/514647208/photo/team-of-young-fashion-designers-working-in-a-design-studio.jpg?s=612x612&w=is&k=20&c=dKeTbMXl1E6m8NZrb8j_ZCC43Bg3QVN9xWl7youg2Oc="
                alt="Young designers in studio"
                className="rounded-2xl shadow-lg object-cover h-64 mt-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-peach-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Customers Love Us</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            <div className="bg-green-400 text-white py-6 px-8 rounded-2xl shadow-md">
              <p className="text-4xl font-bold">25+</p>
              <p className="text-lg">Years Experience</p>
            </div>
            <div className="bg-green-400 text-white py-6 px-8 rounded-2xl shadow-md">
              <p className="text-4xl font-bold">120+</p>
              <p className="text-lg">Brands</p>
            </div>
            <div className="bg-green-400 text-white py-6 px-8 rounded-2xl shadow-md">
              <p className="text-4xl font-bold">140K+</p>
              <p className="text-lg">Happy Customers</p>
            </div>
            <div className="bg-green-400 text-white py-6 px-8 rounded-2xl shadow-md">
              <p className="text-4xl font-bold">20+</p>
              <p className="text-lg">Countries</p>
            </div>
            <div className="bg-green-400 text-white py-6 px-8 rounded-2xl shadow-md">
              <p className="text-4xl font-bold">99%</p>
              <p className="text-lg">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Store */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://c8.alamy.com/comp/2MDWK09/women-team-designer-portrait-and-fashion-meeting-of-a-marketing-group-happy-about-teamwork-ecommerce-business-solidarity-and-diversity-of-people-2MDWK09.jpg"
                alt="Our diverse and happy fashion team"
                className="rounded-3xl shadow-2xl object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
              <p className="text-lg text-gray-600 mb-6">
                A passionate group of designers, stylists, and fashion lovers dedicated to bringing you the best trends and quality.
              </p>
              <p className="text-lg text-gray-600">
                From sketching ideas to curating collections, our diverse team works tirelessly to ensure every piece inspires confidence and joy.
              </p>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <img
              src="https://static.vecteezy.com/system/resources/previews/071/052/170/large_2x/modern-minimalist-clothing-store-interior-with-racks-of-apparel-and-display-tables-photo.jpg"
              alt="Modern clothing store interior"
              className="rounded-2xl shadow-lg object-cover h-80"
            />
            <img
              src="https://www.modernshelving.com/cdn/shop/files/Retail-Display-Hero1.jpg?v=1758573464&width=1800"
              alt="Elegant retail display with clothing racks"
              className="rounded-2xl shadow-lg object-cover h-80"
            />
            <img
              src="https://penbodisplay.com/wp-content/uploads/2025/08/clothing-store-design3.webp"
              alt="Beautiful clothing store design"
              className="rounded-2xl shadow-lg object-cover h-80"
            />
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="bg-gradient-to-b from-white to-peach-50 py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Setting the Standard for Quality and Fashion Style
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Join thousands who trust Chic Outfit for their everyday and special occasion wardrobe needs.
          </p>
          <Link
            href="/products"
            className="inline-block bg-green-500 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-orange-600 transition shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </>
  );
}