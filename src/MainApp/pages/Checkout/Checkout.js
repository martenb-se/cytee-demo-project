import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {shoppingCartContext} from "../../../App";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/**
 * The checkout page for our store. Where the customer arrives after a successful purchase.
 *
 * @returns {JSX.Element} The checkout page.
 * @constructor
 */
const Checkout = () => {
    const [shoppingCartState, shoppingCartReducer] = useContext(shoppingCartContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (shoppingCartState.items.length === 0) {
            navigate("/");
        } else {
            shoppingCartReducer({
                type: 'removeAllItems'
            });
        }
    },[]);

    return (
        <Container>
            <Row>
                <Col>
                    Thank you for your purchase!
                </Col>
            </Row>
        </Container>
    )
};

export default Checkout