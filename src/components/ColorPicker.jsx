/**
 * Color picker
 * Author: Darien Tsai
 * Date: 8-2-19
 */

import React, {Component} from 'react';
import {ChromePicker} from 'react-color';

import find from '../colorable/colorFinder';

const overrideStyles = {
  default: {
    color: {
      display: 'none'
    },
    picker: {
      width: '100%',
      background: 'none',
    }
  }
}

//Color picker(s)?
class ColorPicker extends Component{
  constructor(props){
    super(props);

    this.state = {
      currentName: "*Light Sky Blue",
      handleChanged: this.colorChanged
    }
  }

  render(){
    return(
      <div id="center">
        <div id="picker">
          <ChromePicker disableAlpha={true} styles={overrideStyles} onChange={this.props.handler} onChangeComplete={this.state.handleChanged} color={this.props.color}/>
          
        </div>
        <div id="name-centering"><h1 id="picker-color-name">{this.state.currentName}</h1></div>  
    </div>
    )
  }

  colorChanged = (c, e) => {
    this.props.afterHandler(c, e);
    this.setState({currentName: find(c.hex)});
  }
}

export default ColorPicker;