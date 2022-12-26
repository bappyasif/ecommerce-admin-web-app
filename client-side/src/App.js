import { createContext, useState } from 'react';
import {Routes, Route} from "react-router"
import './App.css';
import MainNavigation from './components/MainNavigation';
import CartPage from './components/routes/CartPage';
import CustomerLoginPage from './components/routes/CustomerLoginPage';
import CustomerRegistrationPage from './components/routes/CustomerRegistrationPage';
import LandingPage from './components/routes/LandingPage';
import ProductDetail from './components/routes/ProductDetail';
import ProductsPage from './components/routes/ProductsPage';

export const AppContext = createContext()

function App() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});

  const handleUserData = (data) => setUser(prev => ({...prev, ...data}))

  const handleCart = (product, updatedData) => {
    setCart(prev => {
      console.log(updatedData, "updatedData")
      let updateProductItemCount = null;

      if(updatedData.decrement) {
        updateProductItemCount = (prev[product]?.itemCount && prev[product]?.itemCount - 1) ? prev[product].itemCount - 1 : 0
      } else {
        updateProductItemCount = prev[product]?.itemCount ? prev[product].itemCount + 1 : 1
      }

      return ({...prev, [product]: {...updatedData, "itemCount": updateProductItemCount}})
    })
  }

  const contexts = {
    baseUrl: "http://localhost:4000",
    user: user,
    handleUserData: handleUserData,
    cart: cart,
    handleCart: handleCart
  }

  console.log(cart, "Cart!")

  return (
    <AppContext.Provider value={contexts}>
      <div className="App">
        <MainNavigation />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<CustomerLoginPage />} />
          <Route path='/register' element={<CustomerRegistrationPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/products/:prodId' element={<ProductDetail />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
