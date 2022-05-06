import {useContext} from "react";
import {shoppingCartContext} from "../../../App";

import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import {getEntryByPropertyWithValue} from "../../../util/objectArrayHandling";

const ItemListDisplay = ({itemList}) => {
    const maxItemsPerRow = 5;
    const totalRowsNeededForListDisplay = Math.ceil(itemList.length / maxItemsPerRow);
    const listOfItemsForRow = (currentRowNumber) =>
        itemList.slice(currentRowNumber * maxItemsPerRow, (currentRowNumber + 1) * maxItemsPerRow);

    const [shoppingCartState, shoppingCartReducer] = useContext(shoppingCartContext);

    return (
        <div>
            {[...Array(totalRowsNeededForListDisplay).keys()].map((currentRowNumber) => (
                <CardGroup style={{ marginBottom: '1rem' }} key={currentRowNumber}>
                    {listOfItemsForRow(currentRowNumber).map((currentItem, index) => (
                        <Card key={currentItem.name}>
                            <Card.Img
                                variant="top"
                                src={"https://picsum.photos/200/100?cache=" + currentRowNumber + "-" + index} />
                            <Card.Body>
                                <Card.Title>{currentItem.name}</Card.Title>
                                <Card.Text>
                                    {currentItem.description}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <div className="d-grid gap-2">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        onClick={() => {
                                            const previousEntry =
                                                getEntryByPropertyWithValue(
                                                    shoppingCartState.items, "id", currentItem._id);
                                            if (previousEntry === undefined) {
                                                shoppingCartReducer({
                                                    type: 'addItem',
                                                    payload: {
                                                        id: currentItem._id,
                                                        name: currentItem.name,
                                                        price: currentItem.price,
                                                        amount: 1,
                                                        lastChanged: new Date().getTime()
                                                    }
                                                });
                                            } else {
                                                shoppingCartReducer({
                                                    type: 'editItem',
                                                    payload: {
                                                        id: currentItem._id,
                                                        itemData: {
                                                            id: currentItem._id,
                                                            name: currentItem.name,
                                                            price: currentItem.price,
                                                            amount: previousEntry.amount + 1,
                                                            lastChanged: new Date().getTime()
                                                        }
                                                    }
                                                });
                                            }
                                        }}
                                    >
                                        Add to cart
                                    </Button>
                                </div>
                            </Card.Footer>
                        </Card>
                    ))}
                </CardGroup>
            ))}
        </div>
    )
};

export default ItemListDisplay