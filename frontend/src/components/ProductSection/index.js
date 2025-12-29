import React, { useEffect } from 'react';
import ProductCard from '../ProductCard';
import axios from 'axios';
import './styles.css';

const ProductSection = (props) => {

    const [products, setProducts] = React.useState([]);
    const [title, setTitle] = React.useState('');

    useEffect(() => {
        if (props.name) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`, {
                params: {
                    category: props.name,
                }
            }).then((response) => {
                setProducts(response.data.products);
            }).catch((error) => {
                console.error("Error fetching products:", error);
            });

            if (props.name === 'Deals')
                setTitle('Special Deals Today');
            else if (props.name === 'Recommended')
                setTitle('You May Also Like');
            else
                setTitle('Best Sellers in ' + props.name);
        }
    }, [props.name, setTitle]);

    return (
        <>
            <section>
                <h4>{title}</h4>
                <div className="products d-flex flex-row">
                    {products.map((item, index) => {
                        if (item.priceBefore)
                            return <ProductCard key={index} title={item.title} price={item.price} priceBefore={item.priceBefore} image={item.image} productid={item._id} />
                        else
                            return <ProductCard key={index} title={item.title} price={item.price} image={item.image} productid={item._id} />
                    })}
                </div>
            </section>
        </>
    )
}

export default ProductSection;