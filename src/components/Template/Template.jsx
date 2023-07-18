import React, { useState, useEffect, useContext } from 'react';
import './Template.scss';
import { Route, Redirect, Link, useLocation } from 'react-router-dom';
import { Delimeter } from './Delimeter/Delimeter';
import { Section } from './Menu/Section/Section';
import { News } from './News/News';
import { AppContext } from '../../context';
import { Shedule } from './Shedule/Shedule';
import { Swaps } from './Swaps/Swaps';
import { Docs } from './Docs/Docs';
import { Users } from './Users/Users';
export const Template = ({ logout }) => {
  const context = useContext(AppContext);
  const location = useLocation();
  const currentUrl = location.pathname;
  const initialSection =
    currentUrl == '/news'
      ? 'Доска объявлений'
      : currentUrl == '/schedule'
      ? 'Расписание'
      : currentUrl == '/swaps'
      ? 'Замещения'
      : currentUrl == '/docs'
      ? 'Нормативная база'
      : currentUrl == '/users'
      ? 'Пользователи'
      : 'Доска объявлений';
  const [section, setSection] = useState(initialSection);
  function clickSection(name) {
    setSection(name);
  }

  function ClickForLogout() {
    logout();
  }

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 857); // Примерное значение ширины экрана, на котором считаем, что это мобильное устройство
    };

    handleResize(); // Вызываем функцию непосредственно при монтировании компонента, чтобы установить исходное значение
    window.addEventListener('resize', handleResize); // Добавляем слушатель события изменения размера окна

    return () => {
      window.removeEventListener('resize', handleResize); // Удаляем слушатель при размонтировании компонента
    };
  }, []);

  return (
    <div style={{ transform: 'translateY(41px)' }} className="wrap-template">
      {!isMobile && (
        <div className="menu">
          <div className="header">
            <img src="logo.png" width={45} alt="profile-img" />
            <p className="role-header">
              {context.role === 'admin'
                ? 'Админ'
                : context.role === 'superadmin'
                ? 'СуперАдмин'
                : 'Учитель'}
            </p>
            <img
              title="Выйти из аккаунта"
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
                icon={'docs.png'}
                section={section}
                name={'Нормативная база'}
              />
            </Link>
          </div>
          {context.role == 'superadmin' && (
            <div className="big-section">
              <Link to={'/users'}>
                <Section
                  clickSection={clickSection}
                  icon={'user.png'}
                  section={section}
                  name={'Пользователи'}
                />
              </Link>
            </div>
          )}
        </div>
      )}
      {isMobile && (
        <div className="mobile-menu">
          <div className="mobile-menu-section">
            <Link to={'/news'}>
              <Section
                mobile
                clickSection={clickSection}
                icon={'megaphone.png'}
                section={section}
                name={'Доска объявлений'}
              />
            </Link>
          </div>
          <div className="mobile-menu-section">
            <Link to={'/schedule'}>
              <Section
                mobile
                clickSection={clickSection}
                icon={'calendar.png'}
                section={section}
                name={'Расписание'}
              />
            </Link>
          </div>
          <div className="mobile-menu-section">
            <Link to={'/swaps'}>
              <Section
                mobile
                clickSection={clickSection}
                icon={'swap.png'}
                section={section}
                name={'Замещения'}
              />
            </Link>
          </div>
          <div className="mobile-menu-section">
            <Link to={'/docs'}>
              <Section
                mobile
                clickSection={clickSection}
                icon={'docs.png'}
                section={section}
                name={'Нормативная база'}
              />
            </Link>
          </div>

          {context.role == 'superadmin' && (
            <div className="mobile-menu-section">
              <Link to={'/users'}>
                <Section
                  mobile
                  clickSection={clickSection}
                  icon={'user.png'}
                  section={section}
                  name={'Пользователи'}
                />
              </Link>
            </div>
          )}
        </div>
      )}
      {isMobile && (
        <div className="mobile-header">
          <img src="logo.png" width={34} alt="profile-img" />
          <p className="role-header">
            {context.role === 'admin'
              ? 'Админ'
              : context.role === 'superadmin'
              ? 'СуперАдмин'
              : 'Учитель'}
          </p>
          <img
            title="Выйти из аккаунта"
            className="cursor-p"
            onClick={() => ClickForLogout()}
            src="icons/menu/logout.png"
            width={29}
            alt="profile-img"
          />
        </div>
      )}
      <div className="content-window">
        <Route path="/" exact>
          <Redirect to="/news" />
        </Route>
        <Route path="/news" exact>
          <News />
        </Route>
        <Route path="/schedule" exact>
          <Shedule />
        </Route>
        <Route path="/swaps" exact>
          <Swaps />
        </Route>
        <Route path="/docs" exact>
          <Docs />
        </Route>
        <Route path="/users" exact>
          {context.role === 'superadmin' ? <Users /> : <Redirect to="/" />}
        </Route>
      </div>
    </div>
  );
};
