import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className=" bg-white pt-10 mt-5" >
          <div className="text-center ">
          <h1 className="text-4xl font-bold mb-3">Study Hive</h1>
          <p className='text-blue-400'>StudyHive is an innovative online platform designed to enhance group study experiences, helping students <br/> collaborate, organize, and track their learning efficiently. </p>
          </div>
          <div className="divider mx-20 mt-6"></div>
       <div className="footer text-blue-400 p-10 ">
       <nav>
       <p><strong>Contact Us:</strong></p>
      <p>Email: info@studyhive.org</p>
      <p>Phone: +1 234 567 890</p>
      <p>Address: 123 Warm Hearts Lane, Winterville, USA</p>
        </nav>
        <nav>
      
        <a href="https://www.facebook.com/YourPage" target="_blank" rel="noopener noreferrer">
        <FaFacebook style={{ color: '#3b5998', fontSize: '24px' }} /> Facebook
        </a>
        <a href="https://twitter.com/YourProfile" target="_blank" rel="noopener noreferrer">
        <FaTwitter style={{ color: '#1da1f2', fontSize: '24px' }} /> Twitter
        </a>
        <a href="https://www.instagram.com/YourProfile" target="_blank" rel="noopener noreferrer">
           <FaInstagram style={{ color: '#e1306c', fontSize: '24px' }}/> Instagram
        </a>
        <a href="https://www.linkedin.com/in/YourProfile" target="_blank" rel="noopener noreferrer">
        <FaLinkedin style={{ color: '#0077b5', fontSize: '24px' }} /> LinkedIn
        </a>
        </nav>
        <nav>
        <p>© 2024 StudyHive. All Rights Reserved.</p>
        </nav>
       </div>
      </footer>
    );
};

export default Footer;