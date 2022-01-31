import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import './Sidebar.css';
import SidebarChat from './SidebarChat';


function Sidebar() {
  return <div className='sidebar'>
      <div className='sidebar__header'>
          <Avatar className='sidebar__avatar' />
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
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
      </div>
  </div>;
}

export default Sidebar;
