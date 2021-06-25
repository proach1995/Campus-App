import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IconContext } from 'react-icons';
import './Sidebar.css';
import Figure from 'react-bootstrap/Figure';
import { HamburgerSpring } from 'react-animated-burgers';
import Button from 'react-bootstrap/Button';
import { AppContext } from '../../context/AppContext';
import DataServer from '../../api/DataServer';
import Cookies from 'js-cookie';

import * as AiIcons from 'react-icons/ai';
import { BsPeopleCircle } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";  
import { IoAddCircleOutline } from "react-icons/io5";
import { IoEarthOutline } from "react-icons/io5"; 






function Sidebar() {
    
  const {logged, setLogged} = useContext(AppContext);
  const {user, setUser} = useContext(AppContext);

// Contitional rendering in JS-> Array bedingungsabhängig rendern
// https://stackoverflow.com/questions/15995963/javascript-remove-array-element-on-condition

 
  const SidebarData = [
    {
      title: 'Home',
      path: '/',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text'
    },
    {
      title: 'Marktplatz',
      path: '/marktplatz',
      icon: <IoEarthOutline />,
      cName: 'nav-text'
    },
    {
      title: 'Events',
      path: '/events',
      icon: <IoCalendarOutline/>,
      cName: 'nav-text'
    },
    {
      title: 'Etwas posten',
      path: '/postupload',
      icon: <IoAddCircleOutline />,
      cName: 'nav-text'
    }
  ];

  //console.log(SidebarData);


  let history = useHistory();
  // eslint-disable-next-line no-lone-blocks
  const [isActive, setIsActive] = useState(false);
  const toggleButton = useCallback(
    () => setIsActive(prevState => !prevState),
     [],
  );

  const refreshHandler = async()=>{
   
    const userData = await DataServer.get("User/"+Cookies.get("userId"));
    console.log("egal", userData);
    setUser(userData.data.userDetail.user);
    setLogged(true);
  }



    const logoutHandler =(e) =>{
      setLogged(false);
      user.userid="";
      user.userprename="";
      user.userdescription="";
      user.useremail="";
      user.userimage="";
      user.userlastname="";
      user.username ="";
      user.userpassword="";
      user.userbirthdate="";

      Cookies.remove("userId");
      localStorage.removeItem("token");
      //History muss in einem componenten benutzt werden und nicht in der App
      history.push("/login");
    }

    useEffect(()=>{
      
      if(localStorage.getItem("token") !=null && logged ==null){
        console.log("Refresh");
        refreshHandler();
        console.log("logged", logged);
      }
    },[logged]);

    useEffect(()=>{
    },[user])

    useEffect(()=>{
      console.log( logged == true);
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
            { logged && 
               <> 
               <Figure style={{display: logged ? '' : 'none' }} className="sidebarProfilSection">
              <Link onClick={toggleButton} to={logged ? "/user/" + user.userid : "unknown"}>
              {/*Warum auch immer... Vor bild muss "/" hin
              https://stackoverflow.com/questions/54176669/how-to-keep-pictures-after-refreshing-page-on-react*/}
              <Figure.Image className="profilSectionImage"
                width={120}
                height={130}
                alt="171x180"
                src={"/"+user.userimage}
                roundedCircle
              />             
              </Link>
              <Figure.Caption className="profilSectionCaption">
              <p className="captionText">  {logged ? (user.userprename +' ' + user.userlastname ) : ("Unkown") } </p>
              <p className="captionText">  {logged ? ( user.useremail) : ("Unkown") } </p>

              </Figure.Caption>
            </Figure>
               </>}
            
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
                  <Link to={item.path} >
                  <li key={index} className={item.cName}>
                      {item.icon}
                      <span onClick={toggleButton}>{item.title}</span>
                  </li>
                  </Link>

                );
              })}
            </ul> 
            </div>
            <div className="logout-btn-container">
            <Link to="/">
            <Button  onClick={(e) => logoutHandler(e)} style={{display: logged ? '' : 'none' }} className="button logout-btn login-btn" variant="secondary" >
                      Logout
            </Button>
            </Link>
            </div>

          </div>
        </nav>
      
          
    </IconContext.Provider>
    </div>
    </>
  );
}

export default Sidebar;