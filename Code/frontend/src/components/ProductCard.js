import React from 'react';
import { Card } from 'react-bootstrap';

const ProductCard = (props) => {
    let productLink = '/' + props.productid;
    return (
        <Card style={{ margin: '5px', borderRadius: '15px' }}>
            <a href={productLink} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card.Img variant="top" src={window.location.origin + props.image} style={{ borderRadius: '15px' }} />
                <Card.Body className="d-flex flex-row justify-content-between align-items-start" style={{ padding: '15px' }}>
                    <h6><strong>{props.title}</strong></h6>
                    <Card.Text style={{ lineHeight: '1', textAlign: 'right', paddingLeft: '20px' }}>
                        {props.priceBefore ?
                            <>
                                <span style={{ color: 'red', fontWeight: '700', margin: 0 }}>${props.price}</span>
                                <br></br>
                                <small style={{ color: 'rgba(0, 0, 0, 0.5)', fontSize: '0.8em', whiteSpace: 'nowrap' }}>was ${props.priceBefore}</small>
                            </>
                            : <span style={{ color: 'black', fontWeight: '700', margin: 0 }}>${props.price}</span>
                        }
                    </Card.Text>
                </Card.Body>
            </a>
        </Card>
    )
}

export default ProductCard;