import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import "./styles.css";

const SearchResults = () => {
    const [loaded, setLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const containerWidth = window.innerWidth;
    const cardWidth = 240 + 20; // 240px for card width + 20px for the gap
    const cardsPerRow = Math.floor(containerWidth / cardWidth);
    const rows = 2;
    const productsPerPage = window.innerWidth < 768 ? 20 : cardsPerRow * rows;

    const location = useLocation();
    const observer = useRef();

    // Fetch products based on search params
    const fetchProducts = useCallback(async (page) => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get("query") || "";
        const category = searchParams.get("category") || "";
        const minPrice = searchParams.get("minPrice") || "";
        const maxPrice = searchParams.get("maxPrice") || "";

        try {
            setLoaded(false);

            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`, {
                params: {
                    search: query,
                    category,
                    minPrice,
                    maxPrice,
                    page,
                    limit: productsPerPage,
                }
            });

            setProducts((prevProducts) => page === 1 ? response.data.products : [...prevProducts, ...response.data.products]);
            setHasMore(response.data.products.length > 0);
            setLoaded(true);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoaded(true);
        }
    }, [location.search, productsPerPage]);

    useEffect(() => {
        setProducts([]);
        setCurrentPage(1);
        fetchProducts(1);
    }, [location.search, fetchProducts]);

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage, fetchProducts]);

    // Load more products when reaching the bottom of the list
    const lastProductElementRef = useCallback((node) => {
        if (loaded && hasMore) {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setCurrentPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        }
    }, [loaded, hasMore]);

    return (
        <div className="search-results" style={{ flex: "1" }}>
            <h1>Search Results</h1>

            <div className="products">
                {products.map((item, index) => {
                    if (products.length === index + 1) {
                        return (
                            <div ref={lastProductElementRef} key={item._id}>
                                <ProductCard
                                    title={item.title}
                                    price={item.price}
                                    priceBefore={item.priceBefore}
                                    image={item.image}
                                    productid={item._id}
                                />
                            </div>
                        );
                    } else {
                        return (
                            <ProductCard
                                key={item._id}
                                title={item.title}
                                price={item.price}
                                priceBefore={item.priceBefore}
                                image={item.image}
                                productid={item._id}
                            />
                        );
                    }
                })}
            </div>

            {!loaded && (
                <div className="loading">
                    <p>Loading...</p>
                </div>
            )}
            {loaded && products.length === 0 && (
                <div className="no-products">
                    <p>No products found.</p>
                </div>
            )}
        </div>
    );
};

export default SearchResults;