import React, { useEffect, useState, useContext } from 'react';
import './Shedule.scss';
import UserService from '../../../services/user.service';
import { ElementShedule } from './ElementShedule/ElementShedule';
import { AppContext } from '../../../context';
import 'reactjs-popup/dist/index.css';
import { Chooser } from '../Chooser/Chooser';
import { useUpdateEffect } from 'react-use';
import 'react-spinner-animated/dist/index.css';
export const Shedule = () => {
  const [loading, setLoading] = useState(false);
  const [shedule, setShedule] = useState({});
  const [classes, setClasses] = useState([{ id: -1, number: '-Все-' }]);
  const [teachers, setTeachers] = useState([]);
  const [teacherNow, setTeacherNow] = useState({ value: -1, label: '' });
  const [classNow, setClassNow] = useState({ value: -1, label: '-Все-' });
  const handleChangeTeacher = (selectedOption) => {
    setTeacherNow(selectedOption);
  };
  const handleChangeClass = (selectedOption) => {
    setClassNow(selectedOption);
  };
  useEffect(() => {
    setLoading(true);
    UserService.getTeacher()
      .then((res) => {
        setClasses([...classes, ...res.data.class]);
        setTeachers(res.data.teacher);
        setTeacherNow({ value: res.data.teacher[0].id, label: res.data.teacher[0].name });
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  useUpdateEffect(() => {
    UserService.getShedule(teacherNow, classNow)
      .then((res) => {
        setShedule(res.data);
        setLoading(false);
      })
      .catch(function (err) {
        console.log(err);
        setLoading(false);
      });
  }, [teacherNow, classNow]);

  return (
    <div className="shedule-wrap">
      <div className="title-shedule">
        <div className="title-shedule-name">Расписание</div>
      </div>
      {teacherNow.value > -1 && (
        <Chooser
          full
          handleChangeTeacher={handleChangeTeacher}
          teacherNow={teacherNow}
          teachers={teachers}
          handleChangeClass={handleChangeClass}
          classNow={classNow}
          classes={classes}
        />
      )}
      <div className="shedule-list">
        {!loading ? (
          Object.keys(shedule).map((elem) => {
            if (shedule[elem].length) {
              return <ElementShedule key={elem} data={shedule[elem]} day={elem} />;
            }
          })
        ) : (
          <div>Загрузка..</div>
        )}
      </div>
    </div>
  );
};
