import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const searchContainerRef = useRef(null);

    const MAXAutocompleteSuggestions = 7;

    // Fetch search autocomplete suggestions
    const handleSearchInput = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products?search=${term}&limit=${MAXAutocompleteSuggestions}`)
                .then((response) => {
                    response.data.products = response.data.products.filter((product) =>
                        product.title.toLowerCase().startsWith(term.toLowerCase())
                    );
                    setSuggestions(response.data.products || []);
                }).catch((error) => {
                    console.error("Error fetching search suggestions:", error);
                });
        } else {
            setSuggestions([]);
        }
    };

    // Hide autocomplete suggestions when clicking outside the search container
    const handleClickOutside = (event) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
            setSuggestions([]);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Redirect to search results page when suggestion is clicked
    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.title);
        setSuggestions([]);
        navigate(`/search?query=${suggestion.title}`);
    };

    // Redirect to search results page when search form is submitted
    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            return;
        }
        navigate(`/search?query=${searchTerm}`);
    };

    return (
        <nav className="navbar">
            <Link to="/">
                <h1 className="league-spartan-bold">KartHaus</h1>
            </Link>
            <div id="search-form-container" className="d-flex align-items-center" ref={searchContainerRef}>
                <form
                    onSubmit={handleSearch}
                    id="search-form"
                    className="d-flex flex-row justify-content-between align-items-center"
                >
                    <div className="d-flex flex-row align-items-center" id="search-input-w-icon">
                        <img src={window.location.origin + "/icons/search.png"} alt="search" height={20} />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchInput}
                        />
                        {suggestions.length > 0 && (
                            <div className="autocomplete-dropdown">
                                {suggestions.map((suggestion) => (
                                    <div key={suggestion._id} onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <Button variant="dark" id="search-btn" type="submit">
                        Go
                    </Button>
                </form>
            </div>
            {/* Account section */}
            {localStorage.getItem("username") === null ? (
                <div id="getin-btns">
                    <Link to="/login">
                        <Button variant="dark">Login</Button>
                    </Link>
                    <Link to="/signup">
                        <Button variant="outline-dark" id="signup-btn">
                            Signup
                        </Button>
                    </Link>
                </div>
            ) : (
                <div id="logged-account" className="d-flex flex-row align-items-center justify-content-center">
                    <Link to="/cart">
                        <img src={window.location.origin + "/icons/cart.png"} alt="cart" height={28} />
                    </Link>
                    <Link to="/account" className="d-flex flex-row align-items-center">
                        <p><strong>{localStorage.getItem("username")}</strong></p>
                        <img src={window.location.origin + "/icons/profile.png"} alt="profile" height={35} />
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;