import React from "react";
import {nftContract} from "../../../adapters/load";

import "./card.css";
import {Button} from "reactstrap";

import {ownerAvas} from "../../../assets/data/data";

const RequestCard = (props) => {
    const {nftId, nftOwner, nftLink} = props.Request;

    const randomOwnerAva = () => {
        return Math.floor(Math.random() * 5);
    }

    const grantPermission = async () => {
        await nftContract.methods.decidePermission(true, nftId).send({from: localStorage.getItem("ACCOUNT")})
        window.location.reload();
    }

    return (
        <div className="single__nft__card">
            <div className="nft__img">
                <img src={nftLink}
                    alt=""
                    className="w-100"/>
            </div>

            <div className="nft__content">

                <div className="creator__info-wrapper d-flex gap-3">
                    <div className="creator__img">
                        <img src={
                                ownerAvas[randomOwnerAva()]
                            }
                            alt=""
                            className="w-100"/>
                    </div>

                    <div className="creator__info w-100 d-flex align-items-center justify-content-between">
                        <div>
                            <h6>Requested By</h6>
                            <p>{nftOwner}</p>
                        </div>
                    </div>
                </div>

                <div className=" mt-3 d-flex align-items-center justify-content-between">
                    <Button color="warning"
                        onClick={
                            () => grantPermission(nftId)
                    }>
                        <i className="ri-shopping-bag-line"></i>
                        Grant
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;
