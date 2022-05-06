import {createContext, useReducer} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Welcome from "./MainApp/pages/Welcome";
import Checkout from "./MainApp/pages/Checkout";
import ShoppingCart from "./MainApp/pages/ShoppingCart";

import {shoppingCartReducerFunction, initShoppingCartReducerState} from "./reducers/ShoppingCartReducer";

export const shoppingCartContext = createContext(undefined);

function App() {

    const [shoppingCartState, shoppingCartReducer] =
        useReducer(shoppingCartReducerFunction, initShoppingCartReducerState);

    return (
        <div className="App">
            <shoppingCartContext.Provider value={[shoppingCartState, shoppingCartReducer]}>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Welcome/>}/>
                        <Route path="/ShoppingCart" element={<ShoppingCart/>}/>
                        <Route path="/Checkout" element={<Checkout/>}/>
                    </Routes>
                </BrowserRouter>
            </shoppingCartContext.Provider>
        </div>
    );
}

export default App;