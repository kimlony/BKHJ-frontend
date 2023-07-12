import React, { useState, useEffect, useRef } from "react";
import BoardService from "../services/board.service";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import UploadService from "../services/FileUploadService";
import "./AddBoard.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { RiDeleteBin5Line } from "react-icons/ri";

const AddBoard = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString();
  const currentUser = authService.getCurrentUser();
  //UploadImages
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const [, setMessage] = useState([]);
  const [, setImageInfos] = useState([]);
  const progressInfosRef = useRef(null);

  const [board, setBoard] = useState({
    title: "",
    content: "",
    writer: currentUser.username,
    regdate: today,
  });
  const [msg, setMsg] = useState("");

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setBoard({ ...board, title: value });
  };

  const handleContentChange = (event, editor) => {
    const data = editor.getData();
    setBoard({ ...board, content: data });
  };

  const BoardRegister = (e) => {
    e.preventDefault();

    const files = Array.from(selectedFiles);

    let _progressInfos = files.map((file) => ({
      percentage: 0,
      fileName: file.name,
    }));

    progressInfosRef.current = {
      val: _progressInfos,
    };

    BoardService.saveBoard(board)
      .then((response) => {
        const boardId = response.data; // 서버에서 받은 게시판 ID
        const uploadPromises = files.map(
          (file, i) => upload(i, file, boardId) // 서버에서 받은 게시판 ID를 전달
        );
        return Promise.all(uploadPromises);
      })
      .then(() => {
        console.log("Board Added Successfully");
        setMsg("게시판 생성완료");
        setBoard({
          title: "",
          content: "",
          writer: currentUser.username,
          regdate: "",
        });
        setSelectedFiles([]); // 등록 후에 선택한 파일 배열 초기화
        setImagePreviews([]); // 등록 후에 미리 보기 이미지 배열 초기화
        navigate("/listBoard");
      })
      .catch((error) => {
        console.log(error);
      });

    setMessage([]);
  };

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setImageInfos(response.data);
    });
  }, []);
  const handleDeleteFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setSelectedFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
    setProgressInfos({ val: [] });
    setMessage([]);
  };
  const selectFiles = (event) => {
    const newFiles = Array.from(event.target.files);
    resetImageState(newFiles);
    // 새로 추가된 파일들
    const updatedFiles = [...selectedFiles]; // 기존에 선택한 파일들 유지

    let images = [...imagePreviews]; // 기존에 미리 보기한 이미지들 유지

    for (let i = 0; i < newFiles.length; i++) {
      updatedFiles.push(newFiles[i]); // 새로 추가된 파일들을 추가
      images.push(URL.createObjectURL(newFiles[i])); // 새로 추가된 이미지들을 미리 보기에 추가
    }

    setSelectedFiles(updatedFiles);
    setImagePreviews(images);
    setProgressInfos({ val: [] });
    setMessage([]);
  };
  const resetImageState = (newFiles) => {
    const updatedFiles = [...selectedFiles, ...newFiles];
    const images = updatedFiles.map((file) => URL.createObjectURL(file));
    setSelectedFiles(updatedFiles);
    setImagePreviews(images);
    setProgressInfos({ val: [] });
    setMessage([]);
  };

  const upload = (idx, file, boardId) => {
    let _progressInfos = [...progressInfosRef.current.val];
    return UploadService.upload(file, boardId, (event) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      setProgressInfos({ val: _progressInfos });
    })
      .then(() => {
        setMessage((prevMessage) => [
          ...prevMessage,
          "Uploaded the image successfully: " + file.name,
        ]);
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        setProgressInfos({ val: _progressInfos });

        setMessage((prevMessage) => [
          ...prevMessage,
          "Could not upload the image: " + file.name,
        ]);
      });
  };

  return (
    <>
      <div className="AddBoard-wrapper">
        <div className="container mt3">
          <div className="row">
            <div className="col-md-10">
              <div className="card">
                <div className="card-header fs-3 text-center">게시글 등록</div>
                {msg && <p className="fs-4-text-center text-success">{msg}</p>}
                <div className="card-body"></div>
                {progressInfos &&
                  progressInfos.val.length > 0 &&
                  progressInfos.val.map((progressInfo, index) => (
                    <div className="mb-2" key={index}>
                      <span>{progressInfo.fileName}</span>
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-info"
                          role="progressbar"
                          aria-valuenow={progressInfo.percentage}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: progressInfo.percentage + "%" }}
                        >
                          {progressInfo.percentage}%
                        </div>
                      </div>
                    </div>
                  ))}

                <form onSubmit={(e) => BoardRegister(e)}>
                  <div className="mb-3">
                    <label>제목</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      onChange={handleTitleChange}
                      value={board.title}
                      placeholder="제목을 입력하세요"
                    />
                  </div>
                  <div className="mb-3">
                    <label>내용</label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={board.content}
                      onChange={handleContentChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label>작성자</label>
                    <input
                      type="text"
                      name="writer"
                      className="form-control"
                      readOnly // 읽기 전용으로 설정하여 수정 불가능하게 만듦
                      value={board.writer}
                    />
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <label className="btn btn-default p-0">
                        <input
                          type="file"
                          multiple
                          accept="image/*,.pdf,.txt,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          onChange={selectFiles}
                        />
                      </label>
                    </div>
                  </div>
                  {/* 첨부파일추가 start*/}
                  {selectedFiles && (
                    <div>
                      {selectedFiles.map((file, i) => {
                        return (
                          <div key={i} className="preview-container">
                            {file.type.includes("image") ? (
                              <img
                                className="preview"
                                src={imagePreviews[i]}
                                alt={"image-" + i}
                              />
                            ) : (
                              <div className="file-preview">
                                <div className="file-name">{file.name}</div>
                              </div>
                            )}
                            <button
                              className="delete-button"
                              onClick={() => handleDeleteFile(i)}
                            >
                              <RiDeleteBin5Line />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                   {/* 첨부파일추가 end*/}
                  <button className="btn btn-primary col-md-12">등록</button>
                </form>
                <div className="card-footer mt-3">
                  <Link to="/listBoard" className="btn btn-secondary">
                    취소
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBoard;
