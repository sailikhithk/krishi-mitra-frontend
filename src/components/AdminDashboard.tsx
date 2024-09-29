import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Globe, Search, TrendingUp, AlertTriangle, Truck, ShoppingCart } from 'lucide-react';
import Navbar from './Navbar';
import styles from './AdminDashboard.module.css';

// Mock data (same as before)
const mandalData = [
  { id: 1, name: 'Mandal A', district: 'District X' },
  { id: 2, name: 'Mandal B', district: 'District X' },
  { id: 3, name: 'Mandal C', district: 'District Y' },
  { id: 4, name: 'Mandal D', district: 'District Y' },
  { id: 5, name: 'Mandal E', district: 'District Z' },
];

const transactionData = [
  { mandal: 'Mandal A', transactions: 150, value: 75000 },
  { mandal: 'Mandal B', transactions: 120, value: 60000 },
  { mandal: 'Mandal C', transactions: 200, value: 100000 },
  { mandal: 'Mandal D', transactions: 80, value: 40000 },
  { mandal: 'Mandal E', transactions: 180, value: 90000 },
];

const complaintData = [
  { id: 1, mandal: 'Mandal A', type: 'Delivery Delay', status: 'Open' },
  { id: 2, mandal: 'Mandal B', type: 'Quality Issue', status: 'Resolved' },
  { id: 3, mandal: 'Mandal C', type: 'Payment Dispute', status: 'In Progress' },
  { id: 4, mandal: 'Mandal D', type: 'Incorrect Order', status: 'Open' },
  { id: 5, mandal: 'Mandal E', type: 'Delivery Delay', status: 'Resolved' },
];

const AdminDashboard: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedMandal, setSelectedMandal] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
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
        const response = await fetch('http://localhost:8000/admin-dashboard', {
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

  const filteredMandals = mandalData.filter(mandal => 
    (selectedDistrict === '' || mandal.district === selectedDistrict) &&
    mandal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentMandalData = transactionData.find(data => data.mandal === selectedMandal) || { transactions: 0, value: 0 };

  if (!adminData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <p>{adminData.message}</p>
        <p>Logged in as: {adminData.admin}</p>

        <div className={styles.controls}>
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
            <SelectTrigger className={styles.select}>
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Districts</SelectItem>
              <SelectItem value="District X">District X</SelectItem>
              <SelectItem value="District Y">District Y</SelectItem>
              <SelectItem value="District Z">District Z</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedMandal} onValueChange={setSelectedMandal}>
            <SelectTrigger className={styles.select}>
              <SelectValue placeholder="Select Mandal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Mandals</SelectItem>
              {filteredMandals.map(mandal => (
                <SelectItem key={mandal.id} value={mandal.name}>{mandal.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className={styles.search}>
            <Input
              type="text"
              placeholder="Search mandals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <Button variant="ghost" className={styles.searchButton}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <Card>
            <CardHeader className={styles.cardHeader}>
              <CardTitle className={styles.cardTitle}>Total Transactions</CardTitle>
              <TrendingUp className={styles.cardIcon} />
            </CardHeader>
            <CardContent>
              <div className={styles.statValue}>{currentMandalData.transactions}</div>
              <p className={styles.statChange}>+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className={styles.cardHeader}>
              <CardTitle className={styles.cardTitle}>Transaction Value</CardTitle>
              <TrendingUp className={styles.cardIcon} />
            </CardHeader>
            <CardContent>
              <div className={styles.statValue}>₹{currentMandalData.value.toLocaleString()}</div>
              <p className={styles.statChange}>+15.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className={styles.cardHeader}>
              <CardTitle className={styles.cardTitle}>Active Complaints</CardTitle>
              <AlertTriangle className={styles.cardIcon} />
            </CardHeader>
            <CardContent>
              <div className={styles.statValue}>{complaintData.filter(c => c.status === 'Open').length}</div>
              <p className={styles.statChange}>-3.2% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className={styles.tabs}>
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
            <TabsTrigger value="logistics">Logistics</TabsTrigger>
          </TabsList>
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={transactionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mandal" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="transactions" fill="#8884d8" name="Transactions" />
                    <Bar yAxisId="right" dataKey="value" fill="#82ca9d" name="Value (₹)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="complaints">
            <Card>
              <CardHeader>
                <CardTitle>Complaint Log</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mandal</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complaintData.map(complaint => (
                      <TableRow key={complaint.id}>
                        <TableCell>{complaint.mandal}</TableCell>
                        <TableCell>{complaint.type}</TableCell>
                        <TableCell>{complaint.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="logistics">
            <Card>
              <CardHeader>
                <CardTitle>Logistics Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={styles.logisticsStats}>
                  <div className={styles.logisticItem}>
                    <Truck className={styles.logisticIcon} />
                    <div>
                      <p className={styles.logisticLabel}>Active Deliveries</p>
                      <p className={styles.logisticValue}>24</p>
                    </div>
                  </div>
                  <div className={styles.logisticItem}>
                    <Truck className={styles.logisticIcon} />
                    <div>
                      <p className={styles.logisticLabel}>Delayed Shipments</p>
                      <p className={styles.logisticValue}>3</p>
                    </div>
                  </div>
                  <div className={styles.logisticItem}>
                    <Truck className={styles.logisticIcon} />
                    <div>
                      <p className={styles.logisticLabel}>Completed Deliveries (This Month)</p>
                      <p className={styles.logisticValue}>187</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;