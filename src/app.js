import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Footer from './components/Footer';
import Header from './components/Header';
import UserPage from './components/UserPage';

function App() {
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate('/register');
  };
  return (
    <div className="min-h-screen relative">
      <Header />
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'url("/background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.8
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/" element={
            <>
              {/* Hero Section */}
              <div className="bg-blue-600 bg-opacity-70 text-white min-h-[calc(100vh-4rem)] flex items-center">
                <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-24">
                  <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                      Find Your Hobby Buddies Nearby
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto">
                      Connect with people who share your interests and live in your area
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6">Already registered? Come in!</p>
                    <button 
                      onClick={() => navigate('/login')}
                      className="bg-white text-blue-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-50 transition-colors transform hover:scale-105 duration-200"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div id="features" className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-white">
                  What is it about?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  <div className="bg-white bg-opacity-90 p-4 sm:p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Location-Based Matching</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Find hobby enthusiasts who live nearby, making it easy to meet and share your interests</p>
                  </div>
                  <div className="bg-white bg-opacity-90 p-4 sm:p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Diverse Communities</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Join groups for any hobby imaginable, from hiking and photography to cooking and crafting</p>
                  </div>
                  <div className="bg-white bg-opacity-90 p-4 sm:p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Safe & Friendly</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Connect with verified users in a safe, welcoming environment designed for hobby enthusiasts</p>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gray-800 bg-opacity-70 py-12 sm:py-16 md:py-24">
                <div className="container mx-auto px-4 text-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">
                    Ready to Find Your Hobby Community?
                  </h2>
                  <button 
                    onClick={handleRegisterClick}
                    className="bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors transform hover:scale-105 duration-200"
                  >
                    Register
                  </button>
                </div>
              </div>

              <Footer />
            </>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;