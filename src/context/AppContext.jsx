import React from 'react';
import { FavoritesProvider } from './DetialContext/FavoritesContext';
import { HistoryProvider } from './DetialContext/HistoryContext';
import { CartProvider } from './DetialContext/CartContext';

const AppProvider = ({ children }) => {
    return (
        <FavoritesProvider>
            <HistoryProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </HistoryProvider>
        </FavoritesProvider>
    );
};

export default AppProvider;