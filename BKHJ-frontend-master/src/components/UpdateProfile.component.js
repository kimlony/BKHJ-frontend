import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export default function UpdateProfile() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    usersId: "",
    nickname: "",
    zoneCode: "",
    address: "",
    detailaddress: "",
    legalDong: "",
    phonenumber: ""
    

  });

  // 회원정보 수정
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  //취소버튼
  const handlecancel = () => {
    navigate("/");
  }

  // 회원정보 수정
  const handleUpdateProfile = (event) => {
    event.preventDefault();

    const { username, email, password, usersId, nickname, zoneCode,
    address, detailaddress, legalDong, phonenumber } = state;

    AuthService.updateProfile(username, email, password, usersId, nickname, zoneCode,
      address, detailaddress, legalDong, phonenumber )
      .then(response => {
        handleConfirmation();
        console.log(response.data); // Success message
        // Optionally, handle success, e.g., show a success message or navigate to a different page
      })
      .catch(error => {
        console.log(error);
        // Handle errors, e.g., display an error message
      });
  };

  // 회원정보 수정: 회원정보 수정시 알림문구 발생
  const handleConfirmation = () => {
    const confirmed = window.confirm("Do you want to leave the page?");
  
    if (confirmed) {
      withdrawal();
    } else {
      // Optionally, you can reset the form or perform any other actions to handle the cancellation
      // Reset the state to its initial values or fetch the latest member information again
      setState({
        username: "",
        email: "",
        password: "",
        usersId: "",
        nickname: "",
        zoneCode: "",
        address: "",
        detailaddress: "",
        legalDong: "",
        phonenumber: ""
      });
    }
  };

  // 회원정보 수정: 홈 화면으로 이동 및 헤더 상태 변경
  const withdrawal = () => {
    AuthService.logout();
    alert("회원정보 수정 되었습니다.");
    navigate("/");
  };
//카카오주소openapi
useEffect(() => {
  initializeDaumPostcode();
}, []);

const initializeDaumPostcode = () => {
  const script = document.createElement("script");
  script.src =
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  script.async = true;
  script.onload = handleScriptLoad;
  document.body.appendChild(script);
};

const handleScriptLoad = () => {
  const { daum } = window;
  const postcode = new daum.Postcode({
    oncomplete: (data) => {
      setState((prevState) => ({
        ...prevState,
        zoneCode: data.zonecode,
        address: data.address,
        detailaddress: data.buildingName || "",
        legalDong: data.jibunAddress
      }));
    }
  });

  document.getElementById("searchPostcode").onclick = () => {
    postcode.open();
  };
};
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>회원정보수정</h3>
      </header>
      <form onSubmit={handleUpdateProfile}>
        <div className="form-group">
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={state.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={state.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={state.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="usersId">성명</label>
          <input
            type="text"
            className="form-control"
            id="usersId"
            name="usersId"
            value={state.usersId}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            className="form-control"
            id="nickname"
            name="nickname"
            value={state.nickname}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="zoneCode">우편번호</label>
          <div className="d-flex align-items-center">
            <input
              type="text"
              className="form-control"
              name="zoneCode"
              value={state.zoneCode}
              readOnly
            />
            <button
              className="btn btn-secondary ml-2"
              id="searchPostcode"
              type="button"
            >
              우편번호 찾기
            </button>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="address">주소</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={state.address}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="detailaddress">상세주소</label>
          <input
            type="text"
            className="form-control"
            name="detailaddress"
            value={state.detailaddress}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="legalDong">참고항목</label>
          <input
            type="text"
            className="form-control"
            name="legalDong"
            value={state.legalDong}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="phonenumber">핸드폰번호</label>
          <input
            type="text"
            className="form-control"
            id="phonenumber"
            name="phonenumber"
            value={state.phonenumber}
            onChange={handleInputChange}
          />
        </div>   
        <button type="submit" className="btn btn-primary" onClick={handleUpdateProfile}>
          수정
        </button>
        <button className="btn btn-primary" onClick={handlecancel}>
          취소
        </button>
      </form>
    </div>
  );
}
