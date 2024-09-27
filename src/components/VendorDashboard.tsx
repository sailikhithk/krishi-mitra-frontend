'use client'

import React, { useState } from 'react';
import './VendorDashboard.css';  // Add this line at the top of your file
import styles from './VendorDashboard.css';

interface Product {
  id: number;
  name: string;
  currentBid: number;
  quantity: string;
  endTime: string;
  category: string;
  farmer: string;
  rating: number;
}

const VendorDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Potatoes', currentBid: 15.50, quantity: '500 kg', endTime: '2h 30m', category: 'Root Vegetables', farmer: 'Farmer A', rating: 4.5 },
    { id: 2, name: 'Tomatoes', currentBid: 20.75, quantity: '300 kg', endTime: '1h 45m', category: 'Fruits', farmer: 'Farmer B', rating: 4.2 },
    { id: 3, name: 'Onions', currentBid: 18.00, quantity: '400 kg', endTime: '3h 15m', category: 'Root Vegetables', farmer: 'Farmer C', rating: 4.8 },
    { id: 4, name: 'Carrots', currentBid: 12.25, quantity: '250 kg', endTime: '4h 00m', category: 'Root Vegetables', farmer: 'Farmer A', rating: 4.5 },
    { id: 5, name: 'Spinach', currentBid: 25.00, quantity: '150 kg', endTime: '2h 15m', category: 'Leafy Greens', farmer: 'Farmer D', rating: 4.0 },
    { id: 6, name: 'Cauliflower', currentBid: 22.50, quantity: '200 kg', endTime: '3h 30m', category: 'Brassicas', farmer: 'Farmer B', rating: 4.2 },
  ]);

  const [cart, setCart] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [bidAmount, setBidAmount] = useState('');

  const handleBid = (productId: number) => {
    const newBidAmount = parseFloat(bidAmount);
    if (isNaN(newBidAmount)) return;

    setProducts(products.map(product => 
      product.id === productId ? { ...product, currentBid: newBidAmount } : product
    ));
    setBidAmount('');
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

  return (
    <div className={styles['vendor-dashboard']}>
      <h1>Vendor Dashboard</h1>
      <div className="search-filter">
        <input 
          type="text" 
          placeholder="Search products" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <select 
          value={filterCategory} 
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Root Vegetables">Root Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Leafy Greens">Leafy Greens</option>
          <option value="Brassicas">Brassicas</option>
        </select>
      </div>
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>Current Bid: ₹{product.currentBid.toFixed(2)}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Time Left: {product.endTime}</p>
            <p>Category: {product.category}</p>
            <p>Farmer: {product.farmer}</p>
            <p>Rating: {product.rating}</p>
            <input 
              type="number" 
              placeholder="Your bid" 
              value={bidAmount} 
              onChange={(e) => setBidAmount(e.target.value)} 
            />
            <button onClick={() => handleBid(product.id)}>Place Bid</button>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="cart">
        <h2>Cart</h2>
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <span>{item.name} - ₹{item.currentBid.toFixed(2)}</span>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorDashboard;