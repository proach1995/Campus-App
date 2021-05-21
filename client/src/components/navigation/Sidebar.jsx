import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import './Sidebar.css';
import Figure from 'react-bootstrap/Figure';
import { HamburgerSpring } from 'react-animated-burgers';
import Button from 'react-bootstrap/Button';
import { AppContext } from '../../context/AppContext';





function Sidebar({ logout}) {
 
  const {logged, setLogged} = useContext(AppContext);
  const {setUser} = useContext(AppContext);

  let history = useHistory();
  // eslint-disable-next-line no-lone-blocks
  const [isActive, setIsActive] = useState(false);
  const toggleButton = useCallback(
    () => setIsActive(prevState => !prevState),
     [],
  );




    const logoutHandler =(e) =>{

      logout(e);
      setLogged(false);
      setUser(null);
      
     

      //History muss in einem componenten benutzt werden und nicht in der App
      history.push("/login");
    }

    useEffect(()=>{

      console.log("logged = ",logged);
    },[])

    
  return (
    <>
    <div>
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
            <Figure style={{display: logged ? '' : 'none' }} className="sidebarProfilSection">
              <Figure.Image className="profilSectionImage"
                href="/meinprofil"
                width={120}
                height={130}
                alt="171x180"
                src="../pb.jpg"
                roundedCircle
              />
              <Figure.Caption className="profilSectionCaption">
                Vorname Name Mail Adresse.
              </Figure.Caption>
            </Figure>
            <div className="loginButtons" style={{display: logged ? 'none' : '' }}>
              <div className="centerLoginButtons">

              <Link to='/login' onClick={toggleButton}>
                <Button  className="button login-btn" variant="primary" >
                    Login
                  </Button> 
              </Link>
                <br/>
                <Link to='/register' onClick={toggleButton}>
                  <Button  className="button register-btn login-btn" variant="secondary" >
                      Registrieren
                    </Button> 
                </Link>
              </div>
            </div>
            

            <div className="divider" />
            <div className="items">
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
            <Link to="/">
            <div className="logout-btn-container">
            <Button  onClick={(e) => logoutHandler(e)} style={{display: logged ? '' : 'none' }} className="button logout-btn login-btn" variant="secondary" >
                      Logout
            </Button>
            </div>
            </Link>

          </div>
        </nav>
      
          
    </IconContext.Provider>
    </div>
    </>
  );
}

export default Sidebar;