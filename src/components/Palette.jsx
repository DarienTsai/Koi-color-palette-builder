/**
 * Palette space for the left side bar
 * Author: Darien Tsai
 * Date: 8-2-19
 */

import React, {Component} from 'react';

//The collection of selected colors and color groups
class Palette extends Component{

render(){
  return(
    <div id="palette">
      <div id="lists">
        <div id="color-groups-bar">
          {this.props.colorGroups.map(group => group.obj)}
        </div>
        <div id="colors-bar">
          {this.props.colorGroups[this.props.currentG].colors.map(color => color.obj)}
        </div>
        
      </div>
      <div id="removal">
        <button id="remove-group" onClick={this.props.removeG} title="Clear" ></button>
        <button id="remove-color" onClick={this.props.removeC} title="Delete" ></button>
      </div>
    </div>
  )
}
}

export default Palette;