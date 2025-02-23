import React, { useState } from 'react';
import Footer from './Footer';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
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
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length === 0) {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find user with matching credentials
      const user = users.find(u => u.name === formData.username && u.password === formData.password);
      
      if (user) {
        // Store current user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Redirect to user page
        window.location.href = '/user';
      } else {
        setErrors({
          username: 'Invalid username or password'
        });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'url("/background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-grow py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="relative px-4 py-10 bg-blue-600 bg-opacity-70 mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
              <div className="max-w-md mx-auto">
                <div className="flex items-center space-x-5">
                  <div className="block pl-2 font-semibold text-xl self-start text-white">
                    <h2 className="leading-relaxed">Login to Your Account</h2>
                  </div>
                </div>
                <form className="divide-y divide-gray-200" onSubmit={handleSubmit}>
                  <div className="py-8 text-base leading-6 space-y-4 text-white sm:text-lg sm:leading-7">
                    <div className="flex flex-col">
                      <label className="leading-loose">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-800 bg-white bg-opacity-90"
                      />
                      {errors.username && <p className="text-red-200 text-sm mt-1">{errors.username}</p>}
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-loose">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-800 bg-white bg-opacity-90"
                      />
                      {errors.password && <p className="text-red-200 text-sm mt-1">{errors.password}</p>}
                    </div>
                  </div>
                  <div className="pt-4 flex items-center space-x-4">
                    <button
                      type="submit"
                      className="bg-white text-blue-600 flex justify-center items-center w-full px-4 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                      Login
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

export default Login;