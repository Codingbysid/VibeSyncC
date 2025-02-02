"use client";

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-green-800 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        {/* Website Name */}
        <h1 className="text-2xl font-bold">Vibesync</h1>

        {/* Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-black focus:outline-none ml-4"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* Links */}
        <nav
          className={`lg:flex lg:items-center lg:space-x-6 absolute lg:static top-16 left-0 w-full lg:w-auto bg-green-200 lg:bg-transparent transition-all duration-300 ease-in-out ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <ul className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            </li>
            <li>
              <Link href="/contactus" className="hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/demo" className="hover:underline">
                Demo
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-12 bg-black mt-16">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-white">
            VibeSync: Elevate Your Party Experience
          </h1>
          <p className="text-md md:text-lg text-white mb-6">
            Hassle-Free invites, seamless RSVPs, and AI-powered planning—all in one app.
            Curate the perfect (or most chaotic) playlist, organize activities, and vibe with your guests like never before.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link href="/login">
              <button className="border-2 border-green-500 text-green-500 py-2 px-6 rounded hover:bg-green-500 hover:text-white transition duration-300">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="border-2 bg-green-500 text-white py-2 px-6 rounded hover:bg-white hover:text-green-500 border-green-500 transition duration-300">
                Signup
              </button>
            </Link>
          </div>
        </div>

        {/* Image Content */}
        <div className="relative flex-1 mt-8 md:mt-0 flex justify-center">
          {/* Red Card */}
          <div className="absolute -top-12 -right-16 bg-red-500 w-40 h-40 sm:w-64 sm:h-64 rounded-xl transform rotate-12 z-0"></div>

          {/* Image */}
          <img
            src="/Cool-Parties-1.jpg" // Ensure the image is in your public folder or adjust the path accordingly
            alt="Party Experience"
            className="w-60 h-48 sm:w-80 sm:h-64 md:w-96 md:h-72 rounded-lg shadow-lg transform rotate-6 z-10"
          />
        </div>
      </div>

      <main className="bg-gradient-to-b from-black to-green-900 py-20">
        {/* Main Content */}
        <div className="flex flex-col items-center">
          <p className="text-lg md:text-xl text-center mb-6 text-whi">
            Ready to explore more? Check out our demo for more features.
          </p>
          <Link
            href="/demo"
            className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 border border-blue-600 transition"
          >
            Go to Demo
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
