import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
    const [history, setHistory] = useLocalStorage('edu_history', []);

    const addToHistory = (productId) => {
        setHistory(prev => {
            const newHistory = [productId, ...prev.filter(id => id !== productId)];
            return newHistory.slice(0, 10);
        });
    };

    const value = { history, addToHistory };

    return (
        <HistoryContext.Provider value={value}>
            {children}
        </HistoryContext.Provider>
    );
};

export const useHistory = () => useContext(HistoryContext);