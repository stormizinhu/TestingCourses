import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import '@/index.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { CartProvider } from '@/hooks/useCart';
import { ProgressProvider } from '@/hooks/useProgress';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          <CartProvider>
            <App />
            <Toaster />
          </CartProvider>
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
