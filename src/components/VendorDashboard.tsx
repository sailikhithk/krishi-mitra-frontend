'use client'

import React, { useState, useEffect } from 'react'

interface User {
  username: string;
  role: string;
}

const VendorDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Fetch user data here
    // For now, let's use a mock user
    setUser({ username: 'Vendor User', role: 'vendor' })
  }, [])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Welcome to Krishi Mitra Vendor Portal, {user.username}!</h1>
      <p>Your role: {user.role}</p>
      <div>
        <h2>Vendor Dashboard</h2>
        {/* Add vendor-specific components here */}
        <p>View and manage bids</p>
      </div>
    </div>
  )
}

export default VendorDashboard;  // Add this line to export the component as default