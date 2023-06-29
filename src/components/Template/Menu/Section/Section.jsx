import React, { useEffect, useState } from 'react';
import './Section.scss';
export const Section = ({ mobile, icon, name, section, clickSection }) => {
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
    return newFilename;
  }
  
  const handleSectionSelect = () => {
    clickSection(name);
  };
  return (
    <div
      style={mobile ? { backgroundColor: 'white' } : {}}
      onClick={() => handleSectionSelect()}
      className="wrap-section">
      {icon && <img width={30} src={addColorToFilename(icon, isActive)} alt="" />}
      {!mobile && (
        <p className={'section-name' + (isActive ? ' section-name-active' : '')}>{name}</p>
      )}
    </div>
  );
};
