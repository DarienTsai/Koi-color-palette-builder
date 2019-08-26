/**
 * Palette Information display section
 * Author: Darien Tsai
 * Date: 8-9-19
 */

 import React, {Component} from 'react';

 //Info for entire palette
 class OverallInfo extends Component{
   render(){
     return(
      <div id="overall-info">
        <div id="overall-groups" className="overall-container">
          <div className="overall-flair"><p id="group-num">{this.props.groups}</p></div>
          <p className="overall-label">Groups</p>
        </div>
        <div id="overall-colors" className="overall-container">
          <div className="overall-flair"><p id="color-num">{this.props.colors}</p></div>
          <p className="overall-label">Colors</p>
        </div>
      </div>
     )
   }
 }

 export default OverallInfo;