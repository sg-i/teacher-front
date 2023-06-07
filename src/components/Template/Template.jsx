import React from 'react';
import './Template.scss';
import { Delimeter } from './Delimeter/Delimeter';
export const Template = () => {
  return (
    <div className="wrap-template">
      <div className="menu">
        <div className="header">
          <img src="logo.png" width={45} alt="profile-img" />
          <p className="role-header">Учитель</p>
          <img src="docs.png" width={35} alt="profile-img" />
        </div>
        <Delimeter />
        <div>news</div>
        <div>расписани</div>
        <div>замещени</div>
        <div>норматиная база</div>
      </div>
      <div>right</div>
    </div>
  );
};
