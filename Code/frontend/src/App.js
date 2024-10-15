import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProductsContextProvider } from "./pages/ProductsContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ExampleLandingPage from "./pages/ExampleLandingPage";
import RegisterPage from "./pages/Register";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Account from "./pages/Account";
import AdminUsersList from "./pages/AdminUsersList";
import AdminDash from "./pages/AdminDash";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Messages from "./pages/Messages";

function App() {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />
      <ProductsContextProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/exampleLandingPage" element={<ExampleLandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/adminDashboard" element={<AdminDash />} />
          <Route path="/manageUsers" element={<AdminUsersList />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ProductsContextProvider>
      <Footer />
    </div>
  );
}

export default App;
