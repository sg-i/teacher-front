import React from 'react';
import { format, getDay, parseISO } from 'date-fns';
import './ElementSwap.scss';
import { ru } from 'date-fns/locale';
import { useState, useContext } from 'react';
import { AppContext } from '../../../../context';
export const ElementSwap = ({ element, DeleteOneSwap }) => {
  const newDate = new Date(element.date);
  const context = useContext(AppContext);
  const [date, setDate] = useState(newDate);
  
  function getDateOfWeek(date) {
    const dayOfWeek = getDay(date);
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
  console.log(getDay(date));

  return (
    <div className="wrap-element-swaps">
      <div className="title-day">
       
        {format(date, 'd MMMM', { locale: ru }) + ' ' + '(' + getDateOfWeek(date) + ')'}
      </div>
      
      <div className="element-swaps-content">
        <table className="element-swaps-table">
          <tbody>
            {element.swaps.map((elem) => (
              <tr key={elem.id}>
                <td className="people-for-swap" style={{ borderRight: 'none' }}>
                  <del style={{ color: 'gray', marginTop: -2, textWrap: 'nowrap' }}>
                    {elem.oldTeacher.name}
                  </del>
                </td>
                <td style={{ borderRight: 'none', borderLeft: 'none' }}>
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
                </td>
                <td className="people-for-swap" style={{ borderLeft: 'none' }}>
                  <div style={{ marginTop: -2, textWrap: 'nowrap' }}>{elem.newTeacher.name}</div>
                </td>
                {context.role === 'admin' ? (
                  <td style={{ maxWidth: '50px', alignItems: 'center' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        maxWidth: '50px',
                        margin: '0 auto',
                      }}
                      onClick={() => DeleteOneSwap(elem.id)}
                    >
                      <img
                        style={{ marginBottom: '-6px' }}
                        className="button-for-docs"
                        width={19}
                        src="icons/news/delete.png"
                        alt=""
                      />
                    </div>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
