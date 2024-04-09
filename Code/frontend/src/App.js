import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ExampleLandingPage from './pages/ExampleLandingPage';
import RegisterPage from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/exampleLandingPage" element={<ExampleLandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
