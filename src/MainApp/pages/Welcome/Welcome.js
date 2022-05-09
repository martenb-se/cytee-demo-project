import {useEffect, useState} from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ItemListDisplay from "../../components/ItemListDisplay";
import ShoppingCartMiniDisplay from "../../components/ShoppingCartMiniDisplay";

import itemInfo from "../../../api/itemInfo";
import {getDaysUntilDate, getTodayTimeStamp} from "../../../util/timeHandling";

/**
 * The main page for our store. Contains a component for displaying our items and the shopping cart.
 *
 * @returns {JSX.Element} The main page.
 * @constructor
 */
const Welcome = () => {
    const [itemsListState, setItemsListState] = useState([]);

    const storeDescriptions = ["Amazing", "Fantastic", "Awesome", "Great"];
    const [storeDescriptionState, setStoreDescriptionState] = useState(storeDescriptions[0]);


    useEffect(() => {
        /**
         * TESTER NOTICE:
         *      This is supposed call an API and handle the returned PROMISE by itemInfo.getItems() where the item
         *      list is returned by the promise and then setItemsListState(itemList) is called. But as PROMISES are
         *      not supported by the test creation tool the current implementation of is synchronous and sequential
         *      and the item list is simply returned by itemInfo.getItems().
         */
        setItemsListState(itemInfo.getItems());

        setStoreDescriptionState(storeDescriptions[Math.floor(Math.random() * storeDescriptions.length)]);
    },[]);

    return (
        <Container>
            <Row>
                <h1>
                    Welcome to Our <span className="fst-italic text-success">
                    {storeDescriptionState}</span> Store!
                </h1>
                <p>
                    Stay tuned for our grand opening event
                    in {getDaysUntilDate(getTodayTimeStamp(), "2022-06-14")} day(s)!
                </p>
            </Row>
            <Row>
                <Col>
                    <div><h3>Most Popular Items {getTodayTimeStamp()}</h3></div>
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