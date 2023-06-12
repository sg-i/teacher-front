import React, { useEffect, useState, useContext } from 'react';
import './News.scss';
import UserService from '../../../services/user.service';
import { ElementNews } from './ElementNews/ElementNews';
import { AppContext } from '../../../context';
import 'reactjs-popup/dist/index.css';
import { PopupExample } from './PopupExample/PopupExample';
import AdminService from '../../../services/admin.service';
export const News = () => {
  const context = useContext(AppContext);
  const [news, setNews] = useState([]);
  useEffect(() => {
    UserService.getNews()
      .then(function (res) {
        setNews(res.data.news);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  const DeleteOneNews = (id) => {
    console.log('remove', id);
    AdminService.dltNews(id).then((res) => {
      // console.log(res);
      console.log(res.data.dltId);
      setNews(news.filter((elem) => elem.id != res.data.dltId));
    });
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
            deleteFunc={DeleteOneNews}
            key={elem.id}
            id={elem.id}
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
