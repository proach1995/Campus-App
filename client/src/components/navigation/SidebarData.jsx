import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

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
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Events',
    path: '/events',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Mein Profil',
    path: '/meinprofil',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Etwas posten',
    path: '/postupload',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Meine Posts',
    path: '/meineposts',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
  title: 'Einstellungen',
    path: '/Einstellungen',
    icon: <AiIcons.AiOutlineMail />,
    cName: 'nav-text'
}
];