import {useContext, useState, useEffect, Fragment} from "react";
import cloneDeep from "lodash/cloneDeep";
import {shoppingCartContext} from "../../../App";

import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import {
    BsFillCartPlusFill as IconAddToShoppingCart,
    BsFillInfoCircleFill as IconDisplayMoreInformation} from "react-icons/bs";

import itemInfo from "../../../api/itemInfo";
import {getEntryByPropertyWithValue} from "../../../util/objectArrayHandling";
import {getDiscountPercentage} from "../../../util/priceHandling";
import {getDaysUntilDate, getTodayTimeStamp} from "../../../util/timeHandling";

/**
 * Component for displaying a given list of items beautifully.
 *
 * @param {Array<{_id: string, name: string, price: number, description: string, discountPrice: number,
 * discountDate: string}>} itemList The list of items to display.
 * @returns {JSX.Element} The component for displaying a list of items.
 * @constructor
 */
const ItemListDisplay = ({itemList}) => {
    const maxItemsPerRow = 5;
    const totalRowsNeededForListDisplay = Math.ceil(itemList.length / maxItemsPerRow);

    const [shoppingCartState, shoppingCartReducer] = useContext(shoppingCartContext);
    const [modalItemInformationIdState, setModalItemInformationIdState] = useState(undefined);
    const [modalItemInformationContentsState, setModalItemInformationContentsState] = useState(undefined);

    useEffect(() => {
        if (modalItemInformationIdState !== undefined) {
            setModalItemInformationContentsState(itemInfo.getItemsById(modalItemInformationIdState)[0]);
        } else {
            setModalItemInformationContentsState(undefined);
        }
    },[modalItemInformationIdState]);

    /**
     * Get a list of items for the given item row number.
     *
     * @param rowNumber The row number to get the list of items for.
     * @returns {Array<{_id: string, name: string, price: number, description: string, discountPrice: number,
     * discountDate: string}>} The list of items for the given row.
     */
    const listOfItemsForRow = (rowNumber) =>
        itemList.slice(rowNumber * maxItemsPerRow, (rowNumber + 1) * maxItemsPerRow);

    /**
     * Creates a callback for the given item that adds said item to the shopping cart reducer.
     *
     * @param {{_id: string, name: string, price: number, description: string, discountPrice: number,
     * discountDate: string}} item The item to create an "add to shopping cart" callback for.
     * @returns {(function(): void)|*} The "add to shopping cart" callback.
     */
    const createCallbackAddToShoppingCart = (item) => {
        return () => {
            let existingItemInShoppingCart = undefined;
            if (shoppingCartState.items.length > 0) {
                existingItemInShoppingCart =
                    getEntryByPropertyWithValue(shoppingCartState.items, "id", item._id);
            }

            if (existingItemInShoppingCart === undefined) {
                shoppingCartReducer({
                    type: 'addItem',
                    payload: {
                        id: item._id,
                        name: item.name,
                        price: item.discountPrice !== undefined ? item.discountPrice : item.price,
                        amount: 1,
                        lastChanged: new Date().getTime()
                    }
                });
            } else {
                shoppingCartReducer({
                    type: 'editItem',
                    payload: {
                        id: item._id,
                        itemData: {
                            id: item._id,
                            name: item.name,
                            price: item.discountPrice !== undefined ? item.discountPrice : item.price,
                            amount: existingItemInShoppingCart.amount + 1,
                            lastChanged: new Date().getTime()
                        }
                    }
                });
            }
        }
    }

    /**
     * Get a section for displaying an item's name.
     *
     * @param {{_id: string, name: string, price: number, description: string, discountPrice: number,
     * discountDate: string}} item The item to display the name for.
     * @returns {JSX.Element} The section for displaying an item's name.
     * @constructor
     */
    const SectionItemName = ({item}) => (
        <Card.Body>
            <Card.Text>{item.name}</Card.Text>
        </Card.Body>
    );

    /**
     * Get a section for displaying an item's price.
     *
     * @param {{_id: string, name: string, price: number, description: string, discountPrice: number,
     * discountDate: string}} item The item to display the price for.
     * @returns {JSX.Element} The section for displaying an item's price.
     * @constructor
     */
    const SectionItemPrice = ({item}) => (
        <Card.Subtitle>
            {(item.discountPrice !== undefined && (
                <Card.Text>
                    {item.discountPrice} SEK
                    <sup>
                        <Badge bg="danger" pill>
                            - {getDiscountPercentage(item.price, item.discountPrice)}%
                        </Badge>
                    </sup>
                </Card.Text>
            )) || (
                <Card.Text>
                    {item.price} SEK
                </Card.Text>
            )}
        </Card.Subtitle>
    );

    /**
     * Get a section for displaying actions to take for an item.
     * The actions include adding an item to the shopping cart and reading more information about the item.
     *
     * @param {{_id: string, name: string, price: number, description: string, discountPrice: number,
     * discountDate: string}} item The item to display the price for.
     * @returns {JSX.Element} The section for displaying an item's price.
     * @constructor
     */
    const SectionItemActions = ({item}) => (
        <Card.Footer>
            <ButtonGroup aria-label="Basic example">
                <OverlayTrigger
                    placement="bottom"
                    overlay={
                        <Tooltip id="button-tooltip-2">
                            Read more information about {item.name}..
                        </Tooltip>}
                >
                    <Button
                        variant="primary"
                        onClick={() => setModalItemInformationIdState(item._id)}
                    >
                        <IconDisplayMoreInformation />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    overlay={
                        <Tooltip id="button-tooltip-2">
                            Add {item.name} to shopping cart!
                        </Tooltip>}
                >
                    <Button
                        variant="primary"
                        onClick={createCallbackAddToShoppingCart(item)}
                    >
                        <IconAddToShoppingCart />
                    </Button>
                </OverlayTrigger>
            </ButtonGroup>
        </Card.Footer>
    )

    /**
     * Get a modal for displaying more information about the given item.
     *
     * @returns {JSX.Element} The modal for displaying more information about an item.
     * @constructor
     */
    const ModalItemInformation = () => {
        let itemInfo = {};
        if (modalItemInformationContentsState !== undefined) {
            itemInfo = cloneDeep(modalItemInformationContentsState);
        }

        return (
            <Modal
                show={modalItemInformationContentsState !== undefined}
                onHide={() => setModalItemInformationIdState(undefined)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">{itemInfo.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{itemInfo.description}</p>
                    {(itemInfo.discountPrice !== undefined && (
                        <Fragment>
                            <small>Previous price: {itemInfo.price} SEK</small>
                            <p>
                                Current discounted price until {itemInfo.discountDate}: <mark className="bg-danger">
                                {itemInfo.discountPrice} SEK</mark> <sup>
                                ({getDiscountPercentage(itemInfo.price, itemInfo.discountPrice)}% discount)</sup>
                            </p>
                            <p>
                                Hurry up and buy before it's too late, the discount will be over
                                in <mark className="bg-danger">{getDaysUntilDate(getTodayTimeStamp(),
                                itemInfo.discountDate)}</mark> day(s)!
                            </p>
                        </Fragment>
                    )) || (
                        <p>Price: {itemInfo.price} SEK</p>
                    )}
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <div>
            {[...Array(totalRowsNeededForListDisplay).keys()].map((currentRowNumber) => (
                <CardGroup style={{ marginBottom: '1rem' }} key={currentRowNumber}>
                    {listOfItemsForRow(currentRowNumber).map((currentItem, index) => (
                        <Card key={currentItem.name}>
                            <Card.Img
                                variant="top"
                                src={"https://picsum.photos/200/100?cache=" + currentRowNumber + "-" + index} />
                            <SectionItemName item={currentItem} />
                            <SectionItemPrice item={currentItem} />
                            <SectionItemActions item={currentItem} />
                        </Card>
                    ))}
                    <ModalItemInformation />
                </CardGroup>
            ))}
        </div>
    )
};

export default ItemListDisplay