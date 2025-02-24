import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Footer from './Footer';
import Header from './Header';

// Fix Leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function UserPage() {
  // Get user data from localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [newHobby, setNewHobby] = useState('');
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [isSpotting, setIsSpotting] = useState(false);


  // No need for map initialization useEffect with react-leaflet

  // Haversine formula to calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in kilometers
  };

  const findNearbyUsers = () => {
    setIsSpotting(true);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Ensure current user has valid location data
    if (!currentUser?.location?.latitude || !currentUser?.location?.longitude) {
      setIsSpotting(false);
      setNearbyUsers([]);
      return;
    }
    
    const currentLat = currentUser.location.latitude;
    const currentLon = currentUser.location.longitude;
    const currentHobbies = currentUser.hobbies || [];
    
    const nearbyMatches = users
      .filter(user => {
        // Skip current user or users without location data
        if (user.name === currentUser.name) return false;
        if (!user?.location?.latitude || !user?.location?.longitude) return false;
        
        // Calculate distance
        const distance = calculateDistance(
          currentLat,
          currentLon,
          user.location.latitude,
          user.location.longitude
        );
    
        // Check if user is within 50km and has shared hobbies
        const userHobbies = user.hobbies || [];
        const sharedHobbies = currentHobbies.filter(hobby => 
          userHobbies.includes(hobby)
        );
    
        return distance <= 50 && sharedHobbies.length > 0;
      })
      .map(user => ({
        ...user,
        distance: calculateDistance(
          currentLat,
          currentLon,
          user.location.latitude,
          user.location.longitude
        ),
        sharedHobbies: (user.hobbies || []).filter(hobby => 
          currentHobbies.includes(hobby)
        )
      }))
      .sort((a, b) => a.distance - b.distance);
  
    setNearbyUsers(nearbyMatches);
    setIsSpotting(false);
  };

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
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Find Nearby Hobby Buddies</h2>
                  <button
                    onClick={findNearbyUsers}
                    disabled={isSpotting}
                    className="bg-white text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50"
                  >
                    {isSpotting ? 'Searching...' : 'Spot!'}
                  </button>
                </div>
                {/* Map Container - Always show when user has location */}
                {currentUser?.location?.latitude && currentUser?.location?.longitude && (
                  <div className="w-full h-96 rounded-lg mb-4" style={{ zIndex: 1 }}>
                    <MapContainer 
                      center={[currentUser.location.latitude, currentUser.location.longitude]} 
                      zoom={13} 
                      style={{ height: '100%', width: '100%' }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {/* Current user marker */}
                      <Marker position={[currentUser.location.latitude, currentUser.location.longitude]}>
                        <Popup>Your Location</Popup>
                      </Marker>
                      {/* Nearby users markers */}
                      {nearbyUsers.map((user, index) => (
                        user.location?.latitude && user.location?.longitude && (
                          <Marker key={index} position={[user.location.latitude, user.location.longitude]}>
                            <Popup>
                              <div className="p-2">
                                <h3 className="font-bold">{user.name}</h3>
                                <p>Distance: {user.distance.toFixed(1)} km</p>
                                <p>Shared Hobbies:</p>
                                <ul className="list-disc list-inside">
                                  {user.sharedHobbies.map((hobby, idx) => (
                                    <li key={idx}>{hobby}</li>
                                  ))}
                                </ul>
                              </div>
                            </Popup>
                          </Marker>
                        )
                      ))}
                    </MapContainer>
                  </div>
                )}
                {nearbyUsers.length > 0 ? (
                  <div className="space-y-4">
                    {nearbyUsers.map((user, index) => (
                      <div key={index} className="bg-white bg-opacity-10 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <p className="text-sm">{user.location.displayAddress}</p>
                        <p className="text-sm">Distance: {user.distance.toFixed(1)} km</p>
                        <div className="mt-2">
                          <p className="font-medium">Shared Hobbies:</p>
                          <ul className="list-disc list-inside">
                            {user.sharedHobbies.map((hobby, idx) => (
                              <li key={idx}>{hobby}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : !isSpotting ? (
                  <p className="italic">No nearby users found with shared hobbies</p>
                ) : null}
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
