import React, { useEffect, useContext } from 'react';
import ProductCard from './ProductCard';
import { ProductsContext } from '../pages/ProductsContext';
import './ProductSection.css';

const ProductSection = (props) => {

    const { getProductsByCategory } = useContext(ProductsContext);
    const [items, setItems] = React.useState([]);
    const [title, setTitle] = React.useState('');

    useEffect(() => {
        if (props.name) {
            setItems(getProductsByCategory(props.name));

            if (props.name === 'Deals')
                setTitle('Special Deals Today');
            else if (props.name === 'Recommended')
                setTitle('You May Also Like');
            else
                setTitle('Best Sellers in ' + props.name);
        }

    }, [props.name, getProductsByCategory, setTitle]);

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

                    {/* TODO: remove this later (currently used to duplicated products to display more) */}
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