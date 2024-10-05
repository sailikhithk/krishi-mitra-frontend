"use client"
import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Globe, Search, TrendingUp, AlertTriangle, Truck, Download, Calendar, Clock, ArrowRight, Languages } from 'lucide-react'
import { translations } from '@/locales/translations'

type Language = 'en' | 'te'; // Define the Language type if it doesn't exist in the module
import { districtData, mandalData } from '@/data/mandalData'
import styles from './AdminDashboard.module.css'

type TransactionData = {
  mandal: string;
  transactions: number;
  value: number;
}

type ComplaintData = {
  id: number;
  mandal: string;
  type: string;
  status: string;
}

type LogisticsData = {
  id: number;
  orderNumber: string;
  from: { type: string; name: string; mandal: string };
  to: { type: string; name: string; mandal: string };
  status: string;
  expectedDelivery: string;
  actualDelivery: string | null;
  delay: { isDelayed: boolean; reason: string | null; duration: string | null };
}

type FarmerData = {
  id: number;
  name: string;
  mandal: string;
  activeListings: number;
  totalSales: number;
}

type VendorData = {
  id: number;
  name: string;
  mandal: string;
  totalPurchases: number;
  activeOrders: number;
}

type ProduceData = {
  id: number;
  name: string;
  category: string;
  totalTransactions: number;
  totalValue: number;
}

const transactionData: TransactionData[] = [
  { mandal: 'Anantapur', transactions: 150, value: 75000 },
  { mandal: 'Dharmavaram', transactions: 120, value: 60000 },
  { mandal: 'Madanapalle', transactions: 200, value: 100000 },
  { mandal: 'Tirupati', transactions: 180, value: 90000 },
  { mandal: 'Kakinada', transactions: 160, value: 80000 },
]

const complaintData: ComplaintData[] = [
  { id: 1, mandal: 'Anantapur', type: 'Delivery Delay', status: 'Open' },
  { id: 2, mandal: 'Dharmavaram', type: 'Quality Issue', status: 'Resolved' },
  { id: 3, mandal: 'Madanapalle', type: 'Payment Dispute', status: 'In Progress' },
  { id: 4, mandal: 'Tirupati', type: 'Incorrect Order', status: 'Open' },
  { id: 5, mandal: 'Kakinada', type: 'Delivery Delay', status: 'Resolved' },
]

const logisticsData: LogisticsData[] = [
  { 
    id: 1, 
    orderNumber: 'ORD001',
    from: { type: 'Farmer', name: 'Ravi Kumar', mandal: 'Anantapur' },
    to: { type: 'Vendor', name: 'AP Groceries', mandal: 'Vijayawada' },
    status: 'In Transit',
    expectedDelivery: '2023-09-30',
    actualDelivery: null,
    delay: { isDelayed: false, reason: null, duration: null }
  },
  { 
    id: 2, 
    orderNumber: 'ORD002',
    from: { type: 'Vendor', name: 'Andhra Farm Supplies', mandal: 'Guntur' },
    to: { type: 'Farmer', name: 'Lakshmi Devi', mandal: 'Tirupati' },
    status: 'Delayed',
    expectedDelivery: '2023-09-28',
    actualDelivery: null,
    delay: { isDelayed: true, reason: 'Weather conditions', duration: '2 days' }
  },
  { 
    id: 3, 
    orderNumber: 'ORD003',
    from: { type: 'Farmer', name: 'Venkata Rao', mandal: 'Kakinada' },
    to: { type: 'Vendor', name: 'East Coast Mart', mandal: 'Rajamahendravaram' },
    status: 'Delivered',
    expectedDelivery: '2023-09-25',
    actualDelivery: '2023-09-25',
    delay: { isDelayed: false, reason: null, duration: null }
  },
]

const farmerData: FarmerData[] = [
  { id: 1, name: 'Ravi Kumar', mandal: 'Anantapur', activeListings: 3, totalSales: 75000 },
  { id: 2, name: 'Lakshmi Devi', mandal: 'Tirupati', activeListings: 2, totalSales: 50000 },
  { id: 3, name: 'Venkata Rao', mandal: 'Kakinada', activeListings: 5, totalSales: 120000 },
  { id: 4, name: 'Suresh Reddy', mandal: 'Machilipatnam', activeListings: 1, totalSales: 30000 },
  { id: 5, name: 'Padma Lakshmi', mandal: 'Tenali', activeListings: 4, totalSales: 95000 },
]

