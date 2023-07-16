import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";

const contactImage = process.env.PUBLIC_URL + "/logo.png";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="contact-container">
        <div className="contact-heading">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you!</p>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-image">
              <img src={contactImage} alt="Contact" />
            </div>
            <div className="contact-details">
              <h3>ShopShot</h3>
              <p>
                <MdLocationOn /> 123 Main Street <br />
                City, State 12345
              </p>
              <p>
                <AiOutlineMail /> Email: info@shopshot.com
              </p>
              <p>
                <FaPhoneAlt /> Phone: (123) 456-7890
              </p>
            </div>
          </div>
          <div className="contact-form">
            <h3>Get in Touch</h3>
            <div class="mb-3">
              <input type="text" class="form-control" placeholder="Name" />
            </div>
            <div class="mb-3">
              <input type="email" class="form-control" placeholder="Email" />
            </div>
            <div class="mb-3">
              <textarea
                class="form-control"
                rows="3"
                placeholder="Message"
              ></textarea>
            </div>
            <button type="submit">Send Message</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
