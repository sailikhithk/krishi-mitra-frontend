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
import { ShoppingCart, Search, Filter, Star, Clock, TrendingUp, Sun, Droplets, Globe } from 'lucide-react'
import Image from 'next/image'

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

export default function EnhancedVendorPortalWithLanguage() {
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
    <div className="min-h-screen bg-gradient-to-br from-[#e8f3e8] to-[#c8e6c9] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[url('/placeholder.svg?height=1000&width=1000&text=Indian+Farm+Background')] opacity-10 blur-sm animate-slow-spin"></div>
        <div className="absolute top-10 left-10 text-6xl text-green-800 opacity-20 transform rotate-[-15deg]">కృషి మిత్ర</div>
        <div className="absolute bottom-10 right-10 text-6xl text-green-800 opacity-20 transform rotate-[15deg]">Krishi Mitra</div>
      </div>

      <header className="bg-gradient-to-r from-[#2e7d32] to-[#1b5e20] text-white p-4 shadow-lg relative z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-white/20 transition-colors">{t.home}</Button>
            <Button variant="ghost" className="text-white hover:bg-white/20 transition-colors">{t.auctions}</Button>
            <Button variant="ghost" className="text-white hover:bg-white/20 transition-colors">{t.myBids}</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-white text-[#2e7d32] border-2 border-white hover:bg-[#e8f3e8] hover:text-[#1b5e20] hover:border-[#1b5e20] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {t.cart} ({cart.length})
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white/80 backdrop-blur-md border border-green-200 shadow-xl">
                <DialogHeader>
                  <DialogTitle>{t.cart}</DialogTitle>
                </DialogHeader>
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-green-100">
                    <span>{item.name} - ₹{item.bidAmount.toFixed(2)} x {item.quantity}</span>
                    <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.id)}>{t.remove}</Button>
                  </div>
                ))}
                <div className="mt-4">
                  <strong>{t.total}: ₹{totalAmount.toFixed(2)}</strong>
                </div>
                <Button className="mt-4 w-full bg-gradient-to-r from-[#2e7d32] to-[#1b5e20] hover:from-[#1b5e20] hover:to-[#2e7d32] text-white transition-all duration-300 transform hover:scale-105" onClick={handleCheckout}>{t.checkout}</Button>
              </DialogContent>
            </Dialog>
            <Button 
              variant="outline" 
              className="bg-white text-[#2e7d32] border-2 border-white hover:bg-[#e8f3e8] hover:text-[#1b5e20] hover:border-[#1b5e20] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              onClick={toggleLanguage}
            >
              <Globe className="mr-2 h-4 w-4" />
              {language === 'english' ? 'తెలుగు' : 'English'}
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-8 relative z-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm p-2 rounded-lg shadow-md">
            <Input
              type="text"
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 border-green-200 focus:border-green-400 focus:ring-green-400"
            />
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px] border-green-200 focus:border-green-400 focus:ring-green-400">
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
        </div>

        <Tabs defaultValue="auctions" className="mb-8">
          <TabsList className="bg-white/60 backdrop-blur-sm p-1 rounded-lg shadow-md">
            <TabsTrigger value="auctions" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">{t.currentAuctions}</TabsTrigger>
            <TabsTrigger value="purchases" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">{t.pastPurchases}</TabsTrigger>
          </TabsList>
          <TabsContent value="auctions">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-green-800">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 relative overflow-hidden rounded-lg">
                      <Image
                        src={`/placeholder.svg?height=200&width=200&text=${product.name}`}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1 rounded-full">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="text-xs font-bold">{product.rating}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">{product.category}</Badge>
                        <div className="flex items-center text-orange-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">{product.endTime} left</span>
                        </div>
                      </div>
                      <p className="text-lg font-semibold text-green-700">{t.currentBid}: ₹{product.currentBid.toFixed(2)}/kg</p>
                      <p>{t.quantity}: {product.quantity}</p>
                      <p>{t.farmer}: {product.farmer}</p>
                      <div className="flex items-center space-x-2 mt-4">
                        <Input
                          type="number"
                          placeholder={t.yourBid}
                          className="w-24 border-green-200 focus:border-green-400 focus:ring-green-400"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                        />
                        <Button onClick={() => handleBid(product.id)} className="bg-green-500 hover:bg-green-600 text-white">{t.bid}</Button>
                        <Button variant="secondary" onClick={() => addToCart(product)} className="bg-green-100 text-green-800 hover:bg-green-200">
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
            <Card className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-green-800">{t.pastPurchases}</CardTitle>
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
                      <TableRow key={purchase.id} className="hover:bg-green-50">
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

        <Card className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-green-800">{t.marketTrends}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <span>Potato prices are expected to rise in the coming week</span>
            </div>
            <div className="flex items-center space-x-4">
              <TrendingUp className="w-6 h-6 text-red-600 transform rotate-180" />
              <span>Tomato supply is increasing, prices may decrease</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-green-800">{t.weatherForecast}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-around">
              <div className="text-center">
                <Sun className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
                <p className="font-semibold">{t.today}</p>
                <p>32°C</p>
              </div>
              <div className="text-center">
                <Droplets className="w-10 h-10 text-blue-400 mx-auto mb-2" />
                <p className="font-semibold">{t.tomorrow}</p>
                <p>28°C</p>
              </div>
              <div className="text-center">
                <Sun className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
                <p className="font-semibold">{t.dayAfter}</p>
                <p>30°C</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}