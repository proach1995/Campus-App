import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import {Animate} from 'react-rebound';
import { HamburgerSpring } from 'react-animated-burgers';
import './Sidebar.css';







function Sidebar() {
  // sidebar als Variable hier definiert
   const [isActive, setIsActive] = useState(false)

  const toggleButton = useCallback(
    () => setIsActive(prevState => !prevState),
    [],
  );
  //const [clicked] = React.useState(false);


  return (
    <>
      <IconContext.Provider value={{ color: 'blue' }}>
        <Animate translateX={isActive ? 200 : 0} tension={10000} friction={1000} delay={0}>
          <Link to='#' className='menu-bars'>
          <HamburgerSpring className="Hamburger"
            buttonColor="transparent"
            barColor="#007466"
            buttonWidth={35}
            {...{ isActive, toggleButton }}
            />

          </Link>
          </Animate>
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