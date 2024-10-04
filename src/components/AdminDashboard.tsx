import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Globe, Search, TrendingUp, AlertTriangle, Truck, Download, Calendar, Clock, ArrowRight, Languages } from 'lucide-react'
import { translations, Language } from '@/locales/translations'
import { districtData, mandalData } from '@/data/mandalData'
import styles from './AdminDashboard.module.css'

// Define types for your data
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

// Mock data (you would typically fetch this from an API)
const transactionData: TransactionData[] = [
  { mandal: 'Anantapur', transactions: 150, value: 75000 },
  { mandal: 'Dharmavaram', transactions: 120, value: 60000 },
  { mandal: 'Madanapalle', transactions: 200, value: 100000 },
  { mandal: 'Tirupati', transactions: 180, value: 90000 },
  { mandal: 'Kakinada', transactions: 160, value: 80000 },
  { mandal: 'Rajamahendravaram', transactions: 140, value: 70000 },
  { mandal: 'Guntur', transactions: 220, value: 110000 },
  { mandal: 'Tenali', transactions: 130, value: 65000 },
  { mandal: 'Vijayawada', transactions: 250, value: 125000 },
  { mandal: 'Machilipatnam', transactions: 110, value: 55000 },
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
  { 
    id: 4, 
    orderNumber: 'ORD004',
    from: { type: 'Vendor', name: 'Krishna Valley Supplies', mandal: 'Vijayawada' },
    to: { type: 'Farmer', name: 'Suresh Reddy', mandal: 'Machilipatnam' },
    status: 'Delayed',
    expectedDelivery: '2023-09-27',
    actualDelivery: null,
    delay: { isDelayed: true, reason: 'Vehicle breakdown', duration: '1 day' }
  },
  { 
    id: 5, 
    orderNumber: 'ORD005',
    from: { type: 'Farmer', name: 'Padma Lakshmi', mandal: 'Tenali' },
    to: { type: 'Vendor', name: 'Guntur Spice Market', mandal: 'Guntur' },
    status: 'In Transit',
    expectedDelivery: '2023-10-01',
    actualDelivery: null,
    delay: { isDelayed: false, reason: null, duration: null }
  },
]

export default function AdminDashboard() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')
  const [selectedMandal, setSelectedMandal] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [timeFilter, setTimeFilter] = useState<string>('all')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [language, setLanguage] = useState<Language>('en')

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

  const currentMandalData = useMemo(() => {
    if (selectedMandal === '') {
      const totalTransactions = transactionData.reduce((sum, data) => sum + data.transactions, 0)
      const totalValue = transactionData.reduce((sum, data) => sum + data.value, 0)
      return { transactions: totalTransactions, value: totalValue }
    }
    return transactionData.find(data => data.mandal === selectedMandal) || { transactions: 0, value: 0 }
  }, [selectedMandal])

  const filteredLogisticsData = useMemo(() => {
    return logisticsData.filter(order => 
      (selectedMandal === '' || order.from.mandal === selectedMandal || order.to.mandal === selectedMandal)
    )
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

  // Set default filters on component mount
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

        <div className={styles.statsGrid}>
          <Card className={styles.statCard}>
            <CardHeader className={styles.cardHeader}>
              <CardTitle className={styles.cardTitle}>{t.totalTransactions}</CardTitle>
              <TrendingUp className={styles.cardIcon} />
            </CardHeader>
            <CardContent>
              <div className={styles.statValue}>{currentMandalData.transactions}</div>
              <p className={styles.statChange}>
                +20.1% from last period
              </p>
            </CardContent>
          </Card>
          <Card className={styles.statCard}>
            <CardHeader className={styles.cardHeader}>
              <CardTitle className={styles.cardTitle}>{t.transactionValue}</CardTitle>
              <TrendingUp className={styles.cardIcon} />
            </CardHeader>
            <CardContent>
              <div className={styles.statValue}>₹{currentMandalData.value.toLocaleString()}</div>
              <p className={styles.statChange}>
                +15.5% from last period
              </p>
            </CardContent>
          </Card>
          <Card className={styles.statCard}>
            <CardHeader className={styles.cardHeader}>
              <CardTitle className={styles.cardTitle}>{t.activeComplaints}</CardTitle>
              <AlertTriangle className={styles.cardIcon} />
            </CardHeader>
            <CardContent>
              <div className={styles.statValue}>{complaintData.filter(c => c.status === 'Open').length}</div>
              <p className={styles.statChange}>
                -3.2% from last period
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className={styles.tabs}>
          <TabsList className={styles.tabsList}>
            <TabsTrigger value="transactions">{t.transactions}</TabsTrigger>
            <TabsTrigger value="complaints">{t.complaints}</TabsTrigger>
            <TabsTrigger value="logistics">{t.logistics}</TabsTrigger>
          </TabsList>
          <TabsContent value="transactions" className={styles.tabContent}>
            <Card>
              <CardHeader>
                <CardTitle>{t.transactionOverview}</CardTitle>
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
                <CardTitle>{t.logisticsOverview}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={styles.logisticsStats}>
                  <div className={styles.logisticItem}>
                    <Truck className={styles.logisticIcon} />
                    <div>
                      <p className={styles.logisticLabel}>{t.activeDeliveries}</p>
                      <p className={styles.logisticValue}>{filteredLogisticsData.filter(order => order.status === 'In Transit').length}</p>
                    </div>
                  </div>
                  <div className={styles.logisticItem}>
                    <Clock className={styles.logisticIcon} />
                    <div>
                      <p className={styles.logisticLabel}>{t.delayedShipments}</p>
                      <p className={styles.logisticValue}>{filteredLogisticsData.filter(order => order.delay.isDelayed).length}</p>
                    </div>
                  </div>
                  <div className={styles.logisticItem}>
                    <Truck className={styles.logisticIcon} />
                    <div>
                      <p className={styles.logisticLabel}>{t.completedDeliveries}</p>
                      <p className={styles.logisticValue}>{filteredLogisticsData.filter(order => order.status === 'Delivered').length}</p>
                    </div>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.orderNumber}</TableHead>
                      <TableHead>{t.from}</TableHead>
                      <TableHead>{t.to}</TableHead>
                      <TableHead>{t.status}</TableHead>
                      <TableHead>{t.expectedDelivery}</TableHead>
                      <TableHead>{t.delay}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogisticsData.map(order => (
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
                            <span className={styles.onTimeText}>{t.onTime}</span>
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