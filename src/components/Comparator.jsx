/**
 * Windows used for comparing selected color and currently hovered color
 * Author: Darien Tsai
 * Date: 8-2-19
 */

import React, {Component} from 'react';

//The comparator feature
class Comparator extends Component{

  render(){
    return(
      <div id="comparator">
        
        <div id="comparator-new" className="color-display">
          <div id="new-color" className="color-block" style={{background: this.props.currentColor}}></div>
          <p id="new-hex" className="color-value">{this.props.currentColor}</p>
        </div>

        <div id="comparator-selected" className="color-display">
          <div id="selected-color" className="color-block" style={{background: this.props.compare === "None" ? "url(https://raw.githubusercontent.com/DarienTsai/Koi-color-palette-builder/master/public/png/transparentBg.png)" : this.props.compare}}></div>
          <p id="selected-hex" className="color-value">{this.props.compare === "None" ? "No Selection" : this.props.compare}</p>
        </div>

      </div>
    )
  }
}

export default Comparator;