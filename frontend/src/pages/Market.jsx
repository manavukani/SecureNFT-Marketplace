import React, {useState, useEffect, useContext} from "react";
import Web3 from 'web3';
import {Button} from 'reactstrap';
import CommonSection from "../components/ui/Common-section/CommonSection";
import { nftContract } from '../adapters/load';
import NftCard from "../components/ui/Card/NftCard";
import {Container, Row, Col} from "reactstrap";

import "../styles/market.css";
import RequestCard from "../components/ui/Card/RequestCard";

import Context from "../contexts/temp";


const Market = () => {

    const nftContract = useContext(Context);
    const [NFTs, setNFTs] = useState([])
    const [ownerVisit, setOwnerVisit] = useState(false)
    const [showRequest, setShowRequest] = useState(false)
    const [Requests, setRequests] = useState([])


    const trackOwnerChange = async (nftId) => {
        const res = await nftContract.getPastEvents("Transfer")
        await nftContract.methods.storeOwners(nftId, res[0].returnValues.from, res[0].returnValues.to).send({from: localStorage.getItem("ACCOUNT")})
    }

    const checkOwnerVisit = async () => {
        const contractOwner = await nftContract.methods.getContractOwner().call();
        if (contractOwner === localStorage.getItem("ACCOUNT")) {
            setOwnerVisit(true)
        }
    }

    const loadUser = async () => {
        const web3 = new Web3(Web3.givenProvider || window.ethereum);

        if (! web3) {
            return Error("Please install MetaMask.");
        }

        const accounts = await web3.eth.requestAccounts();

        if (accounts.length > 0) {
            localStorage.setItem("ACCOUNT", accounts[0]);
            // localStorage.setItem("nftContract",nftContract)
        }
    }

    const fetchNFTs = async () => {
        try {
            const NFTs = await nftContract.methods.returnInitialObjects().call()
            // console.log(NFTs)
            setNFTs(NFTs);
            // add this also as global variable
            localStorage.setItem("nftItems", JSON.stringify(NFTs))
        } catch (error) {
            console.log(error)
        }
    }

    const mint = async (nftId) => {
        try {
            await nftContract.methods.mint(nftId).send({from: localStorage.getItem("ACCOUNT")})
            // capture the event here
            // await trackOwnerChange(nftId);
            window.location.reload();

            // res.transactionHash?toast.error("Done"):toast.error("Invalid reason!");
        } catch (error) {
            console.log(error)
        }
    }

    const buy = async (nftId) => {
        try {
            await nftContract.methods.buy(nftId).send({from: localStorage.getItem("ACCOUNT")})
            // capture the event here
            // await trackOwnerChange(nftId);
            window.location.reload();
            // res.transactionHash?toast.error("Done"):toast.error("Invalid reason!");
        } catch (error) {
            console.log(error)
        }
    }

    const viewRequests = async () => {
        try {
            const res = await nftContract.methods.viewRequests().call()
            setRequests(res)
            setShowRequest(true)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const viewNFTs = () => {
        setShowRequest(false)
    }


    useEffect(() => {
        loadUser();
        checkOwnerVisit();
        fetchNFTs();
    }, [])
    return (
        <>
            <CommonSection title={"MarketPlace"}/> {
            ownerVisit && !showRequest ? <Button color="primary"
                onClick={viewRequests}>View Requests</Button> : null
        }
            {
            ownerVisit && showRequest ? <Button color="primary"
                onClick={viewNFTs}>View NFTs</Button> : null
        }
            <section>
                <Container>
                    <Row> {
                        showRequest ? <> {
                            Requests ?. map((Request) => (
                                <Col lg="3" md="4" sm="6" className="mb-4"
                                    key={
                                        Request.nftId
                                }>
                                    <RequestCard Request={Request}
                                        ownerVisit={ownerVisit}/>
                                </Col>
                            ))
                        } </> : <> {
                            NFTs ?. map((NFT) => (
                                <Col lg="3" md="4" sm="6" className="mb-4"
                                    key={
                                        NFT.nftId
                                }>
                                    <NftCard NFT={NFT}
                                        mint={mint}
                                        buy={buy}/>
                                </Col>
                            ))
                        } </>
                    } </Row>
                </Container>
            </section>
        </>
    );
};

export default Market;
