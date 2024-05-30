import React, { useContext } from 'react'
import { CartContext } from '../Contexts/CartContext'

const CartPage = () => {
    const cart = useContext(CartContext);
  return (
    <div>
      Cart
    </div>
  )
}

export default CartPage
