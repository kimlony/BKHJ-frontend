import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DetailviewProduct.css";

const DetailViewProduct = () => {
  const { seq } = useParams();
  const [loanProduct, setLoanProduct] = useState([]);
  const apiUrl = seq ? `/api/${seq}` : "/api";

  useEffect(() => {
    fetchLoanProduct();
  }, [apiUrl]);

  const fetchLoanProduct = async () => {
    try {
      const response = await axios.get(apiUrl);
      if (
        response.data &&
        response.data.hits &&
        response.data.hits.hits.length > 0
      ) {
        setLoanProduct(response.data.hits.hits[0]._source);
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      console.error("Error retrieving loan product:", error);
    }
  };

  return (
    <div className="detail-view">
      <h1>자세히 보기</h1>
      {loanProduct ? (
        <div>
          <p>상품명: {loanProduct.finPrdNm}</p>
          <p>용도: {loanProduct.usge}</p>
          <p>대출한도: {loanProduct.lnLmt}</p>
          <p>금리: {loanProduct.irt}</p>
          <p>총대출기간: {loanProduct.maxRdptTrm}</p>
          <p>상환방식: {loanProduct.rdptMthd}</p>
          <p>대상: {loanProduct.trgt}</p>
          <p>연령대: {loanProduct.age}</p>
          <p>소득기준: {loanProduct.incm}</p>
          <p>서비스 제공지역: {loanProduct.rsdAreaPamtEqltIstm}</p>
          <p>제공기관: {loanProduct.ofrInstNm}</p>
          <p>문의처: {loanProduct.cnpl}</p>
          <p>신청방법: {loanProduct.jnMthd}</p>
          <p>연체 이자율: {loanProduct.ovItrYr}</p>
          <div className="related-site">
  <p>관련사이트: <a href={loanProduct.rltSite}>{loanProduct.rltSite}</a></p>
</div>
          <p>운영기한: {loanProduct.prdOprPrid}</p>
        </div>
      ) : (
        <p>Loading loan product details...</p>
      )}
    </div>
  );
};

export default DetailViewProduct;
