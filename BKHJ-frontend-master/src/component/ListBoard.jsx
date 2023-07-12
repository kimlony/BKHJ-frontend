import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import boardService from "../services/board.service";
import ViewBoard from "../component/ViewBoard";
import authsevice from "../services/auth.service";
import Button from "@mui/material/Button";
import "./ListBoard.css";

const ListBoard = () => {
  const [boardList, setBoardList] = useState([]);
  const [msg, setMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("title");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [viewCounts, setViewCounts] = useState({});

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const user = authsevice.getCurrentUser();
    setIsLoggedIn(!!user);
  }, []);

  const init = () => {
    boardService
      .getAllBoard()
      .then((res) => {
        const sortedList = res.data.sort((a, b) => {
          const dateA = new Date(a.regdate).getTime();
          const dateB = new Date(b.regdate).getTime();
          if (dateA === dateB) {
            // 시간까지 비교
            const timeA = new Date(a.regdate).getTime();
            const timeB = new Date(b.regdate).getTime();
            return timeB - timeA;
          }
          return dateB - dateA;
        });

        setBoardList(sortedList);
        const counts = sortedList.reduce((acc, cur) => {
          acc[cur.id] = cur.viewCount;
          return acc;
        }, {});
        setViewCounts(counts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteBoard = (id) => {
    boardService
      .deleteBoard(id)
      .then((res) => {
        setMsg("성공적으로 제거되었습니다");
        init();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchCriteriaChange = (e) => {
    setSearchCriteria(e.target.value);
  };

  const filteredBoardList = boardList.filter((board) => {
    const searchTermLower = searchTerm.toLowerCase();
    const selectedCriteria = searchCriteria.toLowerCase();

    if (selectedCriteria === "title") {
      return board.title.toLowerCase().includes(searchTermLower);
    } else if (selectedCriteria === "writer") {
      return board.writer.toLowerCase().includes(searchTermLower);
    } else if (selectedCriteria === "regdate") {
      return board.regdate.toLowerCase().includes(searchTermLower);
    }

    return false;
  });
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const getTotalPages = () => {
    return Math.ceil(filteredBoardList.length / itemsPerPage);
  };

  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredBoardList.slice(startIndex, endIndex);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const maxPage = getTotalPages();
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const StyledLink = styled(Link)`
    color: black;
    text-decoration: none;
  `;

  return (
    <>
    <div className="ListBoard-wrapper">
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header fs-3 text-center">
                자유 게시판
                {msg && <p className="fs-4 text-center text-success">{msg}</p>}
              </div>

              <div className="card-body">
                <div className="row-vh d-flex flex-row align-items-start">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="검색어를 입력하세요..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <div className="mb-3">
                    <select
                      className="form-select me-2"
                      value={searchCriteria}
                      onChange={handleSearchCriteriaChange}
                    >
                      <option value="title">제목</option>
                      <option value="writer">작성자</option>
                      <option value="regdate">작성일</option>
                    </select>
                  </div>
                </div>

                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col" colSpan="2" className="expanded-title">
                        제목
                      </th>
                      <th scope="col">작성자</th>
                      <th scope="col" className="short-date">
                        작성일
                      </th>
                      <th scope="col">조회수</th>
                    </tr>
                  </thead>

                  <tbody>
                    {getCurrentItems().map((b, index) => {
                      const reversedIndex =
                        filteredBoardList.length -
                        ((currentPage - 1) * itemsPerPage + index);
                      return (
                        <tr key={b.id}>
                          <td>{reversedIndex}</td>
                          <td colSpan="2" className="expanded-title">
                            <StyledLink to={"/viewBoard/" + b.id}>
                              {b.title}
                            </StyledLink>
                          </td>
                          <td>{b.writer}</td>
                          <td className="short-date">{formatDate(b.regdate)}</td>
                          <td>{viewCounts[b.id] || 0}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {isLoggedIn && (
                  <Button
                    variant="outlined"
                    href="/AddBoard"
                    sx={{
                      fontWeight: "bold",
                      color: "#007BFF",
                      "&:hover": {
                        backgroundColor: "#007BFF",
                        color: "white",
                      },
                    }}
                  >
                    게시글 등록
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      

      <div className="d-flex justify-content-center mt-3">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                이전
              </button>
            </li>
            {Array.from({ length: getTotalPages() }, (_, i) => (
              <li
                className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
                key={i}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === getTotalPages() ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={handleNextPage}
                disabled={currentPage === getTotalPages()}
              >
                다음
              </button>
            </li>
          </ul>
        </nav>
      </div>
      </div>
    </>

  );
};

export default ListBoard;