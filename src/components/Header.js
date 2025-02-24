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
    <header className="fixed top-0 left-0 right-0 z-20 backdrop-blur-sm bg-black bg-opacity-30 py-2 sm:py-3 md:py-4 transition-all duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center">
          <div className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-tight hover:text-blue-300 transition-colors cursor-pointer">Hobby Spot</div>
          
          {/* Hamburger Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none hover:text-blue-300 transition-colors p-2"
            aria-label="Toggle navigation menu"
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
          <nav 
            className={`
              ${isMenuOpen ? 'block' : 'hidden'} 
              md:block absolute md:relative top-full left-0 right-0 md:top-auto 
              bg-opacity-90 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none
              transform duration-200 ease-in-out
              ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 md:translate-y-0 md:opacity-100'}
            `}
          >
            <ul className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6 p-4 md:p-0">
              <li className="transform transition-transform hover:scale-105">
                <button 
                  onClick={handleHomeClick}
                  className="text-white hover:text-blue-300 transition-colors w-full text-left text-base sm:text-lg py-1 px-2 rounded-lg hover:bg-gray-800 md:hover:bg-transparent"
                >
                  Home
                </button>
              </li>
              <li className="transform transition-transform hover:scale-105">
                <button 
                  onClick={handleAboutClick}
                  className="text-white hover:text-blue-300 transition-colors w-full text-left text-base sm:text-lg py-1 px-2 rounded-lg hover:bg-gray-800 md:hover:bg-transparent"
                >
                  About
                </button>
              </li>
              <li className="transform transition-transform hover:scale-105">
                <button 
                  className="text-white hover:text-blue-300 transition-colors w-full text-left text-base sm:text-lg py-1 px-2 rounded-lg hover:bg-gray-800 md:hover:bg-transparent"
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;