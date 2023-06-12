import React, { useEffect, useState, useContext } from 'react';
import './Shedule.scss';
import UserService from '../../../services/user.service';
import { ElementShedule } from './ElementShedule/ElementShedule';
import { AppContext } from '../../../context';
import 'reactjs-popup/dist/index.css';
import AdminService from '../../../services/admin.service';
import { Chooser } from '../Chooser/Chooser';
export const Shedule = () => {
  const context = useContext(AppContext);
  const [shedule, setShedule] = useState([]);
  const [classes, setClasses] = useState([{ id: -1, number: '-Все-' }]);
  const [teachers, setTeachers] = useState([]);
  const [teacherNow, setTeacherNow] = useState({ value: -1, label: '' });
  const [classNow, setClassNow] = useState({ value: -1, label: '-Все-' });
  const handleChangeTeacher = (selectedOption) => {
    setTeacherNow(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };
  const handleChangeClass = (selectedOption) => {
    setClassNow(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };
  useEffect(() => {
    UserService.getTeacher()
      .then((res) => {
        // console.log(res.data);
        setClasses([...classes, ...res.data.class]);
        setTeachers(res.data.teacher);
        setTeacherNow({ value: res.data.teacher[0].id, label: res.data.teacher[0].name });
        // setClassNow({ value: res.data.class[0].id, label: res.data.class[0].number });
        // setClassNow(classNow);
      })
      .catch(function (err) {
        console.log(err);
      });
    // UserService.getShedule(2, 2)
    //   .then(function (res) {
    //     console.log(res);
    //     // setShedule(res.data.news);
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });
  }, []);
  useEffect(() => {
    console.log(teacherNow);
  }, [teacherNow]);

  const DeleteOneNews = (id) => {
    // console.log('remove', id);
    // AdminService.dltNews(id).then((res) => {
    //   // console.log(res);
    //   console.log(res.data.dltId);
    //   setNews(news.filter((elem) => elem.id != res.data.dltId));
    // });
  };
  return (
    <div className="news-wrap">
      <div className="title-news">
        <div className="title-news-name">Расписание</div>
      </div>
      {teacherNow.value > -1 && (
        <Chooser
          handleChangeTeacher={handleChangeTeacher}
          teacherNow={teacherNow}
          teachers={teachers}
          handleChangeClass={handleChangeClass}
          classNow={classNow}
          classes={classes}
        />
      )}
      <div className="news-list">
        {shedule.map((elem) => (
          <ElementShedule
            // deleteFunc={DeleteOneNews}
            key={elem.id}
            id={elem.id}
            // firstname={elem.authorFirstName}
            // lastname={elem.authorLastName}
            // patronymic={elem.authorPatronymic}
            // text={elem.text}
            // date={elem.createdAt}
          />
        ))}
      </div>
    </div>
  );
};
