import React, { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ShoppingCart, Search, Filter, Star, Clock, TrendingUp, Sun, Droplets, Globe, Leaf, DollarSign, BarChart2, BookOpen, Cloud, CreditCard } from 'lucide-react';
import './VendorDashboard.css';
// Import images
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
  // Add any additional mappings here
};
// Function that selects the correct image based on the product name
const getProductImage = (productName: string) => {
  return productImages[productName] || ''; // Return an empty string or a fallback image if not found
};
// Language translations (you can move this to a separate file if it gets too large)
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
};

interface Product {
  id: number;
  name: string;
  currentBid: number;
  quantity: string;
  endTime: number;
  category: string;
  farmer: string;
  rating: number;
}

interface PastPurchase {
  id: number;
  name: string;
  quantity: string;
  price: number;
  date: string;
  farmer: string;
}

interface Bid {
  id: number;
  productId: number;
  name: string;
  bidAmount: number;
  quantity: string;
  endTime: number;
  status: 'winning' | 'outbid';
}

const VendorDashboard: React.FC = () => {
  const [language, setLanguage] = useState('english');
  const t = translations[language];

  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Potatoes', currentBid: 15.50, quantity: '500 kg', endTime: 9000, category: 'Root Vegetables', farmer: 'Farmer A', rating: 4.5 },
    { id: 2, name: 'Tomatoes', currentBid: 20.75, quantity: '300 kg', endTime: 6300, category: 'Fruits', farmer: 'Farmer B', rating: 4.2 },
    { id: 3, name: 'Onions', currentBid: 18.00, quantity: '400 kg', endTime: 11700, category: 'Root Vegetables', farmer: 'Farmer C', rating: 4.8 },
    { id: 4, name: 'Carrots', currentBid: 12.25, quantity: '250 kg', endTime: 14400, category: 'Root Vegetables', farmer: 'Farmer A', rating: 4.5 },
    { id: 5, name: 'Spinach', currentBid: 25.00, quantity: '150 kg', endTime: 8100, category: 'Leafy Greens', farmer: 'Farmer D', rating: 4.0 },
    { id: 6, name: 'Cauliflower', currentBid: 22.50, quantity: '200 kg', endTime: 12600, category: 'Brassicas', farmer: 'Farmer B', rating: 4.2 },
  ]);

  const [pastPurchases, setPastPurchases] = useState<PastPurchase[]>([
    { id: 101, name: 'Rice', quantity: '1000 kg', price: 30000, date: '2023-05-15', farmer: 'Farmer E' },
    { id: 102, name: 'Wheat', quantity: '800 kg', price: 24000, date: '2023-05-10', farmer: 'Farmer F' },
    { id: 103, name: 'Corn', quantity: '600 kg', price: 15000, date: '2023-05-05', farmer: 'Farmer G' },
  ]);

  const [myBids, setMyBids] = useState<Bid[]>([
    { id: 201, productId: 1, name: 'Potatoes', bidAmount: 15.50, quantity: '500 kg', endTime: 9000, status: 'winning' },
    { id: 202, productId: 2, name: 'Tomatoes', bidAmount: 20.00, quantity: '300 kg', endTime: 6300, status: 'outbid' },
    { id: 203, productId: 3, name: 'Onions', bidAmount: 18.00, quantity: '400 kg', endTime: 11700, status: 'winning' },
  ]);

  const [cart, setCart] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setProducts(prevProducts => 
        prevProducts.map(product => ({
          ...product,
          endTime: Math.max(0, product.endTime - 1)
        }))
      );
      setMyBids(prevBids => 
        prevBids.map(bid => ({
          ...bid,
          endTime: Math.max(0, bid.endTime - 1)
        }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleBid = (productId: number) => {
    const newBidAmount = parseFloat(bidAmount);
    if (isNaN(newBidAmount)) return;

    setProducts(products.map(product => 
      product.id === productId ? { ...product, currentBid: newBidAmount } : product
    ));
    setMyBids([...myBids, { 
      id: Date.now(), 
      productId, 
      name: products.find(p => p.id === productId)?.name || '',
      bidAmount: newBidAmount, 
      quantity: products.find(p => p.id === productId)?.quantity || '',
      endTime: products.find(p => p.id === productId)?.endTime || 0,
      status: 'winning' 
    }]);
    setBidAmount('');
  };

  const handleIncreaseBid = (bidId: number) => {
    setMyBids(myBids.map(bid => 
      bid.id === bidId ? { ...bid, bidAmount: bid.bidAmount + 1, status: 'winning' } : bid
    ));
  };

  const handleCancelBid = (bidId: number) => {
    setMyBids(myBids.filter(bid => bid.id !== bidId));
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === '' || product.category === filterCategory)
  );

  const totalAmount = cart.reduce((sum, item) => sum + item.currentBid, 0);

  const handleCheckout = () => {
    console.log('Proceeding to checkout with total amount:', totalAmount);
    alert(`Checkout initiated for ₹${totalAmount.toFixed(2)}`);
    setCart([]);
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'english' ? 'telugu' : 'english');
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="vendor-dashboard">
      <header className="dashboard-header">
        <div className="container">
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
                {cart.length === 0 ? (
                  <p>{t.emptyCart}</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <span>{item.name} - ₹{item.currentBid.toFixed(2)}</span>
                        <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.id)}>{t.remove}</Button>
                      </div>
                    ))}
                    <div className="cart-total">
                      <strong>{t.total}: ₹{totalAmount.toFixed(2)}</strong>
                    </div>
                    <Button className="checkout-button" onClick={handleCheckout}>{t.checkout}</Button>
                  </>
                )}
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={toggleLanguage}>
              <Globe className="mr-2 h-4 w-4" />
              {language === 'english' ? 'తెలుగు' : 'English'}
            </Button>
          </nav>
        </div>
      </header>

      <main className="dashboard-main">
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
            <TabsTrigger value="myBids">{t.myBids}</TabsTrigger>
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
                      <img
                        src={getProductImage(product.name)}
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
                      <div className="time-left">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{formatTime(product.endTime)} left</span>
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
                          {t.addToCart}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="myBids">
            <Card>
              <CardHeader>
                <CardTitle>{t.myBids}</CardTitle>
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
                      <TableRow key={bid.id}>
                        <TableCell>{bid.name}</TableCell>
                        <TableCell>{bid.quantity}</TableCell>
                        <TableCell>₹{bid.bidAmount.toFixed(2)}/kg</TableCell>
                        <TableCell>
                          <Badge variant={bid.status === 'winning' ? 'success' : 'destructive'}>
                            {t[bid.status]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
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
          <TabsContent value="purchases">
            <Card>
              <CardHeader>
                <CardTitle>{t.pastPurchases}</CardTitle>
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
                      <TableRow key={purchase.id}>
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

        <div className="dashboard-widgets">
          <Card>
            <CardHeader>
              <CardTitle>{t.marketTrends}</CardTitle>
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
              <Button variant="link" className="mt-4 text-green-700">{t.viewDetails}</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.weatherForecast}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>{t.today}:</span>
                  <div className="flex items-center">
                    <Sun className="w-6 h-6 text-yellow-400 mr-2" />
                    <span>32°C</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t.tomorrow}:</span>
                  <div className="flex items-center">
                    <Cloud className="w-6 h-6 text-gray-400 mr-2" />
                    <span>28°C</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t.dayAfter}:</span>
                  <div className="flex items-center">
                    <Droplets className="w-6 h-6 text-blue-400 mr-2" />
                    <span>26°C</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.soilHealth}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Leaf className="w-6 h-6 text-green-600" />
                  <span>Nitrogen: Good</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Leaf className="w-6 h-6 text-yellow-600" />
                  <span>Phosphorus: Moderate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Leaf className="w-6 h-6 text-green-600" />
                  <span>Potassium: Good</span>
                </div>
              </div>
              <Button variant="link" className="mt-4 text-green-700">{t.viewDetails}</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.financialServices}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <span>Crop Loans</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart2 className="w-6 h-6 text-blue-600" />
                  <span>Insurance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-6 h-6 text-orange-600" />
                  <span>Financial Literacy</span>
                </div>
              </div>
              <Button variant="link" className="mt-4 text-green-700">{t.applyForLoan}</Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{t.knowledgeHub}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Sustainable Farming Practices</h3>
                <p className="text-sm">Learn about eco-friendly farming methods to improve soil health and crop yield.</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Market Demand Forecasting</h3>
                <p className="text-sm">Understand market trends and predict demand for various crops.</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Pest Management Techniques</h3>
                <p className="text-sm">Discover effective ways to protect your crops from pests and diseases.</p>
              </div>
            </div>
            <Button variant="link" className="mt-4 text-green-700">{t.viewArticles}</Button>
          </CardContent>
        </Card>
      </main>

      <footer className="dashboard-footer">
        <div className="container">
          <p>&copy; 2023 Krishi Mitra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default VendorDashboard;