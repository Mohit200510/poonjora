import React, { useEffect } from 'react'
import { useState } from 'react';
import { createContext } from 'react'

export const CartContext = createContext();

const getCartKey = (item) => {
  return item.variant_id
    ? `${item.id}-${item.variant_id}`
    : String(item.id);
};

export const CartProvider = ({children})=> {

  const[cartItems,setCartItems] = useState(()=>{
    const savedCart = localStorage.getItem("cartItems");
    return savedCart? JSON.parse(savedCart):[];
  });

 const [closeCart, setCloseCart] = useState(
  () => sessionStorage.getItem("closeCart") !== "false"
);

useEffect(() => {
  sessionStorage.setItem("closeCart", closeCart);
}, [closeCart]);

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
  const alreadyAdded = cartItems.some(
    (item) => getCartKey(item) === getCartKey(product)
  );

  if (alreadyAdded) return;

  setCartItems([...cartItems, product]);

  setShowToast(true);

  setTimeout(() => {
    setShowToast(false);
  }, 2500);
};


  // updating product quantity in postive function

 const increaseQuantity = (id) => {
  setCartItems((prev) =>
    prev.map((item) =>
      getCartKey(item) === String(id)
        ? {
            ...item,
            quantity: Math.min(
              item.quantity + 1,
              item.stock ?? Infinity
            )
          }
        : item
    )
  );
};

  // updating product quantity in negative function

 const decreaseQuantity = (id) => {
  setCartItems((prev) =>
    prev.map((item) =>
      getCartKey(item) === String(id) && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
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
    <CartContext.Provider value={{CloseCart,closeCart,setCloseCart,addToCart,cartItems,setCartItems,increaseQuantity,decreaseQuantity,clearCart,cartPriceTotal,cartMRPTotal,cartDiscount,showToast,getCartKey}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext