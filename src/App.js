import {createContext, useReducer} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap'

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Welcome from "./MainApp/pages/Welcome";
import ShoppingCart from "./MainApp/pages/ShoppingCart";
import Checkout from "./MainApp/pages/Checkout";
import AboutUs from "./MainApp/pages/AboutUs";

import {shoppingCartReducerFunction, initShoppingCartReducerState} from "./reducers/ShoppingCartReducer";

export const shoppingCartContext = createContext(undefined);

function App() {

    const [shoppingCartState, shoppingCartReducer] =
        useReducer(shoppingCartReducerFunction, initShoppingCartReducerState);

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>Our Store</Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <LinkContainer to="/ShoppingCart">
                                    <Nav.Link>Shopping Cart</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/AboutUs">
                                    <Nav.Link>About Us</Nav.Link>
                                </LinkContainer>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <shoppingCartContext.Provider value={[shoppingCartState, shoppingCartReducer]}>
                        <Routes>
                            <Route exact path="/" element={<Welcome/>}/>
                            <Route path="/ShoppingCart" element={<ShoppingCart/>}/>
                            <Route path="/Checkout" element={<Checkout/>}/>
                            <Route path="/AboutUs" element={<AboutUs/>}/>
                        </Routes>
                </shoppingCartContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;