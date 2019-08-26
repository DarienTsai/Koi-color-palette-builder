/**
 * Header component for the left sidebar
 * Author: Darien Tsai
 * Date: 8/2/19
 */

import React, {Component} from 'react';

class LeftBarHeader extends Component{
render(){
  return(
    <div id="left-bar-header">
      <div id="header-logo">
        <object type="image/svg+xml" data="vector/KoiLogo.svg" title="Koi Logo" ></object>
      </div>
      <div id="session-details">
        <input type="textfield" id="session" name="palette name" placeholder="Palette Name" />
        <div id="credit">
          <label id="by">By:</label>
          <input type="textfield" id="author" name="author" placeholder="Koii-sama" />
        </div>
        
        
      </div>
    </div>
  )
  }
}

export default LeftBarHeader;