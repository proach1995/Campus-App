import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import './Sidebar.css';
import Figure from 'react-bootstrap/Figure';
import { HamburgerSpring } from 'react-animated-burgers';
import Button from 'react-bootstrap/Button';








function Sidebar() {
 
  const [isActive, setIsActive] = useState(false)
    
  const toggleButton = useCallback(
    () => setIsActive(prevState => !prevState),
     [],
  );

  const isLoggedIn = false;

  return (
    <>
      
      <Link to='#' className='menu-bars'>
                <HamburgerSpring className="Hamburger"
                    buttonColor="transparent"
                    barColor="white"
                    buttonWidth={35}
                    {...{ isActive, toggleButton }}
                    />
      </Link>  
      <IconContext.Provider value={{ color: 'white' }}>


        <nav className={isActive ? 'nav-menu active' : 'nav-menu'}>
          <div className='nav-menu-items'>
            <Figure style={{display: isLoggedIn ? 'none' : '' }} className="sidebarProfilSection">
              <Figure.Image className="profilSectionImage"
                href="/meinprofil"
                width={120}
                height={130}
                alt="171x180"
                src="./pb.jpg"
                roundedCircle
              />
              <Figure.Caption className="profilSectionCaption">
                Vorname Name Mail Adresse.
              </Figure.Caption>
            </Figure>
            <div className="loginButtons" style={{display: isLoggedIn ? '' : 'none' }}>
              <Button size="lg" href="/login" className="button">Login</Button><br/>
              <Button href="/register" className="button register-btn">Registrieren</Button>
            </div>
            

            <div className="divider" />
            <ul  >
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}  >
                      {item.icon}
                      <span onClick={toggleButton}>{item.title}</span>
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