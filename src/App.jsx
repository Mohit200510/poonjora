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
import Product from './pages/productDetail/Product'
import PrivacyPolicy from './pages/privacyPolicy/PrivacyPolicy'
import TermsConditions from './pages/terms&Conditions/TermsConditions'
import ShippingPolicy from './pages/shippingPolicy/ShippingPolicy'
import RefundCancellation from './pages/refund&Cancellation/RefundCancellation'
import PanchangPage from './pages/panchangPage/PanchangPage'
import FestivalCalender from './pages/festivalCalender/FestivalCalender'
import AllProducts from './components/allProducts/AllProducts'
import Footer from './components/footer/Footer'
import GoogleAnalyticsTracker from './components/GoogleAnalyticsTracker'





function App() {

  const {closeCart,CloseCart,showToast} =useContext(CartContext)
  const location = useLocation();

  return (
    
    <>
    <GoogleAnalyticsTracker/>


    {showToast && <Toast message="Product added to cart" />}





   <Overlay onClick={CloseCart}  style={{display:closeCart?"none":"block"}}/>


    {!location.pathname.includes("order-confirmation") && <Header />}
  

    <Routes>
      <Route path='/' element={<Home/>}></Route>
      {/* < */}
      <Route path='/order-confirmation/:orderId' element={<OrderSuccess/>}></Route>
      <Route path='/product/:id' element={<Product/>}></Route>
      <Route path='/privacy-policy' element={<PrivacyPolicy/>}></Route>
      <Route path='/terms-and-conditions' element={<TermsConditions/>}></Route>
      <Route path='/shipping-policy' element={<ShippingPolicy/>}></Route>
      <Route path="/refund-cancellation-policy" element={<RefundCancellation/>}></Route>
      <Route path="/panchang" element={<PanchangPage/>}></Route>
      <Route path="/hindu-festival-calender" element={<FestivalCalender/>}></Route>
      <Route path='/collections/products' element={<AllProducts/>}></Route>
     
    </Routes>

    {!location.pathname.includes("order-confirmation") && <Footer />}





    
    
    <Cart/>

      
    </>
  )
}

export default App;
