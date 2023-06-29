import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../../../context';
import Popup from 'reactjs-popup';
import './PopupSwaps.scss';
import AdminService from '../../../../services/admin.service';
import { format, getDay } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ru } from 'date-fns/locale';
import { useUpdateEffect } from 'react-use';
import { Chooser } from '../../Chooser/Chooser';
export const PopupSwaps = ({ teachers }) => {
  const [selected, setSelected] = useState();
  const [FormattedDate, setFormattedDate] = useState('');
  const [dayOfTheWeek, setDayOfTheWeek] = useState('');
  const [OldPeople, setOldPeople] = useState({ value: -1, label: '' });
  const [NewPeople, setNewPeople] = useState({ value: -1, label: '' });
  const handleChangeOldPeople = (selectedOption) => {
    setOldPeople(selectedOption);
  };
  const handleChangeNewPeople = (selectedOption) => {
    setNewPeople(selectedOption);
  };

  function getDatOfWeek() {
    const dayOfWeek = getDay(selected);
    switch (dayOfWeek) {
      case 0:
        return 'Воскресенье';
      case 1:
        return 'Понедельник';
      case 2:
        return 'Вторник';
      case 3:
        return 'Среда';
      case 4:
        return 'Четверг';
      case 5:
        return 'Пятница';
      case 6:
        return 'Суббота';
      default:
        return '';
    }
  }

  const context = useContext(AppContext);

  const SubmitFormAddSwaps = (e) => {
    if (selected && OldPeople && NewPeople) {
      if (OldPeople.value != NewPeople.value && OldPeople.value != -1 && NewPeople.value != -1) {
        AdminService.addSwaps(selected, getDatOfWeek(), OldPeople, NewPeople).then();
      } else {
        e.preventDefault();

        alert('Выберите корректные значения!');
      }
    } else {
      e.preventDefault();

      alert('Введите все данные и выберите дату!');
    }
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  if (context.role === 'admin') {
    return (
      <Popup
        contentStyle={
          windowWidth < 768
            ? { width: '90%', maxHeight: '88%', overflow: 'auto' }
            : windowWidth < 1024
            ? { width: '65%' }
            : { width: '50%' }
        }
        overlayStyle={{ transform: 'translateY(81px' }}
        trigger={<img className="title-swaps-img cursor-p" src="/icons/news/add.png" alt="" />}
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
            <div style={{ marginBottom: 10, fontWeight: 600, fontSize: 20, textAlign: 'center' }}>
              Впишите людей и выберите дату
            </div>
            <form onSubmit={SubmitFormAddSwaps}>
              <div className="peoples-calendar">
                <div className="people-info">
                  {' '}
                  <label className="action-label-popup-form" htmlFor="">
                    {'Будет'} <b>{'заменен(а)'}</b>
                    {':'}
                  </label>
                  <div className="author-form-section">
                    <div className="author-input-form-author-section">
                      <Chooser
                        handleChangeTeacher={handleChangeOldPeople}
                        teacherNow={OldPeople}
                        teachers={teachers}
                      />
                    </div>
                  </div>
                  <label className="action-label-popup-form" htmlFor="">
                    {'Будет'} <b>заменять</b>
                    {':'}
                  </label>
                  <div className="author-form-section">
                    <div className="author-input-form-author-section">
                      <Chooser
                        handleChangeTeacher={handleChangeNewPeople}
                        teacherNow={NewPeople}
                        teachers={teachers}
                      />
                    </div>
                  </div>
                </div>
                <div className="calendar-container">
                  <DayPicker
                    locale={ru}
                    weekStartsOn={1}
                    showOutsideDays
                    className="custom-calendar"
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                  />
                </div>
              </div>
              <div className="result-swap">
                {selected && (
                  <div>
                    {format(selected, 'd MMMM', { locale: ru }) +
                      ' ' +
                      '(' +
                      getDatOfWeek(selected) +
                      ')'}
                  </div>
                )}
                <div className="for-name-and-arrow">
                  {OldPeople.label ? (
                    <del style={{ color: 'gray' }}>{OldPeople.label}</del>
                  ) : (
                    '. . .'
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="24"
                    viewBox="0 0 40 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M8 12h24M25 5l10 7-10 7" />
                  </svg>
                  {NewPeople.label ? <b>{NewPeople.label}</b> : '. . .'}
                </div>
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
