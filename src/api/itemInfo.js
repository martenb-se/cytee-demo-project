const itemInfo = {
    /**
     * TESTER NOTICE:
     *      This function is supposed to be an API call that fetches items from a database in a backend.
     *      But MOCKING and handling of PROMISES are not yet supported in the test creation tool. So this is a
     *      SEQUENTIAL and HARD CODED testable representation to be used in the first prototype.
     *
     * Get all items available in the store.
     *
     * @returns {Array<{_id: string, name: string, price: number, description: string, discountPrice: number,
     * discountDate: string}>}
     */
    getItems: () => {
        return fakedStoreDatabase.tableItems;
    },
    /**
     * TESTER NOTICE:
     *      This function is supposed to be an API call that fetches items from a database in a backend.
     *      But MOCKING and handling of PROMISES are not yet supported in the test creation tool. So this is a
     *      SEQUENTIAL and HARD CODED testable representation to be used in the first prototype.
     *
     * @param {Array<string>} idsToFind The Ids of the items to get.
     *
     * @returns {Array<{_id: string, name: string, price: number, description: string, discountPrice: number,
     * discountDate: string}>}
     */
    getItemsById: (idsToFind) => {
        return fakedStoreDatabase.tableItems.filter(itemEntry => idsToFind.includes(itemEntry._id));
    }
}

/**
 * TESTER NOTICE:
 *      This is a HARDCODED representation of the store database.
 */
const fakedStoreDatabase = {
    /**
     * TESTER NOTICE:
     *      This is a HARDCODED representation of the table 'items'.
     *      The list of items comes from top 10 at: https://www.prisjakt.nu/kategori.php?k=v100 (2022-05-06)
     *
     * @type {Array<{_id: string, name: string, price: number, description: string, discountPrice: number,
     * discountDate: string}>}
     */
    tableItems: [
        {
            _id: "6274d771fdb917fcccd75b15",
            name: "Apple iPhone 12 5G Dual SIM 4GB RAM 64GB",
            price: 6399,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis congue nunc nec luctus dictum."
        },
        {
            _id: "6274d771fdb917fcccd75b47",
            name: "Apple AirPods Pro Wireless In-ear",
            price: 2199,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis congue nunc nec luctus dictum.",
            discountPrice: 1990,
            discountDate: "2022-06-01"
        },
        {
            _id: "6274d771fdb917fcccd75457",
            name: "Apple iPhone 13 5G Dual SIM 4GB RAM 128GB",
            price: 8975,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis congue nunc nec luctus dictum."
        },
        {
            _id: "6274d771fdb917fcccd75b1c",
            name: "Apple AirPods (2nd Generation)",
            price: 1180,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis congue nunc nec luctus dictum."
        },
        {
            _id: "6274d771fdb917fcccd75b31",
            name: "Apple iPad 10.2\" 64GB (9th Generation)",
            price: 3799,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis congue nunc nec luctus dictum."
        },
        {
            _id: "6274d771fdb917fcccd75a23",
            name: "Sony PlayStation 5 (PS5) 2020 825GB",
            price: 10490,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis congue nunc nec luctus dictum.",
            discountPrice: 9546,
            discountDate: "2022-05-26"
        },
        {
            _id: "6274d771fdb917fcccd75a14",
            name: "Apple iPhone 13 Pro 5G Dual SIM 6GB RAM 128GB",
            price: 11979,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis congue nunc nec luctus dictum."
        },
        {
            _id: "6274d771fdb917fcccd75b82",
            name: "LG OLED65C1 65\" 4K Ultra HD (3840x2160) OLED (AMOLED) Smart TV",
            price: 14890,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis congue nunc nec luctus dictum."
        },
        {
            _id: "6274d771fdb917fcccd75936",
            name: "Weber Genesis II E-310 GBS",
            price: 8699,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis congue nunc nec luctus dictum.",
            discountPrice: 8290,
            discountDate: "2022-05-26"
        },
        {
            _id: "6274d771fdb917fcccd75831",
            name: "Samsung Galaxy S21 SM-G991B 5G Dual SIM 8GB RAM 128GB",
            price: 5974,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis congue nunc nec luctus dictum."
        }
    ]
}

export default itemInfo