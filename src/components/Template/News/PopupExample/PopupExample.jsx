import React, { useContext } from 'react';
import { AppContext } from '../../../../context';
import Popup from 'reactjs-popup';
import './PopupExample.scss';
export const PopupExample = () => {
  const context = useContext(AppContext);

  if (context.role === 'admin') {
    return (
      <Popup
        trigger={<img className="title-news-img cursor-p" src="/icons/news/add.png" alt="" />}
        modal
        nested>
        <div className="popup-form">
          <form>
            <div className="author-form-section">
              <div className="author-input-form-author-section">
                <label htmlFor="">Фамилия</label>
                <input type="text" />
              </div>
              <div className="author-input-form-author-section">
                <label htmlFor="">Имя</label>
                <input type="text" />
              </div>
              <div className="author-input-form-author-section">
                <label htmlFor="">Отчество</label>
                <input type="text" />
              </div>
            </div>
            <div className="author-input-form-text-section">
              <label htmlFor="">Объявление</label>
              <input type="text" />
            </div>
          </form>
        </div>
      </Popup>
    );
  } else {
    return null;
  }
};
