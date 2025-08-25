import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    const fetchAuthor = async () => {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      );
      setAuthor(data);
      setLoading(false);
      setFollowersCount(data.followers);
    };

    fetchAuthor();
  }, [id]);

  const handleFollow = () => {
    if (isFollowing) {
      setFollowersCount((prev) => prev - 1);
    } else {
      setFollowersCount((prev) => prev + 1);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loading ? (
              
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "20px",
                      gap: "20px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {/* Avatar */}
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: "#ccc",
                      }}
                    ></div>

                    {/* Name and info */}
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          width: "150px",
                          height: "20px",
                          background: "#ccc",
                          marginBottom: "10px",
                          borderRadius: "4px",
                        }}
                      ></div>
                      <div
                        style={{
                          width: "100px",
                          height: "16px",
                          background: "#eee",
                          marginBottom: "6px",
                          borderRadius: "4px",
                        }}
                      ></div>
                      <div
                        style={{
                          width: "180px",
                          height: "16px",
                          background: "#eee",
                          borderRadius: "4px",
                        }}
                      ></div>
                    </div>

                    {/* Button */}
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          width: "80px",
                          height: "16px",
                          background: "#ccc",
                          marginBottom: "10px",
                          borderRadius: "4px",
                          marginLeft: "auto",
                        }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              @{author.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {followersCount} followers
                        </div>
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={handleFollow}
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={author?.nftCollection || []}
                    authorImage={author?.authorImage || ""}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
