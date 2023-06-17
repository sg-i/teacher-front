import React, { useEffect, useState, useContext } from 'react';
import './Swaps.scss';
import UserService from '../../../services/user.service';
import { ElementShedule } from './ElementShedule/ElementShedule';
import { AppContext } from '../../../context';
import 'reactjs-popup/dist/index.css';
import AdminService from '../../../services/admin.service';
import { Chooser } from '../Chooser/Chooser';
import { useUpdateEffect } from 'react-use';
export const Swaps = () => {
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

  return (
    <div className="shedule-wrap">
      <div className="title-shedule">
        <div className="title-shedule-name">Замещения</div>
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
      <div>sdf</div>
    </div>
  );
};
