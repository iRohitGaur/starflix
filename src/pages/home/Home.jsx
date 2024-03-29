import React, { useState, useEffect } from "react";
import { Card } from "components";
import { useVideo } from "context";
import { useAxios, useDocumentTitle } from "utils";
import "./home.css";
import { useNavigate } from "react-router-dom";
import landingGif from "assets/landing.gif";

function Home() {
  useDocumentTitle("Starflix - Home - Rohit Gaur");

  const [categories, setCategories] = useState([]);
  const { featuredVideos } = useVideo();
  const { operation } = useAxios();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await operation({
          method: "get",
          url: "/categories",
        });
        setCategories(response);
      } catch (error) {
        console.error(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategorySelection = (category) => {
    navigate(`/explore?category=${category}`);
  };

  return (
    <main className="home_page">
      <img className="stf_landing_gif" src={landingGif} alt="logo" />
      <div className="stf_section">
        <h3>Popular Categories</h3>
        <div className="stf_category_wrapper">
          {categories.map((cat) => (
            <div
              className="stf_category_img_wrapper"
              key={cat._id}
              onClick={() => handleCategorySelection(cat.categoryName)}
            >
              <p>{cat.categoryName}</p>
              <img src={cat.categoryImage} alt={cat.categoryName} />
            </div>
          ))}
        </div>
      </div>
      <div className="stf_section">
        <h3>Featured Videos</h3>
        <div className="stf_video_wrapper">
          {featuredVideos.map((video) => (
            <Card key={video._id} videoId={video._id} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;
