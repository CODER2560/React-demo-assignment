import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import './components/Login.css';
import Signup from './components/Signup';
import './components/Signup.css';
import Dashboard from './components/Dashboard';
import './App.css';
import Products from './components/Products';
import Category from './components/Category';
import AddProduct from './components/AddProduct';
import Demoform from './components/demoform';
import Demoapi from './components/demoapi';

function App() {
  return (
    <div className="App">

    <Router>
      <Routes>
        <Route  path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/products" element={<Products /> }/>
          <Route path="/dashboard/category" element={<Category />}/>
          <Route path="/dashboard/products/AddProduct" element={<AddProduct setProducts={Products} />}/>
          <Route path="/dashboard/demoform" element={<Demoform />}/>
          <Route path="/dashboard/demoapi" element={<Demoapi />}/>
      </Routes>
    </Router>
     
    </div>

  );
    
}

export default App;

