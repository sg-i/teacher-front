import React, { useEffect, useState } from 'react';
import './Section.scss';
export const Section = ({ icon, name, section, clickSection }) => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(name == section);
  }, [section]);
  function addColorToFilename(filename, isActive) {
    let parts = filename.split('.');
    let extension = parts.pop();
    let newFilename;
    if (isActive) {
      newFilename = 'icons/menu/' + parts.join('.') + '-color.' + extension;
    } else {
      newFilename = 'icons/menu/' + parts.join('.') + '.' + extension;
    }
    // console.log(newFilename);
    return newFilename;
  }
  //   function clickSection() {
  //     setSection(name);
  //     // console.log(name);
  //   }
  const handleSectionSelect = () => {
    clickSection(name);
  };
  return (
    <div onClick={() => handleSectionSelect()} className="wrap-section">
      {/* {isActive.toString()} */}
      <img width={30} src={addColorToFilename(icon, isActive)} alt="" />
      <p className={'section-name' + (isActive ? ' section-name-active' : '')}>{name}</p>
    </div>
  );
};
