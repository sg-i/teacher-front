import React from 'react';
import './ElementShedule.scss';
import { Delimeter } from '../../Delimeter/Delimeter';
export const ElementShedule = ({ id, deleteFunc, firstname, lastname, patronymic, text, date }) => {
  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  return (
    <div className="wrap-element">
      <div className="first-sect">
        <div>
          <div className="first-line">
            <div className="author-line">
              <span className="elem-lowtext">{'Автор: '}</span>
              <span className="elem-uptext">{lastname + ' ' + firstname + ' ' + patronymic}</span>
            </div>
          </div>
          <div className="first-line">
            <div className="date-line">
              <span className="elem-lowtext">{'Опубликовано: '}</span>
              <span className="elem-uptext">{formatDate(date)}</span>
            </div>
          </div>
        </div>
        <div onClick={() => deleteFunc(id)} className="delete-section">
          <img className="" src="icons/news/delete.png" alt="" />
        </div>
      </div>
      <Delimeter />
      <div className="text-line">{text}</div>
      <div></div>
    </div>
  );
};
