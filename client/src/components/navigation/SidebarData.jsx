import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { BsPeopleCircle } from "react-icons/bs";
import { BsFileArrowUp } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";  
import { IoAddCircleOutline } from "react-icons/io5";
import { IoEarthOutline } from "react-icons/io5"; 
import { IoLibraryOutline } from "react-icons/io5";
import { IoCogSharp } from "react-icons/io5";

export const SidebarData = [
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
    title: 'Mein Profil',
    path: '/meinprofil',
    icon: <BsPeopleCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Etwas posten',
    path: '/postupload',
    icon: <IoAddCircleOutline />,
    cName: 'nav-text'
  }
];