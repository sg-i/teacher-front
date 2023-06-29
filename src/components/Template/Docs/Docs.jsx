import React, { useEffect, useState, useContext } from 'react';
import './Docs.scss';
import UserService from '../../../services/user.service';
import { AppContext } from '../../../context';
import 'reactjs-popup/dist/index.css';
import AdminService from '../../../services/admin.service';
import { Chooser } from '../Chooser/Chooser';
import { useUpdateEffect } from 'react-use';
import { Delimeter } from '../Delimeter/Delimeter';
export const Docs = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(AppContext);

  useEffect(() => {
    setLoading(true);
    UserService.getDocs()
      .then((response) => {
        setDocuments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFileSelected(true);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUpload = () => {
    if (selectedFile && description) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('description', description);
      AdminService.addDocs(formData)
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert('Выберите файл и заполните описание!');
    }
  };
  function downloadDocument(documentId, documentName) {
    UserService.getDocById(documentId)
      .then((response) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', documentName); // Замените 'document.pdf' на нужное имя файла
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const DeleteOneDoc = (id) => {
    AdminService.dltDocs(id).then((res) => {
      setDocuments(documents.filter((elem) => elem.id != res.data.dltId));
    });
  };
  return (
    <div className="docs-wrap">
      <div className="title-docs">
        <div className="title-docs-name">Нормативная база</div>
      </div>
      {context.role === 'admin' && (
        <>
          <div style={isOpen ? {} : { margin: 0 }} className="wrapping-for-adding">
            <button
              className="doc-add-btn"
              style={{ marginBottom: 20 }}
              onClick={() => handleIsOpen()}>
              {!isOpen ? 'Добавить файл' : 'Не добавлять файл'}
            </button>
            {isOpen && (
              <div className="adding-docs-wrap">
                <div style={{ fontSize: 16, wordWrap: 'break-word' }}>
                  <b>Выберите файл и заполните описание.</b>
                </div>
                <label className="custom-input-doc" htmlFor="upload-doc">
                  {isFileSelected ? 'Выбрать другой файл' : 'Выбрать файл'}
                </label>
                {selectedFile && (
                  <span style={{ wordWrap: 'break-word' }}>
                    {'Выбран файл: '} <b>{selectedFile.name}</b>
                  </span>
                )}
                <input
                  style={{ display: 'none' }}
                  id="upload-doc"
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.xlsx,.xlsm,.xls"
                  onChange={handleFileChange}
                />

                <textarea
                  className="doc-add-desc"
                  placeholder="Описание.."
                  value={description}
                  onChange={handleDescriptionChange}
                />
                <button className="doc-add-btn" onClick={handleUpload}>
                  Добавить
                </button>
              </div>
            )}
          </div>
          {isOpen && (
            <div style={{ marginBottom: 10 }}>
              <Delimeter />
            </div>
          )}
        </>
      )}
      <div className="wrap-for-docs">
        <div className="element-shedule-content">
          {!loading ? (
            <table className="element-shedule-table">
              <tbody>
                {documents.map((document) => (
                  <tr key={document.id}>
                    <td className="elem-name">{document.name}</td>
                    <td>{document.description}</td>
                    <td>
                      {context.role === 'admin' ? (
                        <div
                          style={{ display: 'flex', flexDirection: 'column', marginBottom: 5 }}
                          onClick={() => DeleteOneDoc(document.id)}
                          className="delete-section">
                          <img
                            style={{ margin: '0 auto' }}
                            className="button-for-docs"
                            width={17}
                            src="icons/news/delete.png"
                            alt=""
                          />
                        </div>
                      ) : null}
                      <div
                        onClick={() => downloadDocument(document.id, document.name)}
                        className="wrap-for-dwnload-png">
                        <img width={17} src="icons/docs/download.png" alt="" />
                      </div>
                      <button
                        className="button-for-docs"
                        onClick={() => downloadDocument(document.id, document.name)}>
                        Скачать
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>Загрузка..</div>
          )}
        </div>
      </div>
    </div>
  );
};
