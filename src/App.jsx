import { useState } from 'react'
import './App.css'
import { useLocation } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import Header from './components/header/Header'
import Home from './pages/home/Home'
import Cart from './components/cart/Cart'
import Overlay from './components/common/Overlay'
import { useContext } from 'react'
import CartContext from './context/CartContext'
import Toast from './components/common/toast/Toast'
import OrderSuccess from './pages/orderSuccess/OrderSuccess'





function App() {

  const {closeCart,CloseCart,showToast} =useContext(CartContext)
  const location = useLocation();

  return (
    
    <>
    {showToast && <Toast message="Product added to cart" />}





   <Overlay onClick={CloseCart}  style={{display:closeCart?"none":"block"}}/>


    {!location.pathname.includes("order-confirmation") && <Header />}
    {/* <Header/> */}

    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/order-confirmation/:orderId' element={<OrderSuccess/>}></Route>
     
    </Routes>


    
    
    <Cart/>

      
    </>
  )
}

export default App;
