import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="c-wrapper">
      <div className="paddings innerWidth flexCenter c-container">
        {/* left side */}
        <div className="flexColStart c-left">
          <span className="orangeText">한눈에 서비스</span>
          <span className="primaryText">쉬운 대출비교</span>
          <span className="secondaryText">맞춤형 대출비교 시작하기</span>

          <div className="flexColStart contactModes">
            {/* first row */}
            <div className="flexStart row">
              <div className="flexColCenter mode">
                <div className="felxStart">
                  <div className="flexColStart detail">
                    <span className="primaryText">신용대출</span>
                    <span className="secondaryText">
                      적합한 신용대출
                      <br />
                      상품을 확인하세요
                    </span>
                  </div>
                </div>
                <div className="flexCenter button">
                  <Link to="/credit" className="custom-link">
                    시작하기
                  </Link>
                </div>
              </div>
              {/* second mode */}
              <div className="flexColCenter mode">
                <div className="felxStart">
                  <div className="flexColStart detail">
                    <span className="primaryText">금리진단</span>
                    <span className="secondaryText">
                      적합한 금리를
                      <br />
                      진단해보세요
                    </span>
                  </div>
                </div>
                <div className="flexCenter button">
                <Link to="/diagnosis" className="custom-link">
                    시작하기
                  </Link>
                </div>
              </div>
            </div>

            {/* second row */}
            
          </div>
        </div>

        {/* right side */}
        <div className="c-right">
          <div className="image-container">
            <img src="./contact.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
