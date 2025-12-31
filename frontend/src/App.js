import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Product from "./pages/Product";
import Account from "./pages/Account";
import Signup from "./pages/FormPage/Signup";
import Login from "./pages/FormPage/Login";
import Contact from "./pages/FormPage/Contact";
import AdminUsersList from "./pages/AdminUsersList";
import AdminDash from "./pages/AdminDash";
import InternalMessages from "./pages/InternalMessages";
import EmailComponent from "./components/Email";
import NotFound from "./pages/NotFound";

const PrivateRoutes = () => {
    const token = localStorage.getItem("token");

    try {
        const decoded = token && jwtDecode(token);
        const authenticated = decoded?.userId && decoded.exp * 1000 > Date.now();

        return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
    } catch {
        return <Navigate to="/login" replace />;
    }
};

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
                <Route path="/search" element={<SearchResults />} />
                <Route path="/product/:id" element={<Product />} />

                <Route element={<PrivateRoutes />}>
                    <Route path="/account" element={<Account />} />
                    <Route path="/contact" element={<Contact />} />

                    {/* Admin */}
                    <Route path="/admin" element={<AdminDash />} />
                    <Route path="/admin/manage-users" element={<AdminUsersList />} />
                    <Route path="/admin/internal-messages" element={<InternalMessages />} />
                    <Route path="/admin/email-users" element={<EmailComponent />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;