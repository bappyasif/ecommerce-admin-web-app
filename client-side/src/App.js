import { createContext } from 'react';
import {Routes, Route} from "react-router"
import './App.css';
import LandingPage from './components/routes/LandingPage';

export const AppContext = createContext()

function App() {

  const contexts = {
    baseUrl: "http://localhost:4000"
  }

  return (
    <AppContext.Provider value={contexts}>
      <div className="App">
        <Routes>
          <Route path='/' element={<LandingPage />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
