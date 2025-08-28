import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import AOS from "aos";
import 'aos/dist/aos.css';

const NewItems = () => {

  useEffect(() => {
      AOS.init({
        duration: 2000, 
        once: true, 
      });
    }, []);


  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState({});

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setItems(data);
      setLoading(false);
    };
    fetchItems();
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
          }else {
            return (null)
          }
        });
        setTime(updatedTimes);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [loading, items]);


  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      perView: 4,
    },

    breakpoints: {
      "(max-width: 1200px)": {
        slides: { perView: 3 },
      },
      "(max-width: 992px)": {
        slides: { perView: 2 },
      },
      "(max-width: 576px)": {
        slides: { perView: 1 },
      },
    },
  });

  const handlePrev = () => {
    slider.current?.prev();
  };

  const handleNext = () => {
    slider.current?.next();
  };

  useEffect(() => {
  if (!loading) {
    slider.current?.update();
  }
}, [loading, slider]);

  const skeletons = Array(4).fill(null);

  return (
    <section id="section-items" className="no-bottom">
      <div data-aos="fade-up" className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="position-relative">
            <div ref={sliderRef} className="keen-slider">
              {loading
                ? skeletons.map((_, index) => (
                    <div
                      className="keen-slider__slide"
                      key={index}
                    >
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <div
                            className="skeleton rounded-circle"
                            style={{ width: 50, height: 50 }}
                          ></div>
                        </div>
                        <div className="nft__item_wrap">
                          <div
                            className="skeleton"
                            style={{
                              width: "100%",
                              height: 200,
                            }}
                          ></div>
                        </div>
                        <div className="nft__item_info mt-2">
                          <div
                            className="skeleton mb-2"
                            style={{ width: "80%", height: 20 }}
                          ></div>
                          <div
                            className="skeleton"
                            style={{ width: "40%", height: 20 }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))
                : items.map((item) => (
                    <div
                      className="keen-slider__slide"
                      key={item.id}
                    >
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas"
                          >
                            <img
                              className="lazy"
                              src={item.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        {item.expiryDate && (
                        <div className="de_countdown">{time[item.id]}</div>)}

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
                          <div className="nft__item_price">
                            {item.price} ETH
                          </div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
          {!loading && (
            <>
              <button
                aria-label="Previous slide"
                onClick={handlePrev}
                className="btn btn-light rounded-circle shadow position-absolute d-flex align-items-center justify-content-center"
                style={{
                  width: "40px",
                  height: "40px",
                  left: "80px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "20px",
                  zIndex: 10,
                }}
              >
                &#8249;
              </button>

              <button
                aria-label="Next slide"
                onClick={handleNext}
                className="btn btn-light rounded-circle shadow position-absolute d-flex align-items-center justify-content-center"
                style={{
                  width: "40px",
                  height: "40px",
                  right: "80px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "20px",
                  zIndex: 10,
                }}
              >
                &#8250;
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
