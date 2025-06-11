// src/components/Navbar.jsx
import React from 'react';
import LogoutButton from './LogoutButton'; // ✅ Add this line

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">MyApp</div>

      {/* Add this logout button somewhere appropriate */}
      <LogoutButton />
    </nav>
  );
};

export default Navbar;
