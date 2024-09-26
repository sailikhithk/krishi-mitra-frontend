'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Search, Filter, Star, Clock, TrendingUp, Sun, Droplets, Globe } from 'lucide-react'
import Image from 'next/image'
import './VendorDashboard.css'

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
  }
}

const VendorDashboard: React.FC = () => {
  const [language, setLanguage] = useState('english')
  const t = translations[language]

  const [products, setProducts] = useState([
    { id: 1, name: 'Potatoes', currentBid: 15.50, quantity: '500 kg', endTime: '2h 30m', category: 'Root Vegetables', farmer: 'Farmer A', rating: 4.5 },
    { id: 2, name: 'Tomatoes', currentBid: 20.75, quantity: '300 kg', endTime: '1h 45m', category: 'Fruits', farmer: 'Farmer B', rating: 4.2 },
    { id: 3, name: 'Onions', currentBid: 18.00, quantity: '400 kg', endTime: '3h 15m', category: 'Root Vegetables', farmer: 'Farmer C', rating: 4.8 },
    { id: 4, name: 'Carrots', currentBid: 12.25, quantity: '250 kg', endTime: '4h 00m', category: 'Root Vegetables', farmer: 'Farmer A', rating: 4.5 },
    { id: 5, name: 'Spinach', currentBid: 25.00, quantity: '150 kg', endTime: '2h 15m', category: 'Leafy Greens', farmer: 'Farmer D', rating: 4.0 },
    { id: 6, name: 'Cauliflower', currentBid: 22.50, quantity: '200 kg', endTime: '3h 30m', category: 'Brassicas', farmer: 'Farmer B', rating: 4.2 },
  ])

  const [pastPurchases, setPastPurchases] = useState([
    { id: 101, name: 'Rice', quantity: '1000 kg', price: 30000, date: '2023-05-15', farmer: 'Farmer E' },
    { id: 102, name: 'Wheat', quantity: '800 kg', price: 24000, date: '2023-05-10', farmer: 'Farmer F' },
    { id: 103, name: 'Corn', quantity: '600 kg', price: 15000, date: '2023-05-05', farmer: 'Farmer G' },
  ])

  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [bidAmount, setBidAmount] = useState('')

  const handleBid = (productId: number) => {
    const newBidAmount = parseFloat(bidAmount)
    if (isNaN(newBidAmount)) return

    setProducts(products.map(product => 
      product.id === productId ? { ...product, currentBid: newBidAmount } : product
    ))
    setBidAmount('')
  }

  const addToCart = (product) => {
    setCart([...cart, { ...product, bidAmount: product.currentBid }])
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === '' || product.category === filterCategory)
  )

  const totalAmount = cart.reduce((sum, item) => sum + (item.bidAmount * parseFloat(item.quantity)), 0)

  const handleCheckout = () => {
    console.log('Proceeding to checkout with total amount:', totalAmount)
  }

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'english' ? 'telugu' : 'english')
  }

  return (
    <div className="vendor-dashboard">
      <header className="dashboard-header">
        <h1>{t.title}</h1>
        <nav>
          <Button variant="ghost">{t.home}</Button>
          <Button variant="ghost">{t.auctions}</Button>
          <Button variant="ghost">{t.myBids}</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <ShoppingCart className="mr-2 h-4 w-4" />
                {t.cart} ({cart.length})
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t.cart}</DialogTitle>
              </DialogHeader>
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <span>{item.name} - ₹{item.bidAmount.toFixed(2)} x {item.quantity}</span>
                  <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.id)}>{t.remove}</Button>
                </div>
              ))}
              <div className="cart-total">
                <strong>{t.total}: ₹{totalAmount.toFixed(2)}</strong>
              </div>
              <Button className="checkout-button" onClick={handleCheckout}>{t.checkout}</Button>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={toggleLanguage}>
            <Globe className="mr-2 h-4 w-4" />
            {language === 'english' ? 'తెలుగు' : 'English'}
          </Button>
        </nav>
      </header>

      <main>
        <div className="search-filter">
          <Input
            type="text"
            placeholder={t.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger>
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

        <Tabs defaultValue="auctions">
          <TabsList>
            <TabsTrigger value="auctions">{t.currentAuctions}</TabsTrigger>
            <TabsTrigger value="purchases">{t.pastPurchases}</TabsTrigger>
          </TabsList>
          <TabsContent value="auctions">
            <div className="product-grid">
              {filteredProducts.map(product => (
                <Card key={product.id}>
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="product-image">
                      <Image
                        src={`/placeholder.svg?height=200&width=200&text=${product.name}`}
                        alt={product.name}
                        width={200}
                        height={200}
                      />
                      <div className="product-rating">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <div className="product-details">
                      <Badge>{product.category}</Badge>
                      <div className="product-time">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{product.endTime} left</span>
                      </div>
                      <p>{t.currentBid}: ₹{product.currentBid.toFixed(2)}/kg</p>
                      <p>{t.quantity}: {product.quantity}</p>
                      <p>{t.farmer}: {product.farmer}</p>
                      <div className="bid-controls">
                        <Input
                          type="number"
                          placeholder={t.yourBid}
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                        />
                        <Button onClick={() => handleBid(product.id)}>{t.bid}</Button>
                        <Button variant="secondary" onClick={() => addToCart(product)}>
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="purchases">
            <Card>
              <CardHeader>
                <CardTitle>{t.pastPurchases}</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th>{t.product}</th>
                      <th>{t.quantity}</th>
                      <th>{t.price}</th>
                      <th>{t.date}</th>
                      <th>{t.farmer}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastPurchases.map(purchase => (
                      <tr key={purchase.id}>
                        <td>{purchase.name}</td>
                        <td>{purchase.quantity}</td>
                        <td>₹{purchase.price.toFixed(2)}</td>
                        <td>{purchase.date}</td>
                        <td>{purchase.farmer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="market-trends">
          <CardHeader>
            <CardTitle>{t.marketTrends}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="trend-item">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <span>Potato prices are expected to rise in the coming week</span>
            </div>
            <div className="trend-item">
              <TrendingUp className="w-6 h-6 text-red-600 transform rotate-180" />
              <span>Tomato supply is increasing, prices may decrease</span>
            </div>
          </CardContent>
        </Card>

        <Card className="weather-forecast">
          <CardHeader>
            <CardTitle>{t.weatherForecast}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="weather-days">
              <div className="weather-day">
                <Sun className="w-10 h-10 text-yellow-400" />
                <p>{t.today}</p>
                <p>32°C</p>
              </div>
              <div className="weather-day">
                <Droplets className="w-10 h-10 text-blue-400" />
                <p>{t.tomorrow}</p>
                <p>28°C</p>
              </div>
              <div className="weather-day">
                <Sun className="w-10 h-10 text-yellow-400" />
                <p>{t.dayAfter}</p>
                <p>30°C</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default VendorDashboard;