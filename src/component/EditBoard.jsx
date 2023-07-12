import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import boardService from "../services/board.service";
import "./EditBoard.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { AiOutlineFolder } from "react-icons/ai";
import { saveAs } from "file-saver";
import FileUploadService from "../services/FileUploadService";

const EditBoard = () => {
  const { id } = useParams();
  const [board, setBoard] = useState({
    id: "",
    title: "",
    content: "",
    writer: "",
    regdate: "",
  });
  const [msg, setMsg] = useState("");
  const [files, setFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]); // 추가된 파일 리스트

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await boardService.getBoardById(id);
        setBoard(response.data);
        const boardId = response.data.id;
        const filesResponse = await FileUploadService.getFilesByBoardId(boardId);
        setFiles(filesResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFiles();
  }, [id]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setNewFiles([...newFiles, ...selectedFiles]);
  };

  const handleFileRemove = (file) => {
    const updatedFiles = newFiles.filter((f) => f !== file);
    setNewFiles(updatedFiles);
  };

  const handleFileDelete = (file) => {
    setFiles((prevFiles) => [
      ...prevFiles.filter((f) => f.id !== file.id),
      { ...file, isDeleted: true },
    ]);
    setMsg("첨부파일이 삭제 예정입니다.");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setBoard({ ...board, [e.target.name]: value });
  };

  const handleChangeContent = (event, editor) => {
    const value = editor.getData();
    setBoard((prevBoard) => ({
      ...prevBoard,
      content: value,
    }));
  };

  const handleBoardUpdate = async (e) => {
    e.preventDefault();
    try {
      if (newFiles.length > 0) {
        for (const file of newFiles) {
          await FileUploadService.upload(file, id);
        }
      }

      if (files.length > 0) {
        for (const file of files) {
          if (file.isDeleted) {
            await FileUploadService.deleteFile(file.id);
            setFiles((prevFiles) =>
              prevFiles.filter((f) => f.id !== file.id)
            );
          }
        }
      }

      await boardService.editBoard(board);
      navigate("/ListBoard");
      setMsg("게시판 수정이 완료되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="EditBoard-wrapper">
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-10">
              <div className="card">
                <div className="card-header fs-3 text-center">
                  게시글 수정
                </div>
                {msg && (
                  <p className="fs-4 text-center text-success">{msg}</p>
                )}

                <div className="card-body">
                  <form onSubmit={handleBoardUpdate}>
                    <div className="mb-3">
                      <label>제목</label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        onChange={handleChange}
                        value={board.title}
                      />
                    </div>

                    <div className="mb-3">
                      <label>내용</label>
                      <CKEditor
                        editor={ClassicEditor}
                        data={board.content}
                        onChange={handleChangeContent}
                      />
                    </div>

                    <div className="mb-3">
                      <label>작성자</label>
                      <input
                        type="text"
                        name="writer"
                        className="form-control"
                        readOnly
                        value={board.writer}
                      />
                    </div>

                    <div className="attachment">
                      <p>
                        <AiOutlineFolder /> 첨부파일
                      </p>
                      {files && (
                        <div>
                          {files.map((file) => (
                            <div key={file.id}>
                              {file.isDeleted ? null : file.type.startsWith("image/") ? (
                                <>
                                  <img
                                    className="preview"
                                    src={`data:${file.type};base64,${file.data}`}
                                    alt={file.name}
                                  />
                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleFileDelete(file)}
                                  >
                                    삭제
                                  </button>
                                </>
                              ) : (
                                <div>
                                  <a
                                    href={URL.createObjectURL(
                                      new Blob([file.data], { type: file.type })
                                    )}
                                    download={file.name}
                                  >
                                    {file.name}
                                  </a>
                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleFileDelete(file)}
                                  >
                                    삭제
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {newFiles.length > 0 && (
                        <div>
                          {newFiles.map((file, index) => (
                            <div key={index}>
                              {file.type.startsWith("image/") ? (
                                <>
                                  <img
                                    className="preview"
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                  />
                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleFileRemove(file)}
                                  >
                                    삭제
                                  </button>
                                </>
                              ) : (
                                <div>
                                  <span>{file.name}</span>
                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleFileRemove(file)}
                                  >
                                    삭제
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mb-3">
                        <input
                          type="file"
                          name="file"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn btn-primary">
                        수정
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBoard;
