import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppProvider from './context/AppContext.jsx'; // Sửa: Import AppProvider
import { Toaster } from 'react-hot-toast';
import Header from './components/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/payment/CheckoutPage.jsx';
function App() {
  return (
    <AppProvider>
      <Router>
        <Toaster position="top-right" reverseOrder={false} />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AppProvider>
  );
}

export default App;