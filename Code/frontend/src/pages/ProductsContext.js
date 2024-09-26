// serves as local db for products for now

import React, { createContext, useState } from "react";

// TODO fetch post data from backend
const data = [
    {
        productid: '1',
        title: "Toddler Table",
        price: "80.99",
        priceBefore: "175.99",
        image: "/images/placeholders/table.png",
        category: 'Deals',   // can be multiple categories

    },
    {
        productid: '2',
        title: "Comb Set",
        price: "5.99",
        priceBefore: "18.99",
        image: "/images/placeholders/comb.png",
        category: 'Deals',
    },
    {
        productid: '3',
        title: "Sofa",
        price: "399.99",
        priceBefore: "785.99",
        image: "/images/placeholders/sofa.png",
        category: 'Deals',
    },
    {
        productid: '4',
        title: "Guitar",
        price: "50.99",
        priceBefore: "100.99",
        image: "/images/placeholders/guitar.png",
        category: 'Deals',
    },
    {
        productid: '5',
        title: "Macbook",
        price: "1234.99",
        image: "/images/placeholders/macbook.png",
        category: 'Tech',
    },
    {
        productid: '6',
        title: "Samsung Phone",
        price: "999.99",
        image: "/images/placeholders/samsung-phone.png",
        category: 'Tech',
    },
    {
        productid: '7',
        title: "Bose Headphones",
        price: "349.99",
        image: "/images/placeholders/bose-headp.png",
        category: 'Tech',
    },
    {
        productid: '8',
        title: "Logitech Mouse",
        price: "38.99",
        image: "/images/placeholders/logi-mouse.png",
        category: 'Tech',
    },
    {
        productid: '9',
        title: "Bike",
        price: "345.99",
        image: "/images/placeholders/bike.png",
        category: 'Outdoor Gear',
    },
    {
        productid: '10',
        title: "Tent",
        price: "278.99",
        image: "/images/placeholders/tent.png",
        category: 'Outdoor Gear',
    },
    {
        productid: '11',
        title: "Flashlight",
        price: "15.99",
        image: "/images/placeholders/flash.png",
        category: 'Outdoor Gear',
    },
    {
        productid: '12',
        title: "Tools",
        price: "99.99",
        image: "/images/placeholders/tools.png",
        category: 'Outdoor Gear',
    },
    {
        productid: '13',
        title: "Casual Shoes",
        price: "123.99",
        image: "/images/placeholders/casual-shoes.png",
        category: 'Shoes',
    },
    {
        productid: '14',
        title: "Nike Running Shoes Pro",
        price: "254.99",
        image: "/images/placeholders/running-shoes.png",
        category: 'Shoes',
    },
    {
        productid: '15',
        title: "Casual Luxury Shoes",
        price: "145.99",
        image: "/images/placeholders/luxury-shoes.png",
        category: 'Shoes',
    },
    {
        productid: '16',
        title: "Casual Sport Shoes",
        price: "58.99",
        image: "/images/placeholders/sport-shoes.png",
        category: 'Shoes',
    },
    {
        productid: '17',
        title: "Chair",
        price: "88.99",
        image: "/images/placeholders/chair.png",
        category: 'Recommended',
    },
    {
        productid: '18',
        title: "Mirror",
        price: "137.99",
        image: "/images/placeholders/mirror.png",
        category: 'Recommended',
    },
    {
        productid: '19',
        title: "Pumpkin Candle",
        price: "9.99",
        image: "/images/placeholders/candle.png",
        category: 'Recommended',
    },
    {
        productid: '20',
        title: "Small Garden Shovel",
        price: "28.99",
        image: "/images/placeholders/shovel.png",
        category: 'Recommended',
    }

];


export const ProductsContext = createContext({
    products: [],
    setProducts: () => { },
    getProductsByCategory: ( category ) => { },
    getProductsById: ( id ) => { },
});

export const ProductsContextProvider = ({
    children,
}) => {
    const [products, setProducts] = useState(data);

    const getProductsByCategory = ( category ) => {
        return products.filter(product => product.category === category);
    }

    const getProductsById = ( id ) => {
        return products.find(product => product.productid === id);
    }

    return (
        <ProductsContext.Provider value={{ products, setProducts, getProductsByCategory, getProductsById }}>
            {children}
        </ProductsContext.Provider>
    );
};