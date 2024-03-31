import React from "react";

import {Routes, Route, Navigate} from "react-router-dom";


import Market from "../pages/Market";
import Create from "../pages/Request";
import Contact from "../pages/Contact";

import NftDetails from "../pages/NftDetails";
import Home from "../pages/Home";
import Context from "../contexts/temp";

import { nftContract } from "../adapters/load";

const Routers = () => {
    return (
        <Context.Provider value={nftContract}>
            <Routes>
                <Route path="/"
                    element={
                        <Navigate
                    to="/home"/>
                    }/>
                <Route path="/home"
                    element={<Home/>}/>
                <Route path="/market"
                    element={<Market/>}/>
                <Route path="/request"
                    element={<Create/>}/>
                <Route path="/contact"
                    element={<Contact/>}/>
                <Route path="/market/:id"
                    element={<NftDetails/>}/>
            </Routes>
        </Context.Provider>
    );
};

export default Routers;
