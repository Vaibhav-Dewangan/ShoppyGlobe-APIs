import { useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import { AuthProvider } from './Components/Authcontext';
import './App.css';


function App() {
  
  return (
    <Provider store={appStore}>
      
      <AuthProvider>
         <Header />
         <Outlet />
        <Footer />
      </AuthProvider>
     
    </Provider>
  )
}

export default App;
