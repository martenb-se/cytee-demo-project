import cloneDeep from 'lodash/cloneDeep';
import ItemNotFoundError from "../util/customErrors/ItemNotFoundError";

const initShoppingCartReducerState = {
    items: [],
}

const shoppingCartReducerFunction = (state, action) => {

    const newState = cloneDeep(state);

    switch(action.type) {
        case 'addItem':
            newState.items.push(action.payload);
            return newState;
            
        case 'deleteItem':
            const removedItemIndex = newState.items.findIndex(item => item.id === action.payload.id);

            if (removedItemIndex === -1) {
                throw new ItemNotFoundError('Item with id ' + action.payload.id +
                    ' could not be found in shopping cart');
            }

            newState.items.splice(removedItemIndex, 1);
            return newState;
            
        case 'editItem':
            const editedItemIndex = newState.items.findIndex(item => item.id === action.payload.id);

            if (editedItemIndex === -1) {
                throw new ItemNotFoundError('Item with id ' + action.payload.id +
                    ' could not be found in shopping cart');
            }

            const newItem = action.payload.itemData;
            // TODO: check if action.payload is good.

            newState.items.splice(editedItemIndex, 1, newItem);
            return newState;

        case 'clearCart':
            newState.items = [];
            return newState;

        default:
            throw new Error();
    }
}

export {shoppingCartReducerFunction, initShoppingCartReducerState};
