import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';


function Sidebar() {
    const user = useSelector(selectUser);

  return <div className='sidebar'>
      <div className='sidebar__header'>
          <Avatar onClick={() => auth.signOut()} src={user.photo} className='sidebar__avatar' />
          <div class="sidebar__input">
              <SearchIcon />
              <input placeholder='search' />
          </div>

          <IconButton variant='outlined' className='sidebar__inputButton'>
              <AddIcon />
          </IconButton>
      </div>

      <div className='sidebar__chat'>
          <SidebarChat />
      </div>
  </div>;
}

export default Sidebar;
