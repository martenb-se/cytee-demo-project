import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {shoppingCartContext} from "../../../App";
import cloneDeep from "lodash/cloneDeep";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

import {sortByProperty} from "../../../util/objectArrayHandling";
import {calculateTotalPriceOfCart} from "../../../util/shoppingCartListHandling";

/**
 * The shopping cart page for our store. Shows the complete shopping cart and enables the customer a fast and easy
 * checkout with a single click.
 *
 * @returns {JSX.Element} The shopping cart page.
 * @constructor
 */
const ShoppingCart = () => {
    const [shoppingCartState, shoppingCartReducer] = useContext(shoppingCartContext);
    const [orderedShoppingCartItemsState, setOrderedShoppingCartItemsState] = useState([]);
    const [totalPriceState, setTotalPriceState] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const clonedShoppingCartItems = cloneDeep(shoppingCartState.items);
        if (clonedShoppingCartItems.length > 0) {                                                                       // [INTENTIONAL BUG POSSIBILITY] Remove this and error is thrown from sortByProperty()
            sortByProperty(clonedShoppingCartItems, "name");
            setOrderedShoppingCartItemsState(clonedShoppingCartItems);
            setTotalPriceState(calculateTotalPriceOfCart(shoppingCartState.items));
        }
    },[shoppingCartState]);

    return (
        <Container>
            <Row>
                <h4>Shopping Cart</h4>
            </Row>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Price (SEK)</th>
                    <th>Amount</th>
                    <th>Total Price (SEK)</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                {(shoppingCartState.items.length === 0 && (
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                )) || (orderedShoppingCartItemsState.map((currentItem, index) => (
                    <tr key={"ShoppingCart" + currentItem.name}>
                        <td>{index + 1}</td>
                        <td>{currentItem.name}</td>
                        <td>{currentItem.price}</td>
                        <td>{currentItem.amount}</td>
                        <td>{currentItem.price * currentItem.amount}</td>
                        <td>
                            <Button
                                variant="warning"
                                size="sm"
                                onClick={() => {
                                    shoppingCartReducer({
                                        type: 'deleteItem',
                                        payload: currentItem
                                    });
                                }}
                            >
                                Remove
                            </Button>
                        </td>
                    </tr>
                )))}
                </tbody>
            </Table>
            <Row>
                <h4>Total: {totalPriceState} SEK</h4>
            </Row>
            <Row>
                <Button
                    variant="primary"
                    size="lg"
                    disabled={shoppingCartState.items.length === 0}
                    onClick={() => {
                        navigate("/Checkout")
                    }}>
                    One-Click Purchase
                </Button>
            </Row>
        </Container>
    )
};

export default ShoppingCart