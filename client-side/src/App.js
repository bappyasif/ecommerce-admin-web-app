import { createContext, useState } from 'react';
import { Routes, Route } from "react-router"
import { Link } from 'react-router-dom';
import './App.css';
import MainNavigation from './components/MainNavigation';
import AllCustomersPage from './components/routes/admin/AllCustomersPage';
import AllOrdersPage from './components/routes/admin/AllOrdersPage';
import AllProductsPage from './components/routes/admin/AllProductsPage';
import AdminPage from './components/routes/admin/DashboardPage';
import SpecificCustomerDetailPage from './components/routes/admin/SpecificCustomerDetailPage';
import SpecificOrderDetailPage from './components/routes/admin/SpecificOrderDetailPage';
import SpecificProductDetailPage from './components/routes/admin/SpecificProductDetailPage';
import CartPage from './components/routes/CartPage';
import CheckoutPage from './components/routes/CheckoutPage';
import CustomerLoginPage from './components/routes/CustomerLoginPage';
import CustomerRegistrationPage from './components/routes/CustomerRegistrationPage';
import LandingPage from './components/routes/LandingPage';
import LogoutUser from './components/routes/LogoutUser';
import ProductDetail from './components/routes/ProductDetail';
import ProductsPage from './components/routes/ProductsPage';

export const AppContext = createContext()

function App() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  const handleIsAdminTrue = () => setIsAdmin(true);

  const handleIsAdminFalse = () => setIsAdmin(false);

  const handleUserData = (data) => setUser(prev => ({ ...prev, ...data }))

  const handleCart = (product, updatedData) => {
    setCart(prev => {
      let updateProductItemCount = null;

      if (updatedData.decrement) {
        updateProductItemCount = (prev[product]?.itemCount && prev[product]?.itemCount - 1) ? prev[product].itemCount - 1 : 0
      } else {
        updateProductItemCount = prev[product]?.itemCount ? prev[product].itemCount + 1 : 1
      }

      return ({ ...prev, [product]: { ...updatedData, "itemCount": updateProductItemCount } })
    })
  }

  const resetCart = () => setCart({})

  const contexts = {
    // baseUrl: "http://localhost:4000",
    baseUrl: "https://smiling-gilet-newt.cyclic.app",
    user: user,
    handleUserData: handleUserData,
    cart: cart,
    handleCart: handleCart,
    resetCart: resetCart,
    isAdmin: isAdmin,
    handleIsAdminFalse: handleIsAdminFalse,
    handleIsAdminTrue: handleIsAdminTrue
  }

  return (
    <AppContext.Provider value={contexts}>
      <div className="App">
        <MainNavigation />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/logout' element={<LogoutUser />} />
          <Route path='/login' element={<CustomerLoginPage />} />
          <Route path='/register' element={<CustomerRegistrationPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/products/:prodId' element={<ProductDetail />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/admin' element={<AdminPage />} />
          {
            isAdmin
              ?
              <>
                <Route path='/admin/all-orders' element={<AllOrdersPage />} />
                <Route path='/admin/all-orders/:orderId' element={<SpecificOrderDetailPage />} />
                <Route path='/admin/all-products' element={<AllProductsPage />} />
                <Route path='/admin/all-products/:prodId' element={<SpecificProductDetailPage />} />
                <Route path='/admin/all-customers' element={<AllCustomersPage />} />
                <Route path='/admin/all-customers/:custId' element={<SpecificCustomerDetailPage />} />
              </>
              : null
          }
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
