import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './UncontrolledCarousel.css';

const UncontrolledCarousel = () => {
    return (
        <div id="carousel">
            {/* <!-- PLACEHOLDER IMAGES TO BE UPDATED --> */}
            <Carousel>
                <Carousel.Item>
                    <img src={window.location.origin + '/images/placeholders/carousel/tech-setup.jpg'} alt="Placeholder" className="img-fluid" />
                    <Carousel.Caption className="dimmer league-spartan-bold">
                        <h3>Tech Setup</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={window.location.origin + '/images/placeholders/carousel/kitchen.jpg'} alt="Placeholder" className="img-fluid" />
                    <Carousel.Caption className="dimmer league-spartan-bold">
                        <h3>Kitchen Appliances</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={window.location.origin + '/images/placeholders/carousel/outdoors.jpg'} alt="Placeholder" className="img-fluid" />
                    <Carousel.Caption className="dimmer league-spartan-bold">
                        <h3>Outdoor Gear</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default UncontrolledCarousel;