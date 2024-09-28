'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Search, Filter, Star, Clock, TrendingUp, Sun, Droplets, Globe, Leaf, DollarSign, BarChart2, BookOpen, Cloud, CreditCard } from 'lucide-react'

// Import images
import Image from 'next/image'
import styles from './VendorDashboard.module.css'
import farmImage from '../assets/farm.jpg';
import bellpepperImage from '../assets/bellpepper.webp';
import capsicumImage from '../assets/capsicum.jpg';
import chilliImage from '../assets/chilli.webp';
import spinachImage from '../assets/spinach.webp';
import tomatoImage from '../assets/tomato.webp';
import potatoImage from '../assets/potato.webp';
import radishImage from '../assets/radish.webp';
import onionImage from '../assets/onion.webp';
import carrotImage from '../assets/carrot.jpg';

// Create a mapping between product names and their corresponding images
const productImages: { [key: string]: string } = {
  Farm: farmImage,
  Bellpepper: bellpepperImage,
  Onions: onionImage,
  Carrots: carrotImage,
  Capsicum: capsicumImage,
  Chilli: chilliImage,
  Spinach: spinachImage,
  Tomato: tomatoImage,
  Potato: potatoImage,
  Radish: radishImage,
};

// Function that selects the correct image based on the product name
const getProductImage = (productName: string) => {
  return productImages[productName] || '';
};

// Language translations
const translations = {
  english: {
    title: "Krishi Mitra - Vendor Portal",
    home: "Home",
    auctions: "Auctions",
    myBids: "My Bids",
    cart: "Cart",
    search: "Search products...",
    filterBy: "Filter by category",
    currentAuctions: "Current Auctions",
    pastPurchases: "Past Purchases",
    marketTrends: "Market Trends",
    weatherForecast: "Weather Forecast",
    soilHealth: "Soil Health",
    financialServices: "Financial Services",
    knowledgeHub: "Knowledge Hub",
    today: "Today",
    tomorrow: "Tomorrow",
    dayAfter: "Day After",
    product: "Product",
    quantity: "Quantity",
    price: "Price",
    date: "Date",
    farmer: "Farmer",
    currentBid: "Current Bid",
    yourBid: "Your bid",
    bid: "Bid",
    checkout: "Proceed to Checkout",
    total: "Total",
    remove: "Remove",
    viewDetails: "View Details",
    applyForLoan: "Apply for Loan",
    viewArticles: "View Articles",
    status: "Status",
    action: "Action",
    increaseBid: "Increase Bid",
    cancelBid: "Cancel Bid",
    winning: "Winning",
    outbid: "Outbid",
    payments: "Payments",
    accountBalance: "Account Balance",
    lastPayoutDate: "Last Payout Date",
    requestPayout: "Request Payout",
    addToCart: "Add to Cart",
    removeFromCart: "Remove from Cart",
    emptyCart: "Your cart is empty",
  },
  telugu: {
    title: "కృషి మిత్ర - విక్రేత పోర్టల్",
    home: "హోమ్",
    auctions: "వేలాలు",
    myBids: "నా బిడ్లు",
    cart: "కార్ట్",
    search: "ఉత్పత్తులను శోధించండి...",
    filterBy: "వర్గం ద్వారా ఫిల్టర్ చేయండి",
    currentAuctions: "ప్రస్తుత వేలాలు",
    pastPurchases: "గత కొనుగోళ్లు",
    marketTrends: "మార్కెట్ ధోరణులు",
    weatherForecast: "వాతావరణ సూచన",
    soilHealth: "నేల ఆరోగ్యం",
    financialServices: "ఆర్థిక సేవలు",
    knowledgeHub: "జ్ఞాన కేంద్రం",
    today: "ఈరోజు",
    tomorrow: "రేపు",
    dayAfter: "ఆ తరువాత రోజు",
    product: "ఉత్పత్తి",
    quantity: "పరిమాణం",
    price: "ధర",
    date: "తేదీ",
    farmer: "రైతు",
    currentBid: "ప్రస్తుత బిడ్",
    yourBid: "మీ బిడ్",
    bid: "బిడ్",
    checkout: "చెక్అవుట్ కొనసాగించండి",
    total: "మొత్తం",
    remove: "తొలగించు",
    viewDetails: "వివరాలు చూడండి",
    applyForLoan: "రుణం కోసం దరఖాస్తు చేయండి",
    viewArticles: "వ్యాసాలు చూడండి",
    status: "స్థితి",
    action: "చర్య",
    increaseBid: "బిడ్ పెంచండి",
    cancelBid: "బిడ్ రద్దు చేయండి",
    winning: "గెలుస్తున్నారు",
    outbid: "ఓడిపోయారు",
    payments: "చెల్లింపులు",
    accountBalance: "ఖాతా నిల్వ",
    lastPayoutDate: "చివరి చెల్లింపు తేదీ",
    requestPayout: "చెల్లింపు అభ్యర్థించండి",
    addToCart: "కార్ట్‌కి జోడించండి",
    removeFromCart: "కార్ట్ నుండి తీసివేయండి",
    emptyCart: "మీ కార్ట్ ఖాళీగా ఉంది",
  }
}

