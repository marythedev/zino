import { Container } from 'react-bootstrap';
import './styles.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <Container className="footer-container">
                <small>&copy; 2024 - {currentYear} KartHaus. All rights reserved.</small>
            </Container>
        </footer>
    );
};

export default Footer;