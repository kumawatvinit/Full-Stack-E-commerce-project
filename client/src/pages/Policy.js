import React from "react";
import Layout from "../components/layout/layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy - ShopSpot"}>
      <div className="policy-container">
        <div className="policy-content">
          <h1>Privacy Policy</h1>
          <p>
            At ShopSpot, we are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy outlines how we collect, use, and disclose your information
            when you use our website or services.
          </p>
          <p>
            <strong>1. Collection of Information</strong>
            <br />
            We collect personal information such as your name, email address,
            and shipping address when you place an order or create an account
            with us. We may also collect non-personal information, such as
            cookies and usage data, to improve our website and provide a better
            user experience.
          </p>
          <p>
            <strong>2. Use of Information</strong>
            <br />
            We use the collected information to process your orders, improve our
            services, and personalize your shopping experience. We may also send
            you promotional emails and updates about new products or special
            offers. You can opt out of receiving marketing communications at any
            time.
          </p>
          <p>
            <strong>3. Disclosure of Information</strong>
            <br />
            We may disclose your information to third-party service providers
            who assist us in operating our website, processing payments, and
            delivering orders. We do not sell or rent your personal information
            to any third parties.
          </p>
          <p>
            <strong>4. Security</strong>
            <br />
            We take reasonable precautions to protect your personal information
            and maintain the security of our website. However, no method of
            transmission over the internet or electronic storage is 100% secure,
            and we cannot guarantee absolute security.
          </p>
          <p>
            By using our website and services, you consent to the collection,
            use, and disclosure of your information as described in this Privacy
            Policy. If you have any questions or concerns regarding our privacy
            practices, please contact us.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
