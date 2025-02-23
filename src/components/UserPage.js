import React, { useState } from 'react';
import Footer from './Footer';
import Header from './Header';

function UserPage() {
  // Get user data from localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [newHobby, setNewHobby] = useState('');

  const handleAddHobby = (e) => {
    e.preventDefault();
    if (newHobby.trim()) {
      const updatedUser = {
        ...currentUser,
        hobbies: [...(currentUser.hobbies || []), newHobby.trim()]
      };
      
      // Update currentUser
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Update user in users array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(u => u.name === currentUser.name);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
      }
      
      setNewHobby('');
      window.location.reload(); // Refresh to show updated hobbies
    }
  };

  return (
    <div className="min-h-screen relative">
      <Header />
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'url("/background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="relative z-10 pt-20 pb-6 flex flex-col min-h-screen">
        <div className="flex-grow container mx-auto px-4 py-8">
          <div className="bg-blue-600 bg-opacity-100 rounded-lg shadow-lg p-6 text-white">
            <h1 className="text-3xl font-bold mb-6">Welcome, {currentUser?.name}!</h1>
            <div className="space-y-4">
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
                <p><span className="font-medium">Email:</span> {currentUser?.email || 'Not provided'}</p>
                <p><span className="font-medium">Phone:</span> {currentUser?.phone || 'Not provided'}</p>
                <p><span className="font-medium">Location:</span> {currentUser?.location?.displayAddress || 'Not provided'}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Your Hobbies</h2>
                <div className="space-y-4">
                  {currentUser?.hobbies && currentUser.hobbies.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2">
                      {currentUser.hobbies.map((hobby, index) => (
                        <li key={index}>{hobby}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="italic">No hobbies added yet</p>
                  )}
                  <form onSubmit={handleAddHobby} className="mt-4 flex gap-2">
                    <input
                      type="text"
                      value={newHobby}
                      onChange={(e) => setNewHobby(e.target.value)}
                      placeholder="Enter a new hobby"
                      className="flex-grow px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="bg-white text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-blue-50 transition-colors"
                    >
                      Add Hobby
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default UserPage;