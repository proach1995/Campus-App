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

  const isLoggedIn = true;

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
              <div className="centerLoginButtons">
                <Button size="lg" href="/login" className="button login-btn">Login</Button><br/>
                <Button href="/register" className="button register-btn login-btn">Registrieren</Button>
              </div>
            </div>
            

            <div className="divider" />
            <ul  >
              {SidebarData.map((item, index) => {
                return (
                  <Link to={item.path}  >
                  <li key={index} className={item.cName}>
                      {item.icon}
                      <span onClick={toggleButton}>{item.title}</span>
                  </li>
                  </Link>

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