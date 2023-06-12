import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../../../context';
import Popup from 'reactjs-popup';
import './PopupExample.scss';
import AdminService from '../../../../services/admin.service';

export const PopupExample = () => {
  // const lettersOnlyRegex = /^[A-Za-zА-Яа-яЁё]+$/;
  const lettersOnlyRegex = /^[A-Za-zА-Яа-яЁё]*$/;
  const context = useContext(AppContext);

  const [Lastname, setLastname] = useState('');
  const [Firstname, setFirstname] = useState('');
  const [Patronymic, setPatronymic] = useState('');
  const [Text, setText] = useState('');
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const onChangeLastname = (e) => {
    const lastname = capitalizeFirstLetter(e.target.value);
    if (lettersOnlyRegex.test(lastname)) {
      setLastname(lastname);
    }
  };

  const onChangeFirstname = (e) => {
    const firstname = capitalizeFirstLetter(e.target.value);
    if (lettersOnlyRegex.test(firstname)) {
      setFirstname(firstname);
    }
  };

  const onChangePatronymic = (e) => {
    const patronymic = capitalizeFirstLetter(e.target.value);
    if (lettersOnlyRegex.test(patronymic)) {
      setPatronymic(patronymic);
    }
  };
  useEffect(() => {
    console.log(Firstname, Lastname, Patronymic, Text);
  }, [Firstname, Lastname, Patronymic, Text]);

  const onChangeText = (e) => {
    const text = e.target.value;
    setText(text);
  };
  const SubmitFormAddNews = (e) => {
    // e.preventDefault();
    console.log(Firstname);
    console.log(Lastname);
    console.log(Patronymic);
    console.log(Text);
    AdminService.addNews(Lastname, Firstname, Patronymic, Text).then();
  };
  if (context.role === 'admin') {
    return (
      <Popup
        trigger={<img className="title-news-img cursor-p" src="/icons/news/add.png" alt="" />}
        modal
        nested>
        {(close) => (
          <div className="popup-form">
            <button className="close-popup-button" onClick={close}>
              <svg
                fill="#ffffff"
                width="100%"
                height="100%"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z" />
              </svg>
            </button>

            <form onSubmit={SubmitFormAddNews}>
              <label className="action-label-popup-form" htmlFor="">
                Введите ваше ФИО:
              </label>
              <div className="author-form-section">
                <div className="author-input-form-author-section">
                  {/* <label htmlFor="">Фамилия</label> */}
                  <input
                    onChange={onChangeLastname}
                    value={Lastname}
                    placeholder="Фамилия"
                    type="text"
                    pattern="[A-Za-zА-Яа-яЁё]+"
                    title="Введите только буквы"
                  />
                </div>
                <div className="author-input-form-author-section">
                  {/* <label htmlFor="">Имя</label> */}
                  <input
                    onChange={onChangeFirstname}
                    value={Firstname}
                    placeholder="Имя"
                    type="text"
                    pattern="[A-Za-zА-Яа-яЁё]+"
                    title="Введите только буквы"
                  />
                </div>
                <div className="author-input-form-author-section">
                  {/* <label htmlFor="">Отчество</label> */}
                  <input
                    onChange={onChangePatronymic}
                    value={Patronymic}
                    placeholder="Отчество"
                    type="text"
                    pattern="[A-Za-zА-Яа-яЁё\s]+"
                    title="Введите только буквы"
                  />
                </div>
              </div>
              <label className="action-label-popup-form" htmlFor="">
                Введите текст объявления:
              </label>
              <div className="author-input-form-text-section">
                {/* <label htmlFor="">Объявление</label> */}
                <textarea
                  onChange={onChangeText}
                  value={Text}
                  rows={10}
                  placeholder="Объявление"
                  type="text"
                />
              </div>
              <div className="form-news-add-button">
                <button>Добавить</button>
              </div>
            </form>
          </div>
        )}
      </Popup>
    );
  } else {
    return null;
  }
};
