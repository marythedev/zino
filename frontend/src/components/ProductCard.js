import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = (props) => {
    let productLink = '/' + props.productid;
    return (
        <Link to={'/product/' + props.productid} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card style={{ margin: '5px', borderRadius: '15px', height: "285px" }}>
                <a href={productLink} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Card.Img variant="top" src={props.image} style={{ borderRadius: '15px', height: "215px", objectFit: "cover" }} />
                    <Card.Body className="d-flex flex-row justify-content-between align-items-center" style={{ padding: '15px' }}>
                        <h6><strong>{props.title}</strong></h6>
                        <Card.Text style={{ lineHeight: '1', textAlign: 'right', paddingLeft: '20px' }}>
                            {props.priceBefore ?
                                <>
                                    <span style={{ color: 'red', fontWeight: '700', margin: 0 }}>${props.price}</span>
                                    <br></br>
                                    <small style={{ color: 'rgba(0, 0, 0, 0.5)', fontSize: '0.7em', whiteSpace: 'nowrap'}}>was ${props.priceBefore}</small>
                                </>
                                : <span style={{ color: 'black', fontWeight: '700', margin: 0 }}>${props.price}</span>
                            }
                        </Card.Text>
                    </Card.Body>
                </a>
            </Card>
        </Link>
    )
}

export default ProductCard;