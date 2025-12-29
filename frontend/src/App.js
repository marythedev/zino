import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Signup from "./pages/Auth/Signup";
import NotFound from "./pages/NotFound";
import Login from "./pages/Auth/Login";
import Account from "./pages/Account";
import AdminUsersList from "./pages/AdminUsersList";
import AdminDash from "./pages/AdminDash";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Messages from "./pages/Messages";
import SearchResults from "./pages/SearchResults";
import EmailComponent from "./components/Email";

function App() {
    return (
        <div
            style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/account" element={<Account />} />
                <Route path="/adminDashboard" element={<AdminDash />} />
                <Route path="/manageUsers" element={<AdminUsersList />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/email" element={<EmailComponent />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;