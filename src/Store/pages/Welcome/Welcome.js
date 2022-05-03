import {useEffect, useState} from "react";
import exchangeInfo from "../../../api/exchangeInfo";

const Welcome = () => {
    const [ratesState, setRatesState] = useState({})

    useEffect(() => {
        exchangeInfo.getRates().then((ratesInformation) => {
            setRatesState(ratesInformation);
        })
    },[]);

    return (
        <div>
            <span>Best rates</span>
            <pre>{JSON.stringify(ratesState)}</pre>
        </div>
    )
};

export default Welcome