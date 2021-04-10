import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import './Sidebar.css';
import Figure from 'react-bootstrap/Figure';







function Sidebar({isActive},{toggleButton}) {
 

  return (
    <>
      


      <IconContext.Provider value={{ color: 'white' }}>
        <nav className={isActive ? 'nav-menu active' : 'nav-menu'}>
          <div className='nav-menu-items'>
            <Figure className="sidebarProfilSection">
              <Figure.Image className="profilSectionImage"
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
            <div className="divider" />
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