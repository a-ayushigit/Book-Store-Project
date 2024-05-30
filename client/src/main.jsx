import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UserContextProvider from './Contexts/UserContext.jsx'
import CartProvider from './Contexts/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 
  <React.StrictMode>
  <UserContextProvider>
    <CartProvider>
    <App />
    </CartProvider>
    </UserContextProvider> 
  </React.StrictMode>,
  
  
)
