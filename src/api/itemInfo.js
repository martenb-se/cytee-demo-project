const itemInfo = {
    getItems: () => {
        return new Promise((doResolve, doReject) => {
            fetch('https://api.storepage.dev/get_items')
            .then((fetchResult) => {
                return fetchResult.json();
            }).then(data => {
                doResolve(data);
            });
        });
    }
}

export default itemInfo