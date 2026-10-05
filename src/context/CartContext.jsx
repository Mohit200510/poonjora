import React, { useEffect } from 'react'
import { useState } from 'react';
import { createContext } from 'react'

export const CartContext = createContext();

export const CartProvider = ({children})=> {

  const[cartItems,setCartItems] = useState(()=>{
    const savedCart = localStorage.getItem("cartItems");
    return savedCart? JSON.parse(savedCart):[];
  });

  const[closeCart,setCloseCart] = useState(false);
  const[showToast,setShowToast]=useState()

  useEffect(()=>{
    localStorage.setItem("cartItems",JSON.stringify(cartItems))
  },[cartItems])
  

  // closing cart and open cart

  function CloseCart(){
        setCloseCart(true)
        // console.log("cart is closing");
        
    }


  // product addig to crt function
  const addToCart = (product) => {

  const alreadyAdded = cartItems.find(
    (item) => item.id === product.id
  );

  if (alreadyAdded) {
    return;
  }

  setCartItems([...cartItems, product]);

  setShowToast(true)

  setTimeout(() => {
    setShowToast(false)
  }, 2500);

};


  // updating product quantity in postive function

  const increaseQuantity = (id) => {
  const updatedCart = cartItems.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        quantity: item.quantity + 1
      };
    }

    return item;
  });

  setCartItems(updatedCart);
  };

  // updating product quantity in negative function

  const decreaseQuantity = (id) => {
  const updatedCart = cartItems.map((item) => {
    if (item.id === id && item.quantity > 1) {
      return {
        ...item,
        quantity: item.quantity - 1
      };
    }

    return item;
  });

  setCartItems(updatedCart);
};

// clear complete cart

const clearCart = () => {
  setCartItems([]);
};

// cart itmes total logic

const cartPriceTotal = cartItems.reduce((total, item) => {
  return total + (item.sale_price * item.quantity);
}, 0);

const cartMRPTotal = cartItems.reduce((total, item) => {
  return total + (item.mrp * item.quantity);
}, 0);

const cartDiscount = cartMRPTotal - cartPriceTotal;

  return (
    <CartContext.Provider value={{CloseCart,closeCart,setCloseCart,addToCart,cartItems,setCartItems,increaseQuantity,decreaseQuantity,clearCart,cartPriceTotal,cartMRPTotal,cartDiscount,showToast}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext