import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {

  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const { data } = await axios.get( `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`);
      setDetails(data);
      setLoading(false);
    };
    fetchDetails();
  },[id]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div id="wrapper">
        <div id="content" className="no-bottom no-top">
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                {/* Left side */}
                <div className="col-md-6 text-center">
                  <div
                    style={{
                      width: "100%",
                      height: "400px",
                      background: "#ccc",
                      borderRadius: "10px",
                    }}
                  ></div>
                </div>
                {/* Right side */}
                <div className="col-md-6">
                  <div
                    style={{
                      width: "60%",
                      height: "24px",
                      background: "#ccc",
                      marginBottom: "20px",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "40%",
                      height: "16px",
                      background: "#eee",
                      marginBottom: "10px",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "80%",
                      height: "16px",
                      background: "#eee",
                      marginBottom: "10px",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "50%",
                      height: "20px",
                      background: "#ddd",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!details) {
    return (
      <p style={{ padding: "100px", textAlign: "center" }}>
        No details found.
      </p>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={details?.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{details?.title} #{details?.tag}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {details?.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {details?.likes}
                    </div>
                  </div>
                  <p>
                    {details?.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${details?.ownerId}`}>
                            <img className="lazy" src={details?.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${details?.ownerId}`}>{details?.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${details?.ownerId}`}>
                            <img className="lazy" src={details?.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${details?.ownerId}`}>{details?.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{details?.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
