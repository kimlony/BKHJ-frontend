import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <section className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/* left side */}
        <div className="flexColStart f-left">
          <img src="./logo2.png" alt="" width={120} />
          <span className="secondaryText">
            Our vision: Optimal living environment for everyone, <br />
            with loan product comparisons.
          </span>
        </div>

        {/* right side */}
        <div className="flexColStart f-right">
          <span className="primaryText">Information</span>
          <span className="secondaryText">서울 강남구 테헤란로10길 9</span>

          <div className="flexCenter f-menu">
            <span>About Us</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
