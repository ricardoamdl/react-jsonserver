import { Navbar, Container } from 'react-bootstrap';

function Header() {
    return (
        <Navbar  bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
            <Navbar.Brand href="#home">
                Meu Catalogo de Filmese Séries
            </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default Header;