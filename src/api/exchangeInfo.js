const exchangeInfo = {
    getRates: () => {
        return new Promise((doResolve, doReject) => {
            fetch('https://api.coingecko.com/api/v3/exchange_rates')
            .then((fetchResult) => {
                return fetchResult.json();
            }).then(data => {
                console.log(data);
                doResolve(data);
            });
        });
    }
}

export default exchangeInfo