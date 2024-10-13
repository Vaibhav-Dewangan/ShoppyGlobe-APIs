import { useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import './App.css';


function App() {
  
  return (
    <Provider store={appStore}>
     <Header />
     <Outlet />
     <Footer />
    </Provider>
  )
}

export default App;
