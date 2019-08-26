/**
 * Palette Information display section
 * Author: Darien Tsai
 * Date: 8-2-19
 */

import React, {Component} from 'react';
import SelectionInfo from './SelectionInfo';
import OverallInfo from './OverallInfo';

//Displays number of color groups and colors
class Information extends Component{
render(){
  return(
    <div id="info">
      <SelectionInfo colorCount={this.props.current.colors.length - 1} current={this.props.current} color={this.props.current.currentColor}/>
      <OverallInfo groups={this.props.groups} colors={this.props.colors} />
    </div>
    )
  }
}

export default Information;