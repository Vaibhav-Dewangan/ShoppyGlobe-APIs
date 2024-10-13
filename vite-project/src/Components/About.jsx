import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="About-container min-h-screen bg-gray-100 text-gray-800 p-5 lg:p-20 sm:mt-7 lg:mt-0">
      <div className="max-w-7xl mx-auto text-center">
        {/* Main Title Section */}
        <h1 className="text-4xl font-bold mb-4 lg:text-5xl">
          Welcome to Shoppy Globe
        </h1>
        <p className="text-lg lg:text-xl mb-8">
          Your one-stop destination for all your shopping needs. Discover a world of products with just a few clicks!
        </p>

        {/* Information Section */}
        <div className="About-info grid gap-8 lg:grid-cols-2">
          <div className="About-mission p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-base lg:text-lg ">
              At Shoppy Globe, our mission is to provide a seamless shopping experience for people all around the world. We aim to make online shopping more accessible, affordable, and enjoyable, no matter where you are.
            </p>
          </div>

          <div className="About-vision p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-base lg:text-lg ">
              We envision a world where shopping is effortless, where anyone can find anything they need with ease. We are committed to expanding our product offerings and ensuring that every user has a satisfying experience on our platform.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="Call-to-action mt-16">
          <Link to="/">
            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
              Start Shopping Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
