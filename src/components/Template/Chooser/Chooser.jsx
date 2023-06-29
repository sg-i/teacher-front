import React, { useState } from 'react';
import './Chooser.scss';
import Select from 'react-select';

const customStylesTeacher = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? '1px solid black' : '1px solid #c9c9c9',
    boxShadow: state.isFocused ? '0 0 0 1px black' : 'none',
    borderRadius: '15px',
    fontWeight: '600',
    minWidth: state.selectProps.menuMinWidth,
    '&:hover': {
      border: '1px solid black',
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    minWidth: state.selectProps.menuMinWidth, // Use the dynamically calculated minWidth
  }),
  option: (provided) => ({
    ...provided,
    whiteSpace: 'nowrap',
  }),
};

const customStylesClasses = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? '1px solid black' : '1px solid #c9c9c9',
    boxShadow: state.isFocused ? '0 0 0 1px black' : 'none',
    borderRadius: '15px',
    fontWeight: '600',
    minWidth: state.selectProps.menuMinWidth,
    '&:hover': {
      border: '1px solid black',
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    minWidth: state.selectProps.menuMinWidth, // Use the dynamically calculated minWidth
  }),
  option: (provided) => ({
    ...provided,
    whiteSpace: 'nowrap',
  }),
};
export const Chooser = ({
  full,
  handleChangeClass,
  classNow,
  classes,
  handleChangeTeacher,
  teacherNow,
  teachers,
}) => {
  function convertToSelectOptions(array) {
    return array.map((item) => ({
      value: item.id,
      label: item.name || item.number,
    }));
  }
  const controlMinWidth = '150px'; // Define the minWidth for the control
  const menuMinWidth = `calc(${controlMinWidth} + 10px)`; // Calculate the minWidth for the options
  
  return (
    <div className="wrap-chooser">
      <div className="chooser">
        <div className="choser-window">
          <div style={{ fontSize: 17 }}>Работник:</div>
          <div>
            <Select
              defaultValue={teacherNow}
              onChange={handleChangeTeacher}
              placeholder={'Выберите...'}
              options={convertToSelectOptions(teachers)}
              styles={customStylesTeacher}
              isSearchable={true}
              menuMinWidth={menuMinWidth}
            />
          </div>
        </div>
        {full && (
          <div className="choser-window">
            <div style={{ fontSize: 17 }}>Класс:</div>
            <div>
              <Select
                defaultValue={classNow}
                onChange={handleChangeClass}
                placeholder={'Выберите...'}
                options={convertToSelectOptions(classes)}
                styles={customStylesClasses}
                isSearchable={true}
                menuMinWidth={110}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
