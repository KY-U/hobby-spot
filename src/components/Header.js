import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-gray-900 bg-opacity-80 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl font-bold">Hobby Spot</div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <button 
                  onClick={handleHomeClick}
                  className="text-white hover:text-blue-300 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button className="text-white hover:text-blue-300 transition-colors">About</button>
              </li>
              <li>
                <button className="text-white hover:text-blue-300 transition-colors">Contact</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;