import React, { useState, useEffect } from "react";
import "./GetStarted.css";
import { Routes, Route, Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import axios from "axios";


const GetStarted = () => {
  const currentUser = AuthService.getCurrentUser();
  const [derivedValues, setDerivedValues] = useState(null);

  useEffect(() => {
    if (currentUser) {
      axios
        .get(`http://localhost:5000/api/customization?id=${currentUser.id}`)
        .then((response) => {
          setDerivedValues(response.data);
        })
        .catch((error) => {
          console.error("Error:", error.response.data);
        });
    }
  }, [currentUser]);

  return (
    <section className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
        <img src="./logo.png" alt="logo" width={110} />
          <span className="secondaryText">
            보다 쉽고 빠른 대출 비교 서비스
          </span>
           {currentUser ? (
                <button className="button">
                  <Link to="/credit" className="linktocustomization">
                    신용대출 비교하기
                  </Link>
                  </button>               ) : (
                 <button className="button">
          <a> <Link to={"/register"}>시작하기</Link></a>
          </button>              )}
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
