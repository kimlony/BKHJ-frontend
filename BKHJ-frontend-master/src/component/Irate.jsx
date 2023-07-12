import React, { useState } from "react";
import axios from "axios";
import "./Irate.css";



const Irate = () => {
  const [loanLimit, setLoanLimit] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [predictedRate, setPredictedRate] = useState(null);

  const handleLoanLimitChange = (event) => {
    setLoanLimit(event.target.value);
  };

  const handleLoanPeriodChange = (event) => {
    setLoanPeriod(event.target.value);
  };

  const handlePredict = () => {
    axios
      .post("http://127.0.0.1:5000/predict", {
        loanLimit: loanLimit, // Correct key: 'loanLimit'
        loanPeriod: loanPeriod, // Correct key: 'loanPeriod'
      })
      .then((response) => {
        setPredictedRate(response.data.predictedRate); // Correct key: 'predictedRate'
      })
      .catch((error) => {
        console.error("Prediction error:", error);
      });
  };

  return (
    <div>
      <h2>최적 금리 예측</h2>
      <div>
        <label>대출 한도(만) </label>
        <input
          className="form-control"
          type="text"
          value={loanLimit}
          onChange={handleLoanLimitChange}
        />
      </div>
      <div>
        <label>대출 기간(년) </label>
        <input
          className="form-control"
          type="text"
          value={loanPeriod}
          onChange={handleLoanPeriodChange}
        />
      </div>
      
      <button className="btn btn-primary btn-block" onClick={handlePredict}>예측하기</button>
      {predictedRate && (
        <div>
          <h3> </h3>
          <h3> </h3>
          <h3>최적금리는⁉🧐</h3>
          <p>{predictedRate} %</p>
        </div>
      )}
    </div>
  );
};

export default Irate;