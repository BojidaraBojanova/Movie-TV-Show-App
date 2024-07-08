import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from 'react-router-dom';

export default function Header(){
    return(
    <Navbar expand="lg" variant="dark" className="navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className='logo'></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to='/' className='nav-link' >Home</Nav.Link>
            <Nav.Link as={Link} to="/movies" className='nav-link' >Movies</Nav.Link>
            <Nav.Link as={Link} to="/tvShows" className='nav-link' >TV Shows</Nav.Link>
            <Nav.Link as={Link} to="/user" className='nav-link' >User</Nav.Link>
            <Nav.Link as={Link} to="/login" className='nav-link' >Login</Nav.Link>
            <Nav.Link as={Link} to="/registration" className='nav-link' >Registration</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 search-input"
              aria-label="Search"
            />
            <Button className='btn-search'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}