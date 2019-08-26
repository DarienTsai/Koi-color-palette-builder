/**
 * Represents a color
 * Author: Darien Tsai
 * Date: 8/12/19
 */

 import React, {Component} from 'react';
 
 //Color component
class Color extends Component{

  render(){
    return(
      <div className={"c " + this.props.addClass}>
        <div className="c-display-container"><div className="c-display" style={{background: this.props.val}}></div></div>
        <div className="c-info">
          <input type="text" placeholder="Color"></input>
          <p className="c-val">{this.props.val}</p>
        </div>
      </div>
    );
  }
}

export default Color;