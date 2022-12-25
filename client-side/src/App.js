import { createContext, useState } from 'react';
import {Routes, Route} from "react-router"
import './App.css';
import MainNavigation from './components/MainNavigation';
import CustomerLoginPage from './components/routes/CustomerLoginPage';
import CustomerRegistrationPage from './components/routes/CustomerRegistrationPage';
import LandingPage from './components/routes/LandingPage';

export const AppContext = createContext()

function App() {
  const [user, setUser] = useState({});

  const handleUserData = (data) => setUser(prev => ({...prev, ...data}))

  const contexts = {
    baseUrl: "http://localhost:4000",
    user: user,
    handleUserData: handleUserData
  }

  return (
    <AppContext.Provider value={contexts}>
      <div className="App">
        <MainNavigation />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<CustomerLoginPage />} />
          <Route path='/register' element={<CustomerRegistrationPage />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
