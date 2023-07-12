import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "./Diagnosis.css";

const Diagnosis = () => {
  const [derivedValues, setDerivedValues] = useState(null);
  const currentUser = AuthService.getCurrentUser();
  const [showModal, setShowModal] = useState(false);

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
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <section className="credit-section">
        <div className="credit-wrapper">
          <div className="user-info">
            {currentUser && <p>{currentUser.username}</p>}
          </div>
          {/* 버튼창 start*/}
          <div className="bkhj-top-menu">
            <button
              onClick={() => (window.location.href = "/credit")}
              className="credit-button"
            >
              신용대출
            </button>
            <button
              onClick={() => (window.location.href = "/credit")}
              className="diagnosis-button"
            >
              금리진단
            </button>
            <div className="estate-button">더알아보기</div>
            <div className="loans-button">이용안내</div>
          </div>
          {/* 버튼창 end */}
          {/* 시작하기창 start*/}
          <div className="credit-start">
            <div className="credit-top">
              <div>
                <h3 className="bold-text">
                  나에게 맞는 최적 금리를 찾아보세요👍
                </h3>
              </div>
            </div>
            <div className="credit-bottom">
              {currentUser ? (
                <Button
                  onClick={() => (window.location.href = "/Irate")}
                  className="credit-comparison"
                >
                  내 금리 진단하기
                </Button>
              ) : (
                <Button onClick={handleModalOpen} className="credit-comparison">
                  내 금리 진단하기
                </Button>
              )}
            </div>
          </div>
        </div>
        {/* 시작하기창 end*/}
      </section>
      {/* 모달 창 */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>로그인이 필요합니다</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          로그인 후에 신용대출 비교하기를 이용할 수 있습니다✅
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Diagnosis;
