import React, {useState} from "react";
import {Link} from "react-router-dom";

import "./card.css";
import {Button} from 'reactstrap';
import {ownerAvas} from "../../../assets/data/data";


const initialAddress = "0x0000000000000000000000000000000000000000";

const NftCard = (props) => {
    const {nftId, nftOwner, nftLink} = props.NFT;
    const currentAccount = localStorage.getItem('ACCOUNT');

    const randomOwnerAva = () => {
        return Math.floor(Math.random() * 5);
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

                    <div className="creator__info creator__address w-100 d-flex align-items-center justify-content-between">
                        <div>
                            <h6>Owned By</h6>
                            <p>{nftOwner}</p>
                        </div>
                    </div>
                </div>

                <div className=" mt-3 d-flex align-items-center justify-content-between">
                    {
                    ((nftOwner === initialAddress)) ? <Button color="primary"
                        onClick={
                            () => props.mint(nftId)
                    }>
                        <i className="ri-shopping-bag-line"></i>
                        Mint
                    </Button> : (nftOwner !== currentAccount) && <Button color="primary"
                        onClick={
                            () => props.buy(nftId)
                    }>
                        <i className="ri-shopping-bag-line"></i>
                        Buy
                    </Button>
                }

                    <span className="history__link">
                        <Link className={
                                {
                                    textDecoration: 'none',
                                    listStyle: "none"
                                }
                            }
                            to={
                                `/market/${nftId}`
                        }>
                            <Button color="success">View Details</Button>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NftCard;
