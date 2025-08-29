import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import 'aos/dist/aos.css';

const ExploreItems = () => {

    useEffect(() => {
        AOS.init({
          duration: 2000, 
          once: true, 
        });
      }, []);


  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState({});
  const [count, setCount] = useState(8);

  useEffect(() => {
    const fetchExplore = async () => {
      setLoading(true);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
      setItems(data);

      const timeout = setTimeout(() => setLoading(false), 1000);

      return () => clearTimeout(timeout);
    };
    fetchExplore();
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setInterval(() => {
        const now = Date.now();
        const updatedTimes = {};
        items.forEach((item) => {
          const diff = item.expiryDate - now;
          if (diff > 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            updatedTimes[item.id] = `${hours}h ${minutes}m ${seconds}s`;
          } else {
            return null;
          }
        });
        setTime(updatedTimes);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [loading, items]);

  const loadMore = () => {
    setCount((prev) => prev + 4);
  };

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    setLoading(true);
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`
      )
      .then(({ data }) => {
        setItems(data);
        setCount(8);
        setLoading(false);
      });
  };

  const skeletons = Array(8).fill(null);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleFilter}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? skeletons.map((_, index) => (
            <div
              key={index}
              style={{
                width: "300px",
                height: "350px",
                margin: "10px",
                borderRadius: "8px",
                background: "linear-gradient(to right, #e2e2e2 0%, #f0f0f0 50%, #e2e2e2 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite linear",
              }}
            ></div>
          ))
        : items.slice(0, count).map((item) => (
            <div
              data-aos="fade-in"
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {item.expiryDate && (
                  <div className="de_countdown">{time[item.id]}</div>
                )}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      {count < 16 && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            onClick={loadMore}
            className="btn-main lead"
          >
            Load more
          </Link>
        </div>
      )}
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>
    </>
  );
};

export default ExploreItems;
