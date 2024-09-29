'use client'

import React, { useState } from 'react'
import Navbar from './Navbar'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Globe, Search, TrendingUp, AlertTriangle, Truck } from 'lucide-react'

// Mock data for demonstration
const mandalData = [
  { id: 1, name: 'Mandal A', district: 'District X' },
  { id: 2, name: 'Mandal B', district: 'District X' },
  { id: 3, name: 'Mandal C', district: 'District Y' },
  { id: 4, name: 'Mandal D', district: 'District Y' },
  { id: 5, name: 'Mandal E', district: 'District Z' },
]

const transactionData = [
  { mandal: 'Mandal A', transactions: 150, value: 75000 },
  { mandal: 'Mandal B', transactions: 120, value: 60000 },
  { mandal: 'Mandal C', transactions: 200, value: 100000 },
  { mandal: 'Mandal D', transactions: 80, value: 40000 },
  { mandal: 'Mandal E', transactions: 180, value: 90000 },
]

const complaintData = [
  { id: 1, mandal: 'Mandal A', type: 'Delivery Delay', status: 'Open' },
  { id: 2, mandal: 'Mandal B', type: 'Quality Issue', status: 'Resolved' },
  { id: 3, mandal: 'Mandal C', type: 'Payment Dispute', status: 'In Progress' },
  { id: 4, mandal: 'Mandal D', type: 'Incorrect Order', status: 'Open' },
  { id: 5, mandal: 'Mandal E', type: 'Delivery Delay', status: 'Resolved' },
]

export default function AdminDashboard() {
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedMandal, setSelectedMandal] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMandals = mandalData.filter(mandal => 
    (selectedDistrict === '' || mandal.district === selectedDistrict) &&
    mandal.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentMandalData = transactionData.find(data => data.mandal === selectedMandal) || { transactions: 0, value: 0 }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f3e8] to-[#c8e6c9]">
      {/* <Navbar userType="admin" /> */}
      <header className="bg-gradient-to-r from-[#2e7d32] to-[#1b5e20] text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Krishi Mitra - Admin Dashboard</h1>
          <Button variant="outline" className="bg-white text-[#2e7d32] hover:bg-[#e8f3e8] hover:text-[#1b5e20]">
            <Globe className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto mt-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="w-[180px]">
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
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Mandal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Mandals</SelectItem>
                {filteredMandals.map(mandal => (
                  <SelectItem key={mandal.id} value={mandal.name}>{mandal.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Search mandals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            <Button variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentMandalData.transactions}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transaction Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{currentMandalData.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +15.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Complaints</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complaintData.filter(c => c.status === 'Open').length}</div>
              <p className="text-xs text-muted-foreground">
                -3.2% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
            <TabsTrigger value="logistics">Logistics</TabsTrigger>
          </TabsList>
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
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
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Truck className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Active Deliveries</p>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Truck className="h-6 w-6 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium">Delayed Shipments</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Truck className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Completed Deliveries (This Month)</p>
                      <p className="text-2xl font-bold">187</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}