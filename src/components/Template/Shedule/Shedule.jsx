import React, { useEffect, useState, useContext } from 'react';
import './Shedule.scss';
import UserService from '../../../services/user.service';
import { ElementShedule } from './ElementShedule/ElementShedule';
import { AppContext } from '../../../context';
import 'reactjs-popup/dist/index.css';
import AdminService from '../../../services/admin.service';
import { Chooser } from '../Chooser/Chooser';
import { useUpdateEffect } from 'react-use';
export const Shedule = () => {
  const context = useContext(AppContext);
  const [shedule, setShedule] = useState({});
  const [classes, setClasses] = useState([{ id: -1, number: '-Все-' }]);
  const [teachers, setTeachers] = useState([]);
  const [teacherNow, setTeacherNow] = useState({ value: -1, label: '' });
  const [classNow, setClassNow] = useState({ value: -1, label: '-Все-' });
  const handleChangeTeacher = (selectedOption) => {
    setTeacherNow(selectedOption);
    // console.log(`Option selected:`, selectedOption);
  };
  const handleChangeClass = (selectedOption) => {
    setClassNow(selectedOption);
    // console.log(`Option selected:`, selectedOption);
  };
  useEffect(() => {
    UserService.getTeacher()
      .then((res) => {
        // console.log(res.data);
        setClasses([...classes, ...res.data.class]);
        setTeachers(res.data.teacher);
        setTeacherNow({ value: res.data.teacher[0].id, label: res.data.teacher[0].name });
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    // console.log('shedule', shedule);
  }, [shedule]);
  useUpdateEffect(() => {
    // console.log(teacherNow);
    // console.log(classNow);
    UserService.getShedule(teacherNow, classNow).then((res) => {
      setShedule(res.data);
    });
  }, [teacherNow, classNow]);

  const DeleteOneNews = (id) => {
    // console.log('remove', id);
    // AdminService.dltNews(id).then((res) => {
    //   // console.log(res);
    //   console.log(res.data.dltId);
    //   setNews(news.filter((elem) => elem.id != res.data.dltId));
    // });
  };
  return (
    <div className="shedule-wrap">
      <div className="title-shedule">
        <div className="title-shedule-name">Расписание</div>
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
      <div className="shedule-list">
        {shedule &&
          Object.keys(shedule).map((elem) => {
            if (shedule[elem].length) {
              return <ElementShedule key={elem} data={shedule[elem]} day={elem} />;
            }
          })}
        {/* <div className="first-row">
          {shedule &&
            Object.keys(shedule)
              .slice(0, 3)
              .map((elem) => <ElementShedule day={elem} />)}
        </div>
        <div className="first-row">
          {shedule &&
            Object.keys(shedule)
              .slice(3, 6)
              .map((elem) => <ElementShedule day={elem} />)}
        </div> */}
      </div>
    </div>
  );
};
