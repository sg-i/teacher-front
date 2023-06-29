import React, { useEffect, useState, useContext } from 'react';
import './News.scss';
import UserService from '../../../services/user.service';
import { ElementNews } from './ElementNews/ElementNews';
import { AppContext } from '../../../context';
import 'reactjs-popup/dist/index.css';
import { PopupExample } from './PopupExample/PopupExample';
import AdminService from '../../../services/admin.service';
import 'react-spinner-animated/dist/index.css';

export const News = () => {
  const context = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  useEffect(() => {
    setLoading(true);
    UserService.getNews()
      .then(function (res) {
        setNews(res.data.news);
        setLoading(false);
      })
      .catch(function (err) {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const DeleteOneNews = (id) => {
    AdminService.dltNews(id).then((res) => {
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
        {!loading ? (
          news.map((elem) => (
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
          ))
        ) : (
          <div>Загрузка..</div>
        )}
      </div>
    </div>
  );
};