// Mock function to simulate payment processing
const processPayment = (method: string, amount: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random() > 0.1) // 90% success rate
    }, 2000)
  })
}

function PaymentGateway({ amount }: { amount: number }) {
  const [upiId, setUpiId] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleUPIPayment = async () => {
    if (!upiId) {
      alert("Please enter a valid UPI ID")
      return
    }
    setIsProcessing(true)
    const success = await processPayment('UPI', amount)
    setIsProcessing(false)
    if (success) {
      alert(`₹${amount.toFixed(2)} paid successfully via UPI`)
    } else {
      alert("Payment failed. Please try again or use a different payment method")
    }
  }

  const handlePhonePePayment = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit phone number")
      return
    }
    setIsProcessing(true)
    const success = await processPayment('PhonePe', amount)
    setIsProcessing(false)
    if (success) {
      alert(`₹${amount.toFixed(2)} paid successfully via PhonePe`)
    } else {
      alert("Payment failed. Please try again or use a different payment method")
    }
  }

  return (
    <Card className={styles.paymentGateway}>
      <CardHeader>
        <CardTitle className={styles.paymentTitle}>Payment Gateway</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={styles.paymentAmount}>
          <p className={styles.paymentLabel}>Amount to Pay:</p>
          <p className={styles.paymentValue}>₹{amount.toFixed(2)}</p>
        </div>
        <Tabs defaultValue="upi" className={styles.paymentTabs}>
          <TabsList className={styles.paymentTabsList}>
            <TabsTrigger value="upi">UPI</TabsTrigger>
            <TabsTrigger value="phonepe">PhonePe</TabsTrigger>
          </TabsList>
          <TabsContent value="upi">
            <div className={styles.paymentForm}>
              <div className={styles.inputGroup}>
                <label htmlFor="upi-id" className={styles.inputLabel}>UPI ID</label>
                <Input
                  id="upi-id"
                  placeholder="Enter your UPI ID"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className={styles.input}
                />
              </div>
              <Button 
                className={styles.paymentButton}
                onClick={handleUPIPayment}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Pay with UPI"}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="phonepe">
            <div className={styles.paymentForm}>
              <div className={styles.inputGroup}>
                <label htmlFor="phone-number" className={styles.inputLabel}>Phone Number</label>
                <Input
                  id="phone-number"
                  placeholder="Enter your PhonePe number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={styles.input}
                />
              </div>
              <Button 
                className={`${styles.paymentButton} ${styles.phonePeButton}`}
                onClick={handlePhonePePayment}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Pay with PhonePe"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        <div className={styles.otherPaymentOptions}>
          <p className={styles.otherPaymentLabel}>Other Payment Options</p>
          <div className={styles.otherPaymentButtons}>
            <Button variant="outline" className={styles.otherPaymentButton}>
              <CreditCard className={styles.otherPaymentIcon} />
              Credit Card
            </Button>
            <Button variant="outline" className={styles.otherPaymentButton}>
              <Image src="/placeholder.svg?height=16&width=16&text=Net" alt="Net Banking" width={16} height={16} className={styles.otherPaymentIcon} />
              Net Banking
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function VendorDashboard() {
  const [language, setLanguage] = useState('english')
  const t = translations[language]

  const [products, setProducts] = useState([
    { id: 1, name: 'Potatoes', currentBid: 15.50, quantity: '500 kg', endTime: 9000, category: 'Root Vegetables', farmer: 'Farmer A', rating: 4.5 },
    { id: 2, name: 'Tomatoes', currentBid: 20.75, quantity: '300 kg', endTime: 6300, category: 'Fruits', farmer: 'Farmer B', rating: 4.2 },
    { id: 3, name: 'Onions', currentBid: 18.00, quantity: '400 kg', endTime: 11700, category: 'Root Vegetables', farmer: 'Farmer C', rating: 4.8 },
    { id: 4, name: 'Carrots', currentBid: 12.25, quantity: '250 kg', endTime: 14400, category: 'Root Vegetables', farmer: 'Farmer A', rating: 4.5 },
    { id: 5, name: 'Spinach', currentBid: 25.00, quantity: '150 kg', endTime: 8100, category: 'Leafy Greens', farmer: 'Farmer D', rating: 4.0 },
    { id: 6, name: 'Cauliflower', currentBid: 22.50, quantity: '200 kg', endTime: 12600, category: 'Brassicas', farmer: 'Farmer B', rating: 4.2 },
  ])

  const [pastPurchases, setPastPurchases] = useState([
    { id: 101, name: 'Rice', quantity: '1000 kg', price: 30000, date: '2023-05-15', farmer: 'Farmer E' },
    { id: 102, name: 'Wheat', quantity: '800 kg', price: 24000, date: '2023-05-10', farmer: 'Farmer F' },
    { id: 103, name: 'Corn', quantity: '600 kg', price: 15000, date: '2023-05-05', farmer: 'Farmer G' },
  ])

  const [myBids, setMyBids] = useState([
    { id: 201, productId: 1, name: 'Potatoes', bidAmount: 15.50, quantity: '500 kg', endTime: 9000, status: 'winning' },
    { id: 202, productId: 2, name: 'Tomatoes', bidAmount: 20.00, quantity: '300 kg', endTime: 6300, status: 'outbid' },
    { id: 203, productId: 3, name: 'Onions', bidAmount: 18.00, quantity: '400 kg', endTime: 11700, status: 'winning' },
  ])

  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [bidAmount, setBidAmount] = useState('')
  const [showPaymentGateway, setShowPaymentGateway] = useState(false)
  const [accountBalance, setAccountBalance] = useState(5000) // Initialize with a mock balance

  useEffect(() => {
    const timer = setInterval(() => {
      setProducts(prevProducts => 
        prevProducts.map(product => ({
          ...product,
          endTime: Math.max(0, product.endTime - 1)
        }))
      )
      setMyBids(prevBids => 
        prevBids.map(bid => ({
          ...bid,
          endTime: Math.max(0, bid.endTime - 1)
        }))
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleBid = (productId: number) => {
    const newBidAmount = parseFloat(bidAmount)
    if (isNaN(newBidAmount)) return

    setProducts(products.map(product => 
      product.id === productId ? { ...product, currentBid: newBidAmount } : product
    ))
    setMyBids([...myBids, { 
      id: Date.now(), 
      productId, 
      name: products.find(p => p.id === productId)?.name || '',
      bidAmount: newBidAmount, 
      quantity: products.find(p => p.id === productId)?.quantity || '',
      endTime: products.find(p => p.id === productId)?.endTime || 0,
      status: 'winning' 
    }])
    setBidAmount('')
  }

  const handleIncreaseBid = (bidId: number) => {
    setMyBids(myBids.map(bid => 
      bid.id === bidId ? { ...bid, bidAmount: bid.bidAmount + 1, status: 'winning' } : bid
    ))
  }

  const handleCancelBid = (bidId: number) => {
    setMyBids(myBids.filter(bid => bid.id !== bidId))
  }

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: parseFloat(item.quantity) + parseFloat(product.quantity), total: (parseFloat(item.quantity) + parseFloat(product.quantity)) * item.currentBid }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: parseFloat(product.quantity), total: parseFloat(product.quantity) * product.currentBid }])
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === '' || product.category === filterCategory)
  )

  const totalAmount = cart.reduce((sum, item) => sum + item.total, 0)

  const handleCheckout = () => {
    console.log('Proceeding to checkout with total amount:', totalAmount)
    alert(`Checkout initiated for ₹${totalAmount.toFixed(2)}`)
    setCart([]) // Clear the cart after checkout
  }

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'english' ? 'telugu' : 'english')
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours}h ${minutes}m ${remainingSeconds}s`
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.backgroundOverlay}></div>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{t.title}</h1>
          <nav className={styles.nav}>
            <Button variant="ghost" className={styles.navButton}>{t.home}</Button>
            <Button variant="ghost" className={styles.navButton}>{t.auctions}</Button>
            <Button variant="ghost" className={styles.navButton}>{t.myBids}</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className={styles.cartButton}>
                  <ShoppingCart className={styles.cartIcon} />
                  {t.cart} ({cart.length})
                </Button>
              </DialogTrigger>
              <DialogContent className={styles.cartDialog}>
                <DialogHeader>
                  <DialogTitle>{t.cart}</DialogTitle>
                </DialogHeader>
                {cart.length === 0 ? (
                  <p className={styles.emptyCart}>{t.emptyCart}</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className={styles.cartItem}>
                        <span>{item.name} - ₹{item.currentBid.toFixed(2)} x {item.quantity}</span>
                        <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.id)}>{t.remove}</Button>
                      </div>
                    ))}
                    <div className={styles.cartTotal}>
                      <strong>{t.total}: ₹{totalAmount.toFixed(2)}</strong>
                    </div>
                    <Button className={styles.checkoutButton} onClick={handleCheckout}>{t.checkout}</Button>
                  </>
                )}
              </DialogContent>
            </Dialog>
            <Button variant="outline" className={styles.languageButton} onClick={toggleLanguage}>
              <Globe className={styles.languageIcon} />
              {language === 'english' ? 'తెలుగు' : 'English'}
            </Button>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.searchFilter}>
          <Input
            type="text"
            placeholder={t.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className={styles.filterTrigger}>
              <SelectValue placeholder={t.filterBy} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="Root Vegetables">Root Vegetables</SelectItem>
              <SelectItem value="Fruits">Fruits</SelectItem>
              <SelectItem value="Leafy Greens">Leafy Greens</SelectItem>
              <SelectItem value="Brassicas">Brassicas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="auctions" className={styles.tabs}>
          <TabsList className={styles.tabsList}>
            <TabsTrigger value="auctions" className={styles.tabsTrigger}>{t.currentAuctions}</TabsTrigger>
            <TabsTrigger value="myBids" className={styles.tabsTrigger}>{t.myBids}</TabsTrigger>
            <TabsTrigger value="purchases" className={styles.tabsTrigger}>{t.pastPurchases}</TabsTrigger>
          </TabsList>
          <TabsContent value="auctions" className={styles.tabsContent}>
            <div className={styles.productGrid}>
              {filteredProducts.map(product => (
                <Card key={product.id} className={styles.productCard}>
                  <CardHeader>
                    <CardTitle className={styles.productTitle}>{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={styles.productImage}>
                      <Image
                        src={getProductImage(product.name)}
                        alt={product.name}
                        width={200}
                        height={200}
                        className={styles.productImg}
                      />
                      <div className={styles.productRating}>
                        <Star className={styles.starIcon} />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <div className={styles.productDetails}>
                      <div className={styles.productMeta}>
                        <Badge variant="secondary" className={styles.categoryBadge}>{product.category}</Badge>
                        <div className={styles.timeLeft}>
                          <Clock className={styles.clockIcon} />
                          <span>{formatTime(product.endTime)} left</span>
                        </div>
                      </div>
                      <p className={styles.currentBid}>{t.currentBid}: ₹{product.currentBid.toFixed(2)}/kg</p>
                      <p>{t.quantity}: {product.quantity}</p>
                      <p>{t.farmer}: {product.farmer}</p>
                      <div className={styles.bidActions}>
                        <Input
                          type="number"
                          placeholder={t.yourBid}
                          className={styles.bidInput}
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                        />
                        <Button onClick={() => handleBid(product.id)} className={styles.bidButton}>{t.bid}</Button>
                        <Button variant="secondary" onClick={() => addToCart(product)} className={styles.addToCartButton}>
                          {t.addToCart}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="myBids" className={styles.tabsContent}>
            <Card className={styles.myBidsCard}>
              <CardHeader>
                <CardTitle className={styles.myBidsTitle}>{t.myBids}</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.product}</TableHead>
                      <TableHead>{t.quantity}</TableHead>
                      <TableHead>{t.yourBid}</TableHead>
                      <TableHead>{t.status}</TableHead>
                      <TableHead>{t.action}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myBids.map(bid => (
                      <TableRow key={bid.id} className={styles.bidRow}>
                        <TableCell>{bid.name}</TableCell>
                        <TableCell>{bid.quantity}</TableCell>
                        <TableCell>₹{bid.bidAmount.toFixed(2)}/kg</TableCell>
                        <TableCell>
                          <Badge variant={bid.status === 'winning' ? 'success' : 'destructive'}>
                            {t[bid.status]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className={styles.bidActions}>
                            <Button size="sm" onClick={() => handleIncreaseBid(bid.id)}>{t.increaseBid}</Button>
                            <Button size="sm" variant="destructive" onClick={() => handleCancelBid(bid.id)}>{t.cancelBid}</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="purchases" className={styles.tabsContent}>
            <Card className={styles.purchasesCard}>
              <CardHeader>
                <CardTitle className={styles.purchasesTitle}>{t.pastPurchases}</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.product}</TableHead>
                      <TableHead>{t.quantity}</TableHead>
                      <TableHead>{t.price}</TableHead>
                      <TableHead>{t.date}</TableHead>
                      <TableHead>{t.farmer}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastPurchases.map(purchase => (
                      <TableRow key={purchase.id} className={styles.purchaseRow}>
                        <TableCell>{purchase.name}</TableCell>
                        <TableCell>{purchase.quantity}</TableCell>
                        <TableCell>₹{purchase.price.toFixed(2)}</TableCell>
                        <TableCell>{purchase.date}</TableCell>
                        <TableCell>{purchase.farmer}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className={styles.infoGrid}>
          <Card className={styles.infoCard}>
            <CardHeader>
              <CardTitle className={styles.infoTitle}>{t.marketTrends}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.trendItem}>
                <TrendingUp className={styles.trendIcon} />
                <span>Potato prices are expected to rise in the coming week</span>
              </div>
              <div className={styles.trendItem}>
                <TrendingUp className={`${styles.trendIcon} ${styles.trendDown}`} />
                <span>Tomato supply is increasing, prices may decrease</span>
              </div>
              <Button variant="link" className={styles.viewDetailsButton}>{t.viewDetails}</Button>
            </CardContent>
          </Card>

          <Card className={styles.infoCard}>
            <CardHeader>
              <CardTitle className={styles.infoTitle}>{t.weatherForecast}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.weatherItem}>
                <span>{t.today}:</span>
                <div className={styles.weatherInfo}>
                  <Sun className={styles.weatherIcon} />
                  <span>32°C</span>
                </div>
              </div>
              <div className={styles.weatherItem}>
                <span>{t.tomorrow}:</span>
                <div className={styles.weatherInfo}>
                  <Cloud className={styles.weatherIcon} />
                  <span>28°C</span>
                </div>
              </div>
              <div className={styles.weatherItem}>
                <span>{t.dayAfter}:</span>
                <div className={styles.weatherInfo}>
                  <Droplets className={styles.weatherIcon} />
                  <span>26°C</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={styles.infoCard}>
            <CardHeader>
              <CardTitle className={styles.infoTitle}>{t.soilHealth}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.soilItem}>
                <Leaf className={`${styles.soilIcon} ${styles.soilGood}`} />
                <span>Nitrogen: Good</span>
              </div>
              <div className={styles.soilItem}>
                <Leaf className={`${styles.soilIcon} ${styles.soilModerate}`} />
                <span>Phosphorus: Moderate</span>
              </div>
              <div className={styles.soilItem}>
                <Leaf className={`${styles.soilIcon} ${styles.soilGood}`} />
                <span>Potassium: Good</span>
              </div>
              <Button variant="link" className={styles.viewDetailsButton}>{t.viewDetails}</Button>
            </CardContent>
          </Card>

          <Card className={styles.infoCard}>
            <CardHeader>
              <CardTitle className={styles.infoTitle}>{t.financialServices}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.financeItem}>
                <DollarSign className={styles.financeIcon} />
                <span>Crop Loans</span>
              </div>
              <div className={styles.financeItem}>
                <BarChart2 className={styles.financeIcon} />
                <span>Insurance</span>
              </div>
              <div className={styles.financeItem}>
                <BookOpen className={styles.financeIcon} />
                <span>Financial Literacy</span>
              </div>
              <Button variant="link" className={styles.applyLoanButton}>{t.applyForLoan}</Button>
            </CardContent>
          </Card>
        </div>

        <Card className={styles.knowledgeHub}>
          <CardHeader>
            <CardTitle className={styles.knowledgeHubTitle}>{t.knowledgeHub}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.knowledgeGrid}>
              <div className={styles.knowledgeItem}>
                <h3 className={styles.knowledgeItemTitle}>Sustainable Farming Practices</h3>
                <p className={styles.knowledgeItemDesc}>Learn about eco-friendly farming methods to improve soil health and crop yield.</p>
              </div>
              <div className={styles.knowledgeItem}>
                <h3 className={styles.knowledgeItemTitle}>Market Demand Forecasting</h3>
                <p className={styles.knowledgeItemDesc}>Understand market trends and predict demand for various crops.</p>
              </div>
              <div className={styles.knowledgeItem}>
                <h3 className={styles.knowledgeItemTitle}>Pest Management Techniques</h3>
                <p className={styles.knowledgeItemDesc}>Discover effective ways to protect your crops from pests and diseases.</p>
              </div>
            </div>
            <Button variant="link" className={styles.viewArticlesButton}>{t.viewArticles}</Button>
          </CardContent>
        </Card>

        <Card className={styles.payments}>
          <CardHeader>
            <CardTitle className={styles.paymentsTitle}>{t.payments}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.paymentInfo}>
              <div>
                <p className={styles.accountBalance}>
                  {t.accountBalance}: ₹{accountBalance.toFixed(2)}
                </p>
                <p className={styles.lastPayoutDate}>{t.lastPayoutDate}: 2023-06-15</p>
              </div>
              <Button 
                onClick={() => setShowPaymentGateway(true)} 
                className={styles.requestPayoutButton}
                disabled={accountBalance <= 0}
              >
                {t.requestPayout}
              </Button>
            </div>
            {showPaymentGateway && accountBalance > 0 && (
              <div className={styles.paymentGatewayWrapper}>
                <PaymentGateway amount={accountBalance} />
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; 2023 Krishi Mitra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}