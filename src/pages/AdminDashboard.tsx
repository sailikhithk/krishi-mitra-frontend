import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [adminData, setAdminData] = useState<{ message: string; admin: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin-login');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAdminData(data);
        } else {
          // Handle unauthorized access
          navigate('/admin-login');
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
        // Handle error (show error message, etc.)
      }
    };

    fetchAdminData();
  }, [navigate]);

  if (!adminData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>{adminData.message}</p>
      <p>Logged in as: {adminData.admin}</p>
      {/* Add more admin functionality here */}
    </div>
  );
};

export default AdminDashboard;