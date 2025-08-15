import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellers = async () => {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setSellers(data);
      setLoading(false);
    };
    fetchSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            {loading ? (
                <ol className="author_list">
                  {[...Array(12)].map((_, index) => (
                    <li key={index} className="skeleton-item">
                      <div className="author_list_pp">
                        <div className="skeleton rounded-circle" style={{ width: 50, height: 50 }}></div>
                      </div>
                      <div className="author_list_info">
                        <div className="skeleton skeleton-bar mb-2" style={{ width: "80%", height: 16 }}></div>
                        <div className="skeleton skeleton-bar" style={{ width: "50%", height: 16 }}></div>
                      </div>
                    </li>
                  ))}
                </ol>
            ) : (
              <ol className="author_list">
                {sellers.map((item) => (
                  <li key={item.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={item.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${item.authorId}`}>
                        {item.authorName}
                      </Link>
                      <span>{item.price} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