const vendorData: VendorData[] = [
  { id: 1, name: 'AP Groceries', mandal: 'Vijayawada', totalPurchases: 150000, activeOrders: 3 },
  { id: 2, name: 'Andhra Farm Supplies', mandal: 'Guntur', totalPurchases: 200000, activeOrders: 5 },
  { id: 3, name: 'East Coast Mart', mandal: 'Rajamahendravaram', totalPurchases: 80000, activeOrders: 2 },
  { id: 4, name: 'Krishna Valley Supplies', mandal: 'Vijayawada', totalPurchases: 250000, activeOrders: 6 },
  { id: 5, name: 'Guntur Spice Market', mandal: 'Guntur', totalPurchases: 180000, activeOrders: 4 },
]

const produceData: ProduceData[] = [
  { id: 1, name: 'Tomatoes', category: 'Vegetables', totalTransactions: 500, totalValue: 250000 },
  { id: 2, name: 'Rice', category: 'Grains', totalTransactions: 300, totalValue: 600000 },
  { id: 3, name: 'Mangoes', category: 'Fruits', totalTransactions: 200, totalValue: 400000 },
  { id: 4, name: 'Chillies', category: 'Spices', totalTransactions: 150, totalValue: 75000 },
  { id: 5, name: 'Milk', category: 'Dairy', totalTransactions: 400, totalValue: 200000 },
]

