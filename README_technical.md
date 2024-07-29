# Krishi Mitra (Farm Friend) - Frontend Documentation

## Overview

Krishi Mitra is a comprehensive digital platform designed to revolutionize farming practices in India. This React-based frontend application provides an intuitive interface for farmers to access various agricultural services and information.

## Technology Stack

- React 18
- TypeScript 4
- Vite 4
- CSS Modules

## Project Structure

```
./
├── src/
│   ├── components/
│   │   ├── AppDownload.tsx
│   │   ├── BiddingProcess.tsx
│   │   ├── CropVarieties.tsx
│   │   ├── GovernmentSchemes.tsx
│   │   ├── HomePage.tsx
│   │   ├── KnowledgeHub.tsx
│   │   ├── LoginPage.tsx
│   │   ├── Navbar.tsx
│   │   ├── SignupPage.tsx
│   │   └── SoilHealthMonitoring.tsx
│   ├── styles/
│   │   ├── AppDownload.css
│   │   ├── AuthPages.css
│   │   ├── BiddingProcess.css
│   │   ├── GovernmentSchemes.css
│   │   ├── HomePage.css
│   │   ├── KnowledgeHub.css
│   │   ├── Navbar.css
│   │   └── SoilHealthMonitoring.css
│   ├── assets/
│   ├── api.ts
│   ├── App.tsx
│   ├── AuthContext.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Key Components
## Navigation

The application uses a consistent Navbar component across all pages, allowing users to easily navigate between different sections:

- Home
- Soil Health Monitoring
- Bidding Process
- Government Schemes
- Knowledge Hub
- Login/Signup

The Navbar is implemented in `src/components/Navbar.tsx` and styled in `src/components/Navbar.css`. It's integrated into the main `App.tsx` component, ensuring it's displayed on all pages.

To add new navigation items:

1. Update the `Navbar.tsx` component to include the new link.
2. Add the corresponding route in `App.tsx`.
3. Create the new component and add it to the appropriate directory.

This structure allows for easy expansion of the application with new features and pages while maintaining consistent navigation throughout the app.

### App.tsx

The main application component that sets up routing using React Router.

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import BiddingProcess from "./components/BiddingProcess";
import SoilHealthMonitoring from "./components/SoilHealthMonitoring";
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/soilhealth" element={<SoilHealthMonitoring />} />
        <Route path="/biddingprocess" element={<BiddingProcess />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### AuthContext.tsx

Provides authentication context using React's Context API.

```typescript
import React, { createContext, useState, useContext } from 'react';
import { login, signup } from './api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const handleLogin = async (email: string, password: string) => {
    const response = await login(email, password);
    setUser(response.data);
  };

  // ... other authentication methods

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, signup: handleSignup, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### api.ts

Configures Axios for API calls.

```typescript
import axios from "axios";

const API_URL = "http://localhost:8000";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
```

## Component Details

### HomePage.tsx

The landing page component.

Key features:
- Displays a hero section with a search bar
- Shows key features of the application
- Includes sections for government schemes and knowledge hub

```typescript
function HomePage() {
  return (
    <div className="home-page">
      <header>
        <div className="logo">KRISHIMITRA</div>
        <button className="explore-features">Explore features</button>
      </header>
      <section className="hero">
        <h1>Empowering farmers with technology!</h1>
        <div className="search-bar">
          {/* Search bar implementation */}
        </div>
      </section>
      {/* Other sections */}
    </div>
  );
}
```

### SoilHealthMonitoring.tsx

Manages soil health data and provides recommendations.

Key features:
- Displays various soil health metrics
- Shows historical data using charts
- Provides recommendations based on soil health

```typescript
const SoilHealthMonitoring: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('soil-testing');
  const [showHistory, setShowHistory] = useState(false);

  // ... metric data and chart configurations

  return (
    <div className="soil-health-monitoring">
      <header>{/* ... */}</header>
      <div className="main-content">
        {!showHistory ? (
          <>
            <div className="soil-metrics">{/* ... */}</div>
            <div className="soil-health-results">{/* ... */}</div>
            <div className="recommendations">{/* ... */}</div>
            <div className="historical-data">{/* ... */}</div>
          </>
        ) : (
          <div className="historical-view">{/* ... */}</div>
        )}
      </div>
    </div>
  );
};
```

### BiddingProcess.tsx

Handles the bidding platform functionality.

Key features:
- Displays active bids
- Allows users to place new bids
- Shows bidding history and status

```typescript
function BiddingProcess() {
  const schemes = [
    // ... scheme data
  ];

  return (
    <div className="bidding-process">
      <section className="hero">{/* ... */}</section>
      <section className="features">{/* ... */}</section>
      <div className="bidding-platform">
        <div className="schemes-header">
          <h2>Bidding Platform</h2>
          <button className="view-all">See all</button>
        </div>
        <div className="schemes-grid">
          {schemes.map((scheme, index) => (
            <div key={index} className="scheme-card">
              {/* ... scheme card content */}
            </div>
          ))}
        </div>
      </div>
      {/* Other sections */}
    </div>
  );
}
```

### LoginPage.tsx and SignupPage.tsx

Handle user authentication and registration.

Key features:
- Form for user credentials
- Integration with authentication API
- Error handling and validation

```typescript
const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // API call for login
      // Handle successful login
    } catch (error) {
      // Handle login error
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Login form */}
      </div>
    </div>
  );
};
```

## Styling

The application uses CSS modules for styling. Each component has its corresponding CSS file in the `styles` directory.

Example (HomePage.css):

```css
.home-page {
  font-family: Arial, sans-serif;
}

.hero {
  background-image: url('../assets/farmer.png');
  background-size: cover;
  background-position: center;
  height: 400px;
  /* ... other styles */
}

/* ... other component-specific styles */
```

## State Management

The application primarily uses React's built-in useState hook for local state management and useContext for global state (particularly for authentication).

## API Integration

API calls are made using Axios, configured in `api.ts`. Each component that requires data from the backend uses this configured Axios instance to make requests.

## Routing

React Router is used for navigation between different components/pages of the application.

## Future Enhancements

- Implement more robust error handling and loading states
- Add unit and integration tests
- Optimize performance with code splitting and lazy loading
- Enhance accessibility features
- Implement more advanced state management if required (e.g., Redux)

## Contributing

We welcome contributions to improve Krishi Mitra. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[Insert License Information Here]

---

Krishi Mitra - Empowering farmers with technology for a sustainable and profitable future in agriculture.
```