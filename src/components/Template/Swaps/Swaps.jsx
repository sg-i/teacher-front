import React, { useEffect, useState, useContext } from 'react';
import './Swaps.scss';
import UserService from '../../../services/user.service';
import { ElementSwap } from './ElementSwap/ElementSwap';
import { AppContext } from '../../../context';
import 'reactjs-popup/dist/index.css';
import AdminService from '../../../services/admin.service';
import { Chooser } from '../Chooser/Chooser';
import { useUpdateEffect } from 'react-use';
import { PopupSwaps } from './PopupSwaps/PopupSwaps';
export const Swaps = () => {
  const [loading, setLoading] = useState(false);

  const [swaps, setSwaps] = useState([]);
  const [classes, setClasses] = useState([{ id: -1, number: '-Все-' }]);
  const [teachers, setTeachers] = useState([{ id: -1, name: '-Все-' }]);
  const [teacherNow, setTeacherNow] = useState({ value: -1, label: '-Все-' });
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
        setTeachers([...teachers, ...res.data.teacher]);
        setTeacherNow({ value: -1, label: '-Все-' });
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  useUpdateEffect(() => {
    UserService.getSwaps(teacherNow).then((res) => {
      setSwaps(res.data);
      setLoading(false);
    });
  }, [teacherNow]);

  const DeleteOneSwap = (id) => {
    console.log('remove', id);
    AdminService.dltSwaps(id).then((res) => {
      window.location.reload();
    });
  };
  return (
    <div className="swaps-wrap">
      <div className="title-swaps">
        <div className="title-swaps-name">Замещения</div>
        <PopupSwaps teachers={teachers} />
      </div>
      {!loading && teacherNow.value > -2 && (
        <Chooser
          handleChangeTeacher={handleChangeTeacher}
          teacherNow={teacherNow}
          teachers={teachers}
          handleChangeClass={handleChangeClass}
          classNow={classNow}
          classes={classes}
        />
      )}
      <div className="swap-container">
        {!loading ? (
          swaps.map((elem) => (
            <ElementSwap key={elem.date} DeleteOneSwap={DeleteOneSwap} element={elem} />
          ))
        ) : (
          <div>Загрузка..</div>
        )}
      </div>
    </div>
  );
};
