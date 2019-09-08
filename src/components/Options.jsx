/**
 * Options for data display and navigation
 * Author: Darien Tsai
 * Date: 8/10/19
 */

import React, {Component} from 'react'

class Options extends Component{
  render(){
    return(
      <div id="options">
        <div id="control" className="control">
          <button onClick={this.props.scroll} id="scroll-btn">Scrolling</button>
        </div>

        <div id="nav">
          <button id="home-btn" onClick={() => {window.location.assign('home.html');}}>Home</button>
          <button id="help-btn" onClick={() => {window.location.assign('tutorial.html');}}>Help</button>
        </div>
      </div>
    )
  }
}

export default Options;