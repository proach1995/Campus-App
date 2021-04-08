import React, { useState, useCallback } from 'react';
import Sidebar from "./Sidebar";
import NavbarTop from "./NavbarTop";
import { Link } from 'react-router-dom';
import { HamburgerSpring } from 'react-animated-burgers';
import './NavbarTop.css';




function NavigationBars () {
    const [isActive, setIsActive] = useState(false)
    
   const toggleButton = useCallback(
     () => setIsActive(prevState => !prevState),
      [],
   );

    return (
        <div>
            <Sidebar isActive={isActive} toggleButton={toggleButton} />
            <NavbarTop isActive={isActive} toggleButton={toggleButton} className="NavbarTop"/>
            <Link to='#' className='menu-bars'>
                <HamburgerSpring className="Hamburger"
                    buttonColor="transparent"
                    barColor="white"
                    buttonWidth={35}
                    {...{ isActive, toggleButton }}
                    />
             </Link>   
        </div>
        
    )
};

export default NavigationBars;

