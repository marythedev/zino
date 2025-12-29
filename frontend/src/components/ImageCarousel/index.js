import Carousel from 'react-bootstrap/Carousel';
import './styles.css';

const ImageCarousel = () => {
    return (
        <div id="carousel">
            <Carousel>
                <Carousel.Item>
                    <img src={window.location.origin + '/images/carousel/tech-setup.jpg'} alt="Placeholder" className="img-fluid" />
                    <Carousel.Caption className="dimmer league-spartan-bold">
                        <h3>Tech Setup</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={window.location.origin + '/images/carousel/kitchen.jpg'} alt="Placeholder" className="img-fluid" />
                    <Carousel.Caption className="dimmer league-spartan-bold">
                        <h3>Kitchen Appliances</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={window.location.origin + '/images/carousel/outdoors.jpg'} alt="Placeholder" className="img-fluid" />
                    <Carousel.Caption className="dimmer league-spartan-bold">
                        <h3>Outdoor Gear</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default ImageCarousel;