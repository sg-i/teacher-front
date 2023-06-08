import React, { useState, useEffect, useContext } from 'react';
import './Template.scss';
import { Router, Route, Redirect, Link, useHistory } from 'react-router-dom';
import { Delimeter } from './Delimeter/Delimeter';
import { Section } from './Menu/Section/Section';
import { News } from './News/News';
import { AppContext } from '../../context';
export const Template = ({ logout }) => {
  const context = useContext(AppContext);
  console.log(context);
  const [section, setSection] = useState('Доска объявлений');
  function clickSection(name) {
    setSection(name);
  }
  useEffect(() => {
    console.log(section);
  }, [section]);

  function ClickForLogout() {
    logout();
  }

  return (
    <div className="wrap-template">
      <div className="menu">
        <div className="header">
          <img src="logo.png" width={45} alt="profile-img" />
          <p className="role-header">{context.role === 'admin' ? 'Админ' : 'Учитель'}</p>
          <img
            className="cursor-p"
            onClick={() => ClickForLogout()}
            src="icons/menu/logout.png"
            width={30}
            alt="profile-img"
          />
        </div>
        <Delimeter />
        <div className="big-section">
          <Link to={'/news'}>
            <Section
              clickSection={clickSection}
              icon={'megaphone.png'}
              section={section}
              name={'Доска объявлений'}
            />
          </Link>
        </div>
        <Delimeter />
        <div className="big-section">
          <Link to={'/schedule'}>
            <Section
              clickSection={clickSection}
              icon={'calendar.png'}
              section={section}
              name={'Расписание'}
            />
          </Link>
          <Link to={'/swaps'}>
            <Section
              clickSection={clickSection}
              icon={'swap.png'}
              section={section}
              name={'Замещения'}
            />
          </Link>
        </div>
        <Delimeter />
        <div className="big-section">
          <Link to={'/docs'}>
            <Section
              clickSection={clickSection}
              icon={'calendar.png'}
              section={section}
              name={'Нормативная база'}
            />
          </Link>
        </div>
      </div>
      <div className="content-window">
        <Route path="/" exact>
          <Redirect to="/news" />
        </Route>
        <Route path="/news" exact>
          <News />
        </Route>
        <Route path="/schedule" exact>
          schedule
        </Route>
        <Route path="/swaps" exact>
          swaps
        </Route>
        <Route path="/docs" exact>
          docs
        </Route>
      </div>
    </div>
  );
};
