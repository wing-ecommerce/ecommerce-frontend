'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      {/* Hero Contact Form Section - Soft Green Theme */}
      <section className="relative bg-green-50 py-20 overflow-hidden">
        {/* Subtle Elegant Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://i.pinimg.com/736x/21/28/1b/21281b4fbe857d8d54c8a2fa08d4f0e0.jpg"
            alt="Soft green abstract background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-700">Serving Your Local Area – We're here to help!</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/60">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition resize-none"
                    placeholder="How can we help you today?"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-lg transition shadow-lg hover:shadow-2xl"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/60">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Address</p>
                      <p className="text-gray-700">
                        123 Fashion Street<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-700">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-700">hello@chicoutfit.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Hours</p>
                      <p className="text-gray-700">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <Link href="#" className="bg-white/70 p-4 rounded-full hover:bg-green-500 hover:text-white transition shadow-md">
                  <Facebook className="w-6 h-6" />
                </Link>
                <Link href="#" className="bg-white/70 p-4 rounded-full hover:bg-green-500 hover:text-white transition shadow-md">
                  <Instagram className="w-6 h-6" />
                </Link>
                <Link href="#" className="bg-white/70 p-4 rounded-full hover:bg-green-500 hover:text-white transition shadow-md">
                  <Twitter className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            How Do You Know If You Need Our Help?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-green-50 rounded-2xl shadow-lg p-8 text-center border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Quick Response</h3>
              <p className="text-gray-600">
                We reply to all inquiries within 24 hours with helpful advice and solutions.
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl shadow-lg p-8 text-center border border-green-100">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Support</h3>
              <p className="text-gray-600">
                Our fashion experts are ready to guide you on sizing, styling, and orders.
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl shadow-lg p-8 text-center border border-green-100">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Local Service</h3>
              <p className="text-gray-600">
                Proudly serving your community with fast shipping and personal care.
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-3xl overflow-hidden shadow-2xl h-96 border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976384398893!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1710000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}