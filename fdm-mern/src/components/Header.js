import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Logo from '../images/logo.png';
import './Header.css';

const white = '#ffffff'

function Header() {
    return (
      <div className="header">
          <IconButton>
              <ArrowBackIcon style={{color: white}} fontSize="large" className="header_icon" />
          </IconButton>

          <img
              className="header_logo"
              src={Logo}
              alt=""
          />

          <IconButton>
              <MoreVertIcon style={{color: white}} fontSize="large" className="header_icon" />
          </IconButton>

      </div>
    );
}

export default Header;

