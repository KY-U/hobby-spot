import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleHomeClick = () => {
    if (window.location.pathname === '/') {
      const heroSection = document.querySelector('.bg-blue-600.bg-opacity-70.text-white');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
    }
    setIsMenuOpen(false);
  };

  const handleAboutClick = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-gray-900 bg-opacity-80 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl font-bold">Hobby Spot</div>
          
          {/* Hamburger Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Navigation Menu */}
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full left-0 right-0 md:top-auto bg-gray-900 bg-opacity-80 md:bg-transparent`}>
            <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
              <li>
                <button 
                  onClick={handleHomeClick}
                  className="text-white hover:text-blue-300 transition-colors w-full text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={handleAboutClick}
                  className="text-white hover:text-blue-300 transition-colors w-full text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button className="text-white hover:text-blue-300 transition-colors w-full text-left">Contact</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;