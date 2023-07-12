import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useLocation } from "react-router-dom"; 

import Header from "./components/Header/Header";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import UpdateProfile from "./components/UpdateProfile.component";

import ListBoard from './component/ListBoard';
import AddBoard from './component/AddBoard';
import EditBoard from './component/EditBoard';
import ViewBoard from './component/ViewBoard';
import Product from "./component/Product";

import Credit from "./component/bkhj/Credit";
import Diagnosis from "./component/bkhj/Diagnosis";

import Bkhjcustomization from "./component/bkhj/Bkhjcustomization";
import Bkhjirate from "./component/bkhj/Bkhjirate";

const RenderHeader = () => { 
  const location = useLocation();
  if (location.pathname === "/login" || location.pathname === "/register"|| location.pathname === "/profile") {
    return null; // `/login` 및 `/register` 경로에서는 Header를 표시하지 않음
  }
  return <Header />;
};



class App extends Component {
  render() {
    return (
      <>
          <RenderHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/listBoard" element={<ListBoard />} />
            <Route path="/addBoard" element={<AddBoard />} />
            <Route path="/editBoard/:id" element={<EditBoard />} />
            <Route path="/viewBoard/:id" element={<ViewBoard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/update-profile" element={<UpdateProfile/>} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/product" element={<Product />} />
            <Route path="/customization" element={<Bkhjcustomization/>} />
            <Route path="/Irate" element={<Bkhjirate/>} />
            <Route path="/credit" element={<Credit/>} />
            <Route path="/diagnosis" element={<Diagnosis/>} />
          </Routes>
        {/* <AuthVerify logOut={this.logOut}/> */}
      </>
    );
  }
}

export default App;