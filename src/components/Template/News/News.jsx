import React, { useEffect, useState, useContext } from 'react';
import './News.scss';
import UserService from '../../../services/user.service';
import { ElementNews } from './ElementNews/ElementNews';
import { AppContext } from '../../../context';
import 'reactjs-popup/dist/index.css';
import { PopupExample } from './PopupExample/PopupExample';
export const News = () => {
  const context = useContext(AppContext);
  const [news, setNews] = useState([]);
  const [addNewsWindow, setAddNewsWindow] = useState(false);
  useEffect(() => {
    UserService.getNews()
      .then(function (res) {
        setNews(res.data.news);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const openWindowAddNews = () => {
    setAddNewsWindow(true);
  };
  return (
    <div className="news-wrap">
      <div className="title-news">
        <div className="title-news-name">Объявления</div>
        <PopupExample />
      </div>
      <div className="news-list">
        {news.map((elem) => (
          <ElementNews
            key={elem.id}
            firstname={elem.authorFirstName}
            lastname={elem.authorLastName}
            patronymic={elem.authorPatronymic}
            text={elem.text}
            date={elem.createdAt}
          />
        ))}
      </div>
    </div>
  );
};
