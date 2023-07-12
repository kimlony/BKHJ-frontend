import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import axios from "axios";
import { Link } from "react-router-dom";
import "./profile.component.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true });
  }

  updateProfile() {
    this.setState({ redirect: "/update-profile" });
  }
  handleLogout = () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");

    if (confirmLogout) {
      AuthService.logout();
      alert("로그아웃 되었습니다.");
      this.setState({ redirect: "/" });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { currentUser } = this.state;
    const handleDeleteMember = () => {
      const confirmDelete = window.confirm("정말로 회원탈퇴 하시겠습니까?");

      if (confirmDelete) {
        AuthService.deleteMember()
          .then((response) => {
            console.log(response.data); // '회원 탈퇴 성공'
            AuthService.logout();
            alert("회원탈퇴가 완료되었습니다.");
            this.setState({ redirect: "/" });
          })
          .catch((error) => {
            console.log(error);
            // 에러 처리, 예를 들어 에러 메시지 표시 등
          });
      }
    };

    return (
      <section className="profile-wraper">
        <div className="profile-container">
          {/* left side */}
          <div className="profile-left">
            {this.state.userReady ? (
              <div>
                <div className="logo-container">
                  <Link to="/">
                    <img src="./logo2.png" alt="" width={150} />
                  </Link>
                </div>
                <div className="profile-header">
                  <div className="profile-img-container">
                    <img
                      src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                      alt="profile-img"
                      className="profile-img-card"
                      style={{ margin: "0 auto", width: "30%", height: "30%" }}
                    />
                  </div>
                  <h3>
                    <strong>{currentUser.username}</strong> Profile
                  </h3>
                </div>
                <div className="basic-info">
                  <p>
                    <strong>ID :</strong> {currentUser.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {currentUser.email}
                  </p>
                </div>
                <div className="left-menu">
                  <p>내프로필</p>
                  <Link to = "/credit">신용 대출</Link>
                  <p></p>
                  <Link to = "/diagnosis">금리 진단</Link>
                </div>

                <div className="left-menu2">
                  <a onClick={this.handleLogout}>로그아웃</a>
                  <span className="vertical-line"></span>
                  <a>고객센터</a>
                </div>
              </div>
            ) : null}
          </div>
          {/* right side */}
          <div className="profile-right">
            {/* <MyProfile /> */}
            <section className="MyProfile-wrapper">
              <div className="MyProfile-container">
                <div className="myprofile-edit">내프로필</div>
           
                <div className="profile-info">ID: {currentUser.username}</div>
                <div className="profile-info">Email: {currentUser.email}</div>
           
              </div>
              <div className="member-button">
                <button onClick={handleDeleteMember} className="custom-button">
                  회원탈퇴
                </button>
                <button
                  onClick={this.updateProfile.bind(this)}
                  className="custom-button"
                >
                  회원정보 수정
                </button>
              </div>
            </section>
          </div>
        </div>
      </section>
    );
  }
}