import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import boardService from "../services/board.service";
import authService from "../services/auth.service";
import CommentService from "../services/CommentService";
import "./ViewBoard.css";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import FileUploadService from "../services/FileUploadService";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { saveAs } from "file-saver";
import { AiOutlineFolder } from "react-icons/ai";

const ViewBoard = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [isCommentEmpty, setIsCommentEmpty] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [cancelButtonClicked, setCancelButtonClicked] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    fetchBoard();
    fetchComments();
    fetchFiles();
  }, []);

  const fetchBoard = () => {
    boardService
      .getBoardById(id)
      .then((res) => {
        setBoard(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const fetchFiles = () => {
    boardService
      .getBoardById(id)
      .then((res) => {
        const boardId = res.data.id;
        return FileUploadService.getFilesByBoardId(boardId);
      })
      .then((res) => {
        setFiles(res.data); // 파일 목록 업데이트
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchComments = () => {
    CommentService.getCommentsByBoardId(id)
      .then((res) => {
        setComments(res.data);
        setCommentsCount(res.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteBoard = () => {
    confirmAlert({
      title: "게시물 삭제",
      message: "게시물을 삭제하시겠습니까?",

      buttons: [
        {
          label: "삭제",
          onClick: () => {
            boardService
              .deleteBoard(id)
              .then((res) => {
                navigate("/listBoard");
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
        {
          label: "취소",
          onClick: () => {},
        },
      ],
    });
  };

  const handleCommentChange = (e) => {
    const commentText = e.target.value;
    setCommentContent(commentText);
    setIsCommentEmpty(commentText === "");
    setIsButtonDisabled(commentText === "");
  };

  const createComment = () => {
    const comment = {
      boardId: board.id,
      username: currentUser.username,
      content: commentContent,
      createdAt: new Date().toISOString(),
    };
    CommentService.createComment(comment.boardId, comment.content)
      .then((res) => {
        fetchComments();
        setCommentContent("");
        setIsButtonDisabled(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateComment = (commentId, updatedContent) => {
    const updatedComment = {
      content: updatedContent,
    };
    CommentService.updateComment(commentId, updatedComment)
      .then((res) => {
        fetchComments();
        setEditedCommentId(null);
        setEditedCommentContent("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteComment = (commentId) => {
    confirmAlert({
      title: "댓글 삭제",
      message: "댓글을 삭제하시겠습니까?",
      buttons: [
        {
          label: "확인",
          onClick: () => {
            CommentService.deleteComment(commentId)
              .then((res) => {
                fetchComments();
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
        {
          label: "취소",
          onClick: () => {},
        },
      ],
    });
  };
  const handleFileDownload = (file) => {
    FileUploadService.downloadFile(file.id)
      .then((res) => {
        const blob = new Blob([res.data], { type: file.type });
        saveAs(blob, file.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const formatDate = (date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setHours(adjustedDate.getHours() + 9); // +9시간 조정
    return adjustedDate.toLocaleString("ko-KR");
  };
  const formatBoardDate = (date) => {
    const adjustedDate = new Date(date);
    const year = adjustedDate.getFullYear();
    const month = (adjustedDate.getMonth() + 1).toString().padStart(2, "0");
    const day = adjustedDate.getDate().toString().padStart(2, "0");
    const hours = adjustedDate.getHours().toString().padStart(2, "0");
    const minutes = adjustedDate.getMinutes().toString().padStart(2, "0");
    const seconds = adjustedDate.getSeconds().toString().padStart(2, "0");
    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="ViewBoard-wrapper">
        <div className="ViewBoard-container">
          <div className="ViewContent">
            <div className="ContentHeader">
              <h3>{board.title}</h3>
              <div
                className="author-info"
                style={{ display: "flex", alignItems: "center" }}
              >
                <AccountCircle
                  style={{ fontSize: "2rem", marginRight: "8px" }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>{board.writer}</span>
                  <div
                    className="regCount"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <span style={{ height: "16px" }}></span>
                    <p style={{ marginRight: "4px" }}>
                      {formatBoardDate(board.regdate)}
                    </p>
                    <p>조회 {board.viewCount}</p>
                  </div>
                </div>
              </div>
              {/* 게시글 내용 */}
              <hr className="content-divider"></hr>
              <div className="mb-3">
                <CKEditor
                  editor={ClassicEditor}
                  data={board.content}
                  config={{
                    toolbar: [],
                    readOnly: true,
                  }}
                />
              </div>
            </div>

            {currentUser && currentUser.username === board.writer && (
              <div className="d-flex justify-content-end">
                <Link
                  to={`/editBoard/${board.id}`}
                  className="btn btn-primary btn-comment"
                >
                  수정
                </Link>
                <button
                  onClick={deleteBoard}
                  className="btn btn-danger btn-comment"
                >
                  삭제
                </button>
              </div>
            )}
          </div>

          {/* 첨부파일 start */}
          <div className="attachment">
            <p>
              <AiOutlineFolder /> 첨부파일
            </p>
            {files && (
              <div>
                {files.map((file, i) => (
                  <div key={file.id}>
                    {/* 이미지 미리보기 */}
                    {file.type.startsWith("image/") ? (
                     <>
                     <img
                        className="preview"
                        src={`data:${file.type};base64,${file.data}`}
                        alt={"image-" + i}
                      />
                      <a
                        href={URL.createObjectURL(
                          new Blob([file.data], { type: file.type })
                        )}
                        download={file.name}
                      >
                        {file.name}
                      </a>
                      </>
                    ) : (
                      <a
                        href={URL.createObjectURL(
                          new Blob([file.data], { type: file.type })
                        )}
                        download={file.name}
                      >
                        {file.name}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* 첨부파일 end */}

          <div className="ViewComment-wrapper">
            <div className="ViewComment-container">
              <div className="commentcount">
                <h4>댓글 {commentsCount}개</h4>
              </div>
              <hr className="comment-divider" />
              <div className="ViewComment">
                {currentUser ? (
                  <div className="comment-input-container">
                    <div className="user-info">
                      <AccountCircle style={{ fontSize: "3rem" }} />
                      {currentUser && <span>{currentUser.username}</span>}
                    </div>
                    <TextField
                      id="standard-multiline-flexible"
                      placeholder="댓글 추가..."
                      multiline
                      variant="standard"
                      rows={1}
                      value={commentContent}
                      onChange={handleCommentChange}
                      className="full-width"
                    />
                    <div className="comment-buttons">
                      <button
                        className="btn btn-secondary mt-2 cancel-button"
                        onClick={() => {
                          setCommentContent("");
                          setIsButtonDisabled(true);
                        }}
                      >
                        취소
                      </button>
                      <button
                        className="btn btn-primary mt-2"
                        onClick={createComment}
                        disabled={isButtonDisabled}
                      >
                        댓글
                      </button>
                    </div>
                  </div>
                ) : (
                  <p>로그인 후에 댓글을 작성할 수 있습니다.😊</p>
                )}
              </div>
            </div>
            <div className="ViewCommentList-container">
              <div className="ViewCommentList">
                {comments.map((comment) => (
                  <div key={comment.id}>
                    <div className="user-info">
                      <AccountCircle style={{ fontSize: "3rem" }} />
                      {comment.username ? (
                        <span>{comment.username}</span>
                      ) : (
                        <span>비회원</span>
                      )}
                    </div>
                    {comment.id === editedCommentId ? (
                      <div className="comment-content">
                        <TextField
                          id="comment-edit-field"
                          multiline
                          variant="standard"
                          rows={4}
                          value={editedCommentContent}
                          className="edit-comment"
                          onChange={(e) =>
                            setEditedCommentContent(e.target.value)
                          }
                        />
                        <button
                          className="btn btn-primary btn-comment"
                          onClick={() =>
                            updateComment(comment.id, editedCommentContent)
                          }
                        >
                          저장
                        </button>
                      </div>
                    ) : (
                      <div className="comment-content">
                        {comment.content.split("\n").map((line, index) => (
                          <p key={index} style={{ color: "black" }}>
                            {line}
                          </p>
                        ))}
                        <p>{formatDate(comment.createdAt)}</p>
                      </div>
                    )}
                    {currentUser &&
                      currentUser.username === comment.username && (
                        <div className="actions">
                          <button
                            className="btn btn-primary btn-comment"
                            onClick={() => {
                              setEditedCommentId(comment.id);
                              setEditedCommentContent(comment.content);
                            }}
                          >
                            수정
                          </button>
                          <button
                            className="btn btn-danger btn-comment"
                            onClick={() => deleteComment(comment.id)}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewBoard;
