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
              <div className="bg-blue-600 bg-opacity-70 text-white">
                <div className="container mx-auto px-4 py-16 md:py-24">
                  <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Hobby Buddies Nearby</h1>
                    <p className="text-xl md:text-2xl mb-8">Connect with people who share your interests and live in your area</p>
                    <p className="text-xl md:text-2xl mb-6">Already registered? Come in!</p>
                    <button 
                      onClick={() => navigate('/login')}
                      className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Why Choose Hobby Spot?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Location-Based Matching</h3>
                    <p className="text-gray-600">Find hobby enthusiasts who live nearby, making it easy to meet and share your interests</p>
                  </div>
                  <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Diverse Communities</h3>
                    <p className="text-gray-600">Join groups for any hobby imaginable, from hiking and photography to cooking and crafting</p>
                  </div>
                  <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Safe & Friendly</h3>
                    <p className="text-gray-600">Connect with verified users in a safe, welcoming environment designed for hobby enthusiasts</p>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gray-800 bg-opacity-70 py-16">
                <div className="container mx-auto px-4 text-center">
                  <h2 className="text-3xl font-bold mb-6 text-white">Ready to Find Your Hobby Community?</h2>
                  <button 
                    onClick={handleRegisterClick}
                    className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
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