export default function AdminDashboard() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')
  const [selectedMandal, setSelectedMandal] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [timeFilter, setTimeFilter] = useState<string>('all')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [language, setLanguage] = useState<Language>('en')
  const [activeView, setActiveView] = useState('overview')

  const t = translations[language]

  const filteredMandals = useMemo(() => {
    return mandalData.filter(mandal => 
      (selectedDistrict === '' || mandal.district === selectedDistrict) &&
      mandal.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [selectedDistrict, searchTerm])

  const filteredTransactionData = useMemo(() => {
    if (selectedMandal === '') {
      return transactionData
    }
    return transactionData.filter(data => data.mandal === selectedMandal)
  }, [selectedMandal])

  const handleDistrictChange = useCallback((value: string) => {
    setSelectedDistrict(value)
    setSelectedMandal('')
  }, [])

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleExportData = useCallback(() => {
    console.log('Exporting data...')
    // Implement export functionality here
  }, [])

  const handleTimeFilterChange = useCallback((value: string) => {
    setTimeFilter(value)
    if (value !== 'custom') {
      setStartDate('')
      setEndDate('')
    }
    console.log(`Filtering transactions for: ${value}`)
    // Implement time filtering logic here
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'te' : 'en')
  }, [])

  useEffect(() => {
    setSelectedDistrict('')
    setSelectedMandal('')
    setTimeFilter('all')
  }, [])

  return (
    <div className={styles.dashboard}>
      <div className={styles.backgroundOverlay}></div>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{t.title}</h1>
          <div className={styles.headerButtons}>
            <Button onClick={toggleLanguage} variant="outline" size="sm" className={styles.languageButton}>
              <Languages className="mr-2 h-4 w-4" />
              {t.translate}
            </Button>
            <Button variant="outline" size="sm" className={styles.logoutButton}>
              <Globe className="mr-2 h-4 w-4" />
              {t.logout}
            </Button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.controls}>
          <div className={styles.selects}>
            <Select value={selectedDistrict} onValueChange={handleDistrictChange}>
              <SelectTrigger className={styles.select}>
                <SelectValue placeholder={t.allDistricts} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t.allDistricts}</SelectItem>
                {districtData.map(district => (
                  <SelectItem key={district.id} value={district.name}>{district.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedMandal} onValueChange={setSelectedMandal}>
              <SelectTrigger className={styles.select}>
                <SelectValue placeholder={t.allMandals} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t.allMandals}</SelectItem>
                {filteredMandals.map(mandal => (
                  <SelectItem key={mandal.id} value={mandal.name}>{mandal.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={timeFilter} onValueChange={handleTimeFilterChange}>
              <SelectTrigger className={styles.select}>
                <SelectValue placeholder={t.selectTimePeriod} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
                <SelectItem value="last90days">Last 90 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className={styles.search}>
            <Input
              type="text"
              placeholder={t.searchMandals}
              value={searchTerm}
              onChange={handleSearch}
              className={styles.searchInput}
            />
            <Button onClick={handleExportData} className={styles.exportButton}>
              <Download className="mr-2 h-4 w-4" />
              {t.exportData}
            </Button>
          </div>
        </div>

        {timeFilter === 'custom' && (
          <div className={styles.dateRange}>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={styles.dateInput}
            />
            <span className={styles.dateRangeSeparator}>to</span>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={styles.dateInput}
            />
          </div>
        )}

        <Tabs defaultValue="transactions" className={styles.tabs}>
          <TabsList className={styles.tabsList}>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
            <TabsTrigger value="logistics">Logistics</TabsTrigger>
          </TabsList>
          <TabsContent value="transactions" className={styles.tabContent}>
            <div className={styles.sideHeadings}>
              <Button variant="ghost" className={styles.sideHeading} onClick={() => setActiveView('overview')}>
                Transactions Overview
              </Button>
              <Button variant="ghost" className={styles.sideHeading} onClick={() => setActiveView('byFarmer')}>
                Transactions by Farmer
              </Button>
              <Button variant="ghost" className={styles.sideHeading} onClick={() => setActiveView('byVendor')}>
                Transactions by Vendor
              </Button>
              <Button variant="ghost" className={styles.sideHeading} onClick={() => setActiveView('byProduce')}>
                Transactions by Produce
              </Button>
            </div>
            <div className={styles.contentArea}>
              {activeView === 'overview' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Transactions Overview</CardTitle>
                  </CardHeader>
                  <CardContent className={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={filteredTransactionData}>
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
              )}
              {activeView === 'byFarmer' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Transactions by Farmer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Active Listings</TableHead>
                          <TableHead>Total Sales</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {farmerData.map((farmer) => (
                          <TableRow key={farmer.id}>
                            <TableCell>{farmer.name}</TableCell>
                            <TableCell>{farmer.mandal}</TableCell>
                            <TableCell>{farmer.activeListings}</TableCell>
                            <TableCell>₹{farmer.totalSales.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
              {activeView === 'byVendor' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Transactions by Vendor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Total Purchases</TableHead>
                          <TableHead>Active Orders</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vendorData.map((vendor) => (
                          <TableRow key={vendor.id}>
                            <TableCell>{vendor.name}</TableCell>
                            <TableCell>{vendor.mandal}</TableCell>
                            <TableCell>₹{vendor.totalPurchases.toLocaleString()}</TableCell>
                            <TableCell>{vendor.activeOrders}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
              {activeView === 'byProduce' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Transactions by Produce</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Total Transactions</TableHead>
                          <TableHead>Total Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {produceData.map((produce) => (
                          <TableRow key={produce.id}>
                            <TableCell>{produce.name}</TableCell>
                            <TableCell>{produce.category}</TableCell>
                            <TableCell>{produce.totalTransactions}</TableCell>
                            <TableCell>₹{produce.totalValue.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          <TabsContent value="complaints" className={styles.tabContent}>
            <Card>
              <CardHeader>
                <CardTitle>{t.complaintLog}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={styles.complaintList}>
                  {complaintData.map(complaint => (
                    <div key={complaint.id} className={styles.complaintItem}>
                      <div className={styles.complaintInfo}>
                        <span className={styles.complaintMandal}>{complaint.mandal}</span>
                        <span className={styles.complaintType}>{complaint.type}</span>
                      </div>
                      <Button 
                        className={`${styles.complaintStatus} ${styles[complaint.status.toLowerCase().replace(/\s+/g, '')]}`}
                      >
                        {complaint.status}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="logistics" className={styles.tabContent}>
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
                      <p className={styles.logisticValue}>{logisticsData.filter(order => order.status === 'In Transit').length}</p>
                    </div>
                  </div>
                  <div className={styles.logisticItem}>
                    <Clock className={styles.logisticIcon} />
                    <div>
                      <p className={styles.logisticLabel}>Delayed Shipments</p>
                      <p className={styles.logisticValue}>{logisticsData.filter(order => order.delay.isDelayed).length}</p>
                    </div>
                  </div>
                  <div className={styles.logisticItem}>
                    <Truck className={styles.logisticIcon} />
                    <div>
                      <p className={styles.logisticLabel}>Completed Deliveries</p>
                      <p className={styles.logisticValue}>{logisticsData.filter(order => order.status === 'Delivered').length}</p>
                    </div>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order Number</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Expected Delivery</TableHead>
                      <TableHead>Delay</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logisticsData.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.orderNumber}</TableCell>
                        <TableCell>
                          <div>{order.from.name}</div>
                          <div className={styles.cellSubtext}>{order.from.type}, {order.from.mandal}</div>
                        </TableCell>
                        <TableCell>
                          <div>{order.to.name}</div>
                          <div className={styles.cellSubtext}>{order.to.type}, {order.to.mandal}</div>
                        </TableCell>
                        <TableCell>
                          <span className={`${styles.statusBadge} ${styles[`status${order.status.replace(/\s+/g, '')}`]}`}>
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell>{order.expectedDelivery}</TableCell>
                        <TableCell>
                          {order.delay.isDelayed ? (
                            <div className={styles.delayText}>
                              {order.delay.reason} ({order.delay.duration})
                            </div>
                          ) : (
                            <span className={styles.onTimeText}>On Time</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}