import React, { useState } from 'react';
import Footer from './Footer';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length === 0) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            
            // Reverse geocoding using OpenStreetMap's Nominatim API
            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
              .then(response => response.json())
              .then(data => {
                // Extract location details
                const city = data.address.city || data.address.town || data.address.village || 'Unknown';
                const state = data.address.state || 'Unknown';
                const country = data.address.country || 'Unknown';

                // Create user data with detailed location
                const userData = {
                  ...formData,
                  location: {
                    latitude,
                    longitude,
                    city,
                    state,
                    country,
                    displayAddress: `${city}, ${state}, ${country}`
                  }
                };

                // Store user data in localStorage
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                users.push(userData);
                localStorage.setItem('users', JSON.stringify(users));

                // Redirect to home page
                window.location.href = '/';
              })
              .catch(error => {
                console.error('Error in reverse geocoding:', error);
                // Fall back to basic location data if reverse geocoding fails
                const userData = {
                  ...formData,
                  location: {
                    latitude,
                    longitude,
                    displayAddress: 'Location details unavailable'
                  }
                };
                
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                users.push(userData);
                localStorage.setItem('users', JSON.stringify(users));
                window.location.href = '/';
              });
          },
          (error) => {
            console.error('Error getting location:', error);
            setErrors({ location: 'Failed to get location. Please allow location access and try again.' });
          }
        );
      } else {
        setErrors({ location: 'Geolocation is not supported by your browser' });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image with White Overlay */}
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
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-grow py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="relative px-4 py-10 bg-blue-600 bg-opacity-70 mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
              <div className="max-w-md mx-auto">
                <div className="flex items-center space-x-5">
                  <div className="block pl-2 font-semibold text-xl self-start text-white">
                    <h2 className="leading-relaxed">Create an Account</h2>
                  </div>
                </div>
                <form className="divide-y divide-gray-200" onSubmit={handleSubmit}>
                  <div className="py-8 text-base leading-6 space-y-4 text-white sm:text-lg sm:leading-7">
                    <div className="flex flex-col">
                      <label className="leading-loose">Name*</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-800 bg-white bg-opacity-90"
                      />
                      {errors.name && <p className="text-red-200 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-loose">Password*</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-800 bg-white bg-opacity-90"
                      />
                      {errors.password && <p className="text-red-200 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-loose">Email (Optional)</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-800 bg-white bg-opacity-90"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-loose">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-800 bg-white bg-opacity-90"
                      />
                    </div>
                  </div>
                  <div className="pt-4 flex items-center space-x-4">
                    <button
                      type="submit"
                      className="bg-white text-blue-600 flex justify-center items-center w-full px-4 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Register;