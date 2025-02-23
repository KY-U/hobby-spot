import React from 'react';

function App() {
  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-gray-900 bg-opacity-80 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-white text-2xl font-bold">Hobby Spot</div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <button className="text-white hover:text-blue-300 transition-colors">Home</button>
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
        {/* Hero Section */}
        <div className="bg-blue-600 bg-opacity-70 text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Hobby Buddies Nearby</h1>
              <p className="text-xl md:text-2xl mb-8">Connect with people who share your interests and live in your area</p>
              <p className="text-xl md:text-2xl mb-6">Already registered? Come in!</p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors">
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
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors">
              Register
            </button>
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-gray-900 bg-opacity-80 py-6">
          <div className="container mx-auto px-4 text-center text-gray-300">
            <p>Hobby Spot 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;