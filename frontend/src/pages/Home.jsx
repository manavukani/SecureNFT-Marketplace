import React from "react";
import BrandsIntegration from "./BrandsIntegration";
import "../styles/topFold.css"

const Home = () => {
    return (
        <> {}
            <>
                <div className="topFold absolute-center container">
                    <div className="tf-left">
                        <div className="tf-heading">
                            Discover collect, and sell{" "}
                            <span className="heading-gradient">Extraordinary
                            </span>
                            NFTs
                        </div>


                        <div className="tf-description">
                            <BrandsIntegration/>
                        </div>
                        <div className="tf-left-infoStats">
                            <div className="tf-is-infoItem absolute-center">
                                <div className="tf-infoItem-count">200k+</div>
                                <div className="tf-infoItem-label">Collections</div>
                            </div>

                            <div className="tf-is-infoItem">
                                <div className="tf-infoItem-count absolute-center">10+</div>
                                <div className="tf-infoItem-label">Artists</div>
                            </div>

                            <div className="tf-is-infoItem">
                                <div className="tf-infoItem-count absolute-center">444+</div>
                                <div className="tf-infoItem-label">Community</div>
                            </div>

                        </div>
                    </div>
                    <div className="tf-right">
                        <div className="tf-r-bg-blob"></div>
                        <div className="tf-right-diamond">
                            <div className="tf-r-diamond-item absolute-center">
                                <img className="tf-r-diamond-img" alt="diamond-banner" src="https://i.seadn.io/gae/LIpf9z6Ux8uxn69auBME9FCTXpXqSYFo8ZLO1GaM8T7S3hiKScHaClXe0ZdhTv5br6FE2g5i-J5SobhKFsYfe6CIMCv-UfnrlYFWOM4?auto=format&w=128"/>
                            </div>

                            <div className="tf-r-diamond-item absolute-center">
                                <img className="tf-r-diamond-img" alt="diamond-banner" src="https://i.seadn.io/gae/oRn94QjmMzr8tEA4LXFBmT03p4F_13Cj-yjsJ1tthWEvQ1583GwvqKuY2BtKlwJl-CQc77yPecljXnTxbbuBudFWAaLOaEaQ5JdoOw?auto=format&w=128"/>
                            </div>

                            <div className="tf-r-diamond-item absolute-center">
                                <img className="tf-r-diamond-img" alt="diamond-banner" src="https://i.seadn.io/gae/EFAQpIktMBU5SU0TqSdPWZ4byHr3hFirL_mATsR8KWhM5z-GJljX8E73V933lkyKgv2SAFlfRRjGsWvWbQQmJAwu3F2FDXVa1C9F?auto=format&w=128"/>
                            </div>

                            <div className="tf-r-diamond-item absolute-center">
                                <img className="tf-r-diamond-img" alt="diamond-banner" src="https://i.seadn.io/gae/mhHqco_bu5oRx1TftVg36aztvlsk44FT_RSzHv0MC0erh6_jwJSjdA-dvZumhTLaBo8-HDzTh5xVRGVExLeNbBK4oYK3N9xJxR2CHg?auto=format&w=128"/>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        </>
    );
};

export default Home;
