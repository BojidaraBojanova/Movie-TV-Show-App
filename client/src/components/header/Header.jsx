import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Header(){
    return(
    //     <header className="section site-header">
    //     <div className="wrapper">
    //         <h6 className="site-logo">
    //             <a href="#">
    //                 {/* <img src={logo} alt="logo" /> */}
    //             </a>
    //         </h6>

    //         <nav className="search-nav">
    //             <form action="" method="GET">
    //                 <input type="text" name="searchQuery" placeholder="Search..."/>
    //                 <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
    //             </form>
    //         </nav>

    //         <nav className="main-nav">
    //             <ul>
    //                 <li><a href="">Home</a></li>
    //                 <li><a href="">Movies</a></li>
    //                 <li><a href="">TV Show</a></li>
    //                 <li><a href="">User</a></li>
    //                 <li><a href="">Login</a></li>
    //                 <li><a href="">Registration</a></li>
    //             </ul>
    //         </nav>
    //     </div>
    // </header>
    <Navbar expand="lg" className="navbar">
      <Container fluid>
        <Navbar.Brand href="#" className='logo'></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" className='nav-link'>Home</Nav.Link>
            <Nav.Link href="#action2" className='nav-link'>Movies</Nav.Link>
            <Nav.Link href="#action2" className='nav-link'>TV Shows</Nav.Link>
            <Nav.Link href="#action2" className='nav-link'>User</Nav.Link>
            <Nav.Link href="#action2" className='nav-link'>Login</Nav.Link>
            <Nav.Link href="#action2" className='nav-link'>Registration</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button className='btn-search'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}