import React from 'react'
import './brandsIntegration.css'
import metamaskIMG from '../../assets/images/metamask-icon.png';
import ganache from '../../assets/images/ganache.png';
import sol from '../../assets/images/Solidity-Logo.png';
import ipfs from '../../assets/images/ipfs.png';
import react from '../../assets/images/react.svg';

const BrandsIntegration = () => {
    return (
        <div className="brands-integration absolute-center">
            <img style={
                    {width: "50px"}
                }
                src={metamaskIMG}
                className="bi-logos"
                alt="metamask-icon.png"/>
            <img style={
                    {width: "50px"}
                }
                src={ganache}
                className="bi-logos"
                alt="ganache-icon.png"/>
            <img style={
                    {width: "50px"}
                }
                src={sol}
                className="bi-logos"
                alt="solidity-icon.png"/>
            <img style={
                    {width: "50px"}
                }
                src={ipfs}
                className="bi-logos"
                alt="ipfs-icon.png"/>
            <img style={
                    {width: "50px"}
                }
                src={react}
                className="bi-logos"
                alt="react-icon.png"/>
        </div>
    )
}

export default BrandsIntegration;
