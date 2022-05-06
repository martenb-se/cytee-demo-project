import {Fragment, useContext, useEffect, useState} from "react";
import itemInfo from "../../../api/itemInfo";

import {shoppingCartContext} from "../../../App";
import {getDaysSinceDate} from "../../../util/timeHandling";

const Welcome = () => {

    const [shoppingCartState, shoppingCartReducer] = useContext(shoppingCartContext);
    const [itemsListState, setItemsListState] = useState([]);

    useEffect(() => {
        itemInfo.getItems().then((itemList) => {
            setItemsListState(itemList);
        })
    },[]);

    return (
        <div>
            <div>
                <span>Our Products</span>
                <ul>
                    {itemsListState.map((currentItem) => (
                        <li>
                            {currentItem.isDiscounted && (
                                <span className="discounted-item">
                                    {currentItem.name} ({currentItem.discountPrice} SEK)
                                    <sup>discounted for {getDaysSinceDate(currentItem.discountDate)}</sup>
                                </span>
                            ) || (
                                <span>
                                    {currentItem.name} ({currentItem.price} SEK)
                                </span>
                            )}
                            <button
                                onClick={() => {
                                    shoppingCartReducer({
                                        type: 'addItem',
                                        payload: currentItem
                                    });
                                }}
                            >
                                Add Item
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <span>Shopping cart</span>
                <ul>
                    {
                        (shoppingCartState.items.length > 0) && (
                            <span>No items in shopping cart</span>
                        ) || (
                            <li>
                                {
                                    shoppingCartState.items.map(currentItem => (
                                            <Fragment>
                                                <span>
                                                    {currentItem.name} {currentItem.price} SEK {currentItem.amount}#
                                                </span>
                                                <button
                                                    onClick={() => {
                                                        shoppingCartReducer({
                                                            type: 'removeItem',
                                                            payload: currentItem.id,
                                                        });
                                                    }}
                                                >
                                                    Remove Item
                                                </button>
                                            </Fragment>
                                        )
                                    )
                                }
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
};

export default Welcome