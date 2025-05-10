import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 pt-10 pb-6 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Study Hive</h1>
          <p className="text-gray-600 dark:text-gray-300">
            StudyHive is an innovative platform for collaborative learning,
            helping students organize, track, and grow together.
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 my-6" />

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-600 dark:text-gray-300 text-sm">
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Contact Us</h3>
            <p>Email: info@studyhive.org</p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123 Warm Hearts Lane, Winterville, USA</p>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Follow Us</h3>
            <a
              href="https://www.facebook.com/YourPage"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-600 transition"
            >
              <FaFacebook className="text-xl" /> Facebook
            </a>
            <a
              href="https://twitter.com/YourProfile"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-sky-500 transition"
            >
              <FaTwitter className="text-xl" /> Twitter
            </a>
            <a
              href="https://www.instagram.com/YourProfile"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-pink-500 transition"
            >
              <FaInstagram className="text-xl" /> Instagram
            </a>
            <a
              href="https://www.linkedin.com/in/YourProfile"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-700 transition"
            >
              <FaLinkedin className="text-xl" /> LinkedIn
            </a>
          </div>

          {/* Copyright */}
          <div className="md:text-right">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Legal</h3>
            <p>© 2025 StudyHive</p>
            <p>All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
