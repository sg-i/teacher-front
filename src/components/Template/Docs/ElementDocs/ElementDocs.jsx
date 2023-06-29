import React from 'react';
import './ElementDocs.scss';
export const ElementDocs = ({ data, day }) => {
  function addMissingLessons(lessons) {
    const newLessons = [];
    const lastDay = lessons[lessons.length - 1].lessonNumber;
    for (let i = 1; i <= lastDay; i++) {
      const lesson = lessons.find((item) => item.lessonNumber === i);

      if (lesson) {
        newLessons.push(lesson);
      } else {
        newLessons.push({
          class: { number: '-' },
          classroom: { number: '-' },
          createdAt: '-',
          dayOfWeek: '-',
          id: '-',
          lessonNumber: i,
          subject: { name: '-' },
          teacher: { name: '-' },
          updatedAt: '-',
        });
      }
    }

    return newLessons;
  }
  const newData = addMissingLessons(data);
  return (
    <div className="wrap-element-docs">
      <div className="title-day">{day}</div>
      
      <div className="element-docs-content">
        <table className="element-docs-table">
          <tbody>
            {newData.map((elem) => (
              <tr key={String(elem.id) + String(elem.lessonNumber) + day}>
                <td>{elem.lessonNumber}</td>
                <td>{elem.subject.name}</td>
                <td>{elem.teacher.name}</td>
                <td>{elem.class.number}</td>
                <td>{elem.classroom.number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
