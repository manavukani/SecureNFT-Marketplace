import React, {useState} from "react";

import {Container, Row, Col} from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import {nftContract} from '../adapters/load';
import {Button} from 'reactstrap'
import "../styles/create-item.css";


const Create = () => {
    const [nftDescription, setNftDescription] = useState("")
    const [nftLink, setNftLink] = useState("")

    const sendRequest = async (nftDescription, nftLink) => {
        const res = await nftContract.methods.requestPermission(nftDescription, nftLink).send({from: localStorage.getItem("ACCOUNT")})
        window.location.reload();
    }


    return (
        <>
            <CommonSection title="Request Item"/>

            <section>
                <Container>
                    <Row>
                        <Col lg="3" md="4" sm="6">
                            <h5 className="mb-4 text-light">Preview Item</h5>
                            <div className="single__nft__card">
                                <div className="nft__img">
                                    <img src={nftLink}
                                        alt=""
                                        className="w-100"/>
                                </div>
                            </div>
                        </Col>

                        <Col lg="9" md="8" sm="6">
                            <div className="create__item">
                                <form>
                                    <div className="form__input">
                                        <label htmlFor="">IPFS Link</label>
                                        <input onChange={
                                                (e) => setNftLink(e.target.value)
                                            }
                                            type="text"
                                            value={nftLink}
                                            placeholder="Enter the IPFS link of your image"/>
                                    </div>

                                    <div className="form__input">
                                        <label htmlFor="">Description</label>
                                        <textarea onChange={
                                                (e) => setNftDescription(e.target.value)
                                            }
                                            value={nftDescription}
                                            name=""
                                            id=""
                                            rows="7"
                                            placeholder="Enter description"
                                            className="w-100"></textarea>
                                    </div>
                                </form>
                                <Button color="primary" type="submit"
                                    onClick={
                                        () => sendRequest(nftDescription, nftLink)
                                }>Request</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Create;
