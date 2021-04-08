import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import './Sidebar.css';







function Sidebar({isActive},{toggleButton}) {
 

  return (
    <>
    
      <IconContext.Provider value={{ color: 'white' }}>
        <nav className={isActive ? 'nav-menu active' : 'nav-menu'}>
          <div className='nav-menu-items'>
            <ul  onClick={toggleButton}>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            

          </div>
        </nav>
      
          
    </IconContext.Provider>
    </>
  );
}

export default Sidebar;