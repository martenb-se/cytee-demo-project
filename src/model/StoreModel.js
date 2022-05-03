class StoreModel {
    constructor(storeName) {
        this.storeName = storeName;
        this.itemObservers = [];
    }

    addItemObserver(observerCallbackToAdd) {
        this.itemObservers = this.itemObservers.concat(observerCallbackToAdd);
        return () => this.removeItemObserver(observerCallbackToAdd);
    }

    notifyItemObservers(addedItemInfo) {
        this.itemObservers.forEach(function(observerCallback) {
            observerCallback(addedItemInfo);
        });
    }

    removeItemObserver(observerCallbackToRemove) {
        this.itemObservers = this.itemObservers.filter(inspectedCallback => {
            return inspectedCallback !== observerCallbackToRemove;
        });
    }
}

export default StoreModel;