import React from "react";
import Layout from "../components/layout/layout";
const aboutUsImage = process.env.PUBLIC_URL + "/aboutUs.jpg";

const About = () => {
  return (
    <Layout title={"About us - ShopSpot"}>
      <div className="about-container">
        <div className="about-content">
          <img
            src={aboutUsImage}
            alt="About us"
            className="about-image"
            data-aos="fade-right" // Add animation attribute for image
            data-aos-duration="1000" // Set animation duration for image
          />
          <div
            className="card about-card"
            data-aos="fade-left" // Add animation attribute for card
            data-aos-duration="1000" // Set animation duration for card
          >
            <div className="card-body">
              <h5 className="card-title">Welcome to ShopShot</h5>
              <p className="card-text">
                Welcome to ShopShot, where shopping becomes a delightful
                experience. With a wide range of high-quality products at
                affordable prices, we're here to cater to your fashion and tech
                desires. Our dedicated team is committed to providing
                exceptional customer service, ensuring your satisfaction. At
                ShopShot, we value your privacy and security, implementing
                stringent measures to protect your information. Join our
                community of passionate shoppers, and let us inspire your unique
                style. We express our deepest gratitude for choosing ShopShot as
                your trusted online store. Get ready for an incredible shopping
                journey with us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
