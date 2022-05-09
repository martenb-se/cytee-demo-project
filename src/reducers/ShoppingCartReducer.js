import cloneDeep from 'lodash/cloneDeep';

/**
 * TESTER NOTICE:
 *      This is a framework specific technique, it is currently not supported by our prototype. There is no
 *      need to write tests for anything defined here.
 */
const initShoppingCartReducerState = {
    items: [],
    error: null
}

const shoppingCartReducerFunction = (state, action) => {
    const newState = cloneDeep(state);

    switch(action.type) {
        case 'addItem':
            newState.items.push(action.payload);
            newState.error = null;
            return newState;
            
        case 'deleteItem':
            const removedItemIndex = newState.items.findIndex(item => item.id === action.payload.id);

            if (removedItemIndex === -1) {
                newState.error = {
                    code: "ID_NOT_FOUND",
                    message: "Item with id " + action.payload.id + " could not be found in shopping cart."
                }
            }

            newState.items.splice(removedItemIndex, 1);
            newState.error = null;
            return newState;
            
        case 'editItem':
            const editedItemIndex = newState.items.findIndex(item => item.id === action.payload.id);

            if (editedItemIndex === -1) {
                newState.error = {
                    code: "ID_NOT_FOUND",
                    message: "Item with id " + action.payload.id + " could not be found in shopping cart."
                }
            }

            const newItem = action.payload.itemData;

            newState.items.splice(editedItemIndex, 1, newItem);
            newState.error = null;
            return newState;

        case 'removeAllItems':
            newState.items = [];
            newState.error = null;
            return newState;

        default:
            newState.error = {
                code: "INVALID_ACTION",
                message: "The action type '" + action.type + "' is not valid."
            };
            return newState;
    }
}

export {shoppingCartReducerFunction, initShoppingCartReducerState};
