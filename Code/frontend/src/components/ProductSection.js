import React from 'react';
import ProductCard from './ProductCard';
import './ProductSection.css';

const ProductSection = (props) => {

    // PLACEHOLDER INFO TO BE UPDATED
    let title;
    let items = [];
    if (props.name === 'Deals') {
        title = 'Special Deals Today';
        items = [
            { title: "Toddler Table", price: "80.99", priceBefore: "175.99", image: "/images/placeholders/table.png", productid: '0000000' },
            { title: "Comb Set", price: "5.99", priceBefore: "18.99", image: "/images/placeholders/comb.png", productid: '0000000' },
            { title: "Sofa", price: "399.99", priceBefore: "785.99", image: "/images/placeholders/sofa.png", productid: '0000000' },
            { title: "Guitar", price: "50.99", priceBefore: "100.99", image: "/images/placeholders/guitar.png", productid: '0000000' }
        ];
    } else if (props.name === 'Tech') {
        title = 'Best Sellers in Tech';
        items = [
            { title: "Macbook", price: "1234.99", image: "/images/placeholders/macbook.png", productid: '0000000' },
            { title: "Samsung Phone", price: "999.99", image: "/images/placeholders/samsung-phone.png", productid: '0000000' },
            { title: "Bose Headphones", price: "349.99", image: "/images/placeholders/bose-headp.png", productid: '0000000' },
            { title: "Logitech Mouse", price: "38.99", image: "/images/placeholders/logi-mouse.png", productid: '0000000' }
        ];
    } else if (props.name === 'Outdoor Gear') {
        title = 'Best Sellers in Outdoor Gear';
        items = [
            { title: "Bike", price: "345.99", image: "/images/placeholders/bike.png", productid: '0000000' },
            { title: "Tent", price: "278.99", image: "/images/placeholders/tent.png", productid: '0000000' },
            { title: "Flashlight", price: "15.99", image: "/images/placeholders/flash.png", productid: '0000000' },
            { title: "Tools", price: "99.99", image: "/images/placeholders/tools.png", productid: '0000000' }
        ];
    } else if (props.name === 'Shoes') {
        title = 'Best Sellers in Shoes';
        items = [
            { title: "Casual Shoes", price: "123.99", image: "/images/placeholders/casual-shoes.png", productid: '0000000' },
            { title: "Nike Running Shoes Pro", price: "254.99", image: "/images/placeholders/running-shoes.png", productid: '0000000' },
            { title: "Casual Luxury Shoes", price: "145.99", image: "/images/placeholders/luxury-shoes.png", productid: '0000000' },
            { title: "Casual Sport Shoes", price: "58.99", image: "/images/placeholders/sport-shoes.png", productid: '0000000' }
        ];
    } else {
        title = 'You May Also Like';
        items = [
            { title: "Chair", price: "88.99", image: "/images/placeholders/chair.png", productid: '0000000' },
            { title: "Mirror", price: "137.99", image: "/images/placeholders/mirror.png", productid: '0000000' },
            { title: "Pumpkin Candle", price: "9.99", image: "/images/placeholders/candle.png", productid: '0000000' },
            { title: "Small Garden Shovel", price: "28.99", image: "/images/placeholders/shovel.png", productid: '0000000' }
        ];
    }

    return (
        <>
            <section>
                <h4>{title}</h4>
                <div className="products d-flex flex-row">
                    {items.map((item, index) => {
                        if (item.priceBefore)
                            return <ProductCard key={index} title={item.title} price={item.price} priceBefore={item.priceBefore} image={item.image} productid={item.productid} />
                        else
                            return <ProductCard key={index} title={item.title} price={item.price} image={item.image} productid={item.productid} />
                    })}
                    {items.map((item, index) => {
                        if (item.priceBefore)
                            return <ProductCard key={index} title={item.title} price={item.price} priceBefore={item.priceBefore} image={item.image} productid={item.productid} />
                        else
                            return <ProductCard key={index} title={item.title} price={item.price} image={item.image} productid={item.productid} />
                    })}
                </div>
            </section>
        </>
    )
}

export default ProductSection;