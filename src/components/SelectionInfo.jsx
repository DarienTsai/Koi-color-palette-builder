/**
 * Palette Information display section
 * Author: Darien Tsai
 * Date: 8-9-19
 */

import React, {Component} from 'react'
import find from '../colorable/colorFinder';

//Info for currently selected group and color
class SelectionInfo extends Component{
  render(){
    return(
    <div id="current-selection-info">

    <div id="current-group">
      <input type="text" id="group-name" className="info-field" placeholder="Group" ></input>
      <textarea id="group-description" placeholder="Description" spellCheck="false" ></textarea>
      <div id="group-colors">
        <div id="color-count-container"><p id="group-color-count">{this.props.colorCount}</p></div>
        <p id="color-count-label">Colors</p>
      </div>
      <p id="select-separator">&#9662;&#9662;&#9662;</p>
    </div>

    <div id="current-color">
      <div id="current-color-display" style={{background: this.props.current.colors[this.props.color].value === "None" ? "url(https://raw.githubusercontent.com/DarienTsai/Koi-color-palette-builder/master/public/png/transparentBg.png)" : this.props.current.colors[this.props.color].value}}></div>
      <p id="current-color-name">{this.props.current.colors[this.props.color].value === "None" ? "New Color" : find(this.props.current.colors[this.props.color].value)}</p>
      <p id="current-color-hex">{this.props.current.colors[this.props.color].value}</p>
      <input type="text" id="color-notes" className="info-field" placeholder="Notes"></input>
    </div>

    </div>
    )
  }
}

export default SelectionInfo;