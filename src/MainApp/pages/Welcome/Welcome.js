import {useEffect, useState} from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import itemInfo from "../../../api/itemInfo";
import ItemListDisplay from "../../components/ItemListDisplay";
import ShoppingCartMiniDisplay from "../../components/ShoppingCartMiniDisplay";

const Welcome = () => {
    const [itemsListState, setItemsListState] = useState([]);

    useEffect(() => {
        /**
         * TESTER NOTICE:
         *      This is supposed call an API and handle the returned PROMISE by itemInfo.getItems() where the item
         *      list is returned by the promise and then setItemsListState(itemList) is called. But as PROMISES are
         *      not supported by the test creation tool the current implementation of is synchronous and sequential
         *      and the item list is simply returned by itemInfo.getItems().
         */
        setItemsListState(itemInfo.getItems());
    },[]);

    return (
        <Container>
            <Row>
                <Col>
                    <div><h3>Top 10 Items</h3></div>
                    <ItemListDisplay itemList={itemsListState} />
                </Col>
                <Col xs lg="2">
                    <div><h4>Shopping Cart</h4></div>
                    <ShoppingCartMiniDisplay />
                </Col>
            </Row>
        </Container>
    )
};

export default Welcome