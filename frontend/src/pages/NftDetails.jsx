import React, {useState, useEffect, useContext} from "react";
import CommonSection from "../components/ui/Common-section/CommonSection";
import {useParams} from "react-router-dom";
import {Container, Row, Col, Button} from "reactstrap";
import {nftContract} from "../adapters/load.js";
import "../styles/nft-details.css";
import ava01 from "../assets/images/ava-01.png";
import Context from "../contexts/temp";
import arrow from "../assets/images/arrow.svg"

const NftDetails = () => {
    const initialAddress = "0x0000000000000000000000000000000000000000";
    const nftContract = useContext(Context)
    const {id} = useParams();
    const [NFT, setNFT] = useState([])
    const [nftOwners, setNftOwners] = useState([])

    const getNftOwners = async () => {
        var res = await nftContract.methods.getNftOwners(id).call();

        let x = [];
        for (let i = 0; i < res.length; i += 2) {
            x.push({
                from: res[i],
                to: res[i + 1]
            });
        }
        setNftOwners(x);
    }

    const viewTokenUri = async (nftId) => {
        nftId -= 1;
        const res = await nftContract.methods.getTokenURI(nftId).call()
        window.open(res)
    }

    useEffect(() => {
        var res = localStorage.getItem("nftItems");
        res = JSON.parse(res)
        console.log(res[0])
        for (var i = 0; i < res.length; i++) {
            if (res[i][1] === id) {
                setNFT(res[i]);
                break;
            }
        }

        getNftOwners();

        var nftContract = localStorage.getItem("nftContract")
        console.log(nftContract)
        const res1 = nftContract.getPastEvents("allEvents")
        console.log(res1)
        // viewHistory(id)
    }, [])

    return (
        <>
            <CommonSection/>
            <section>
                <Container>
                    <Row>
                        <Col lg="4" md="6" sm="6">
                            <img src={
                                    NFT[2]
                                }
                                alt=""
                                className="w-100 single__nft-img"/>
                        </Col>

                        <Col lg="8" md="6" sm="6">
                            <div className="single__nft__content">
                                <h2 style={
                                    {marginBottom: "50px"}
                                }>
                                    <b>ARKHAM PROJECT #
                                    </b>
                                    {
                                    NFT[1]
                                }</h2>


                                <div className="nft__creator d-flex gap-3 align-items-center">
                                    <div className="creator__img">
                                        <img src={ava01}
                                            alt=""
                                            className="w-100"/>
                                    </div>

                                    <div className="creator__detail">
                                        <p>Owned By</p>
                                        <h6>{
                                            NFT[0]
                                        }</h6>
                                    </div>
                                </div>
                                <p>
                                    <b>Description:
                                    </b>
                                    <div> {
                                        NFT[3]
                                    }</div>
                                </p>
                                <p>
                                    <b>History</b>
                                    {
                                    NFT[0] === initialAddress ? (
                                        <p>No records yet</p>
                                    ) : (nftOwners ?. map((address, ind) => (
                                        <p>{
                                            address.from
                                        }<img src={arrow}/>{
                                            address.to
                                        }</p>
                                    )))
                                }</p>

                                {
                                NFT[0] === initialAddress ? null : (
                                    <Button color='warning'
                                        onClick={
                                            () => {
                                                viewTokenUri(NFT[1])
                                            }
                                    }>View Token URI</Button>
                                )
                            } </div>
                        </Col>
                    </Row>
                </Container>
            </section>

        </>
    );
};

export default NftDetails;
