/**
 * Represents a color group
 * Author: Darien Tsai
 * Date: 8/11/19
 */

import React, {Component} from 'react';

class Group extends Component{

  render(){
    return(
      <div className={this.props.isFull}  name={this.props.addedName}>
        <svg width="48.667px" height="48.667px">
          <g>
            <path className="groupie" d="M47,18.134V1.667H29.218c-1.63,0-3.323-0.491-5.062-0.491c-12.784,0-23.152,10.396-23.152,23.185
              c0,12.787,10.368,23.167,23.152,23.167c12.787,0,23.428-10.356,23.428-23.144C47.584,22.215,47,20.125,47,18.134z M10.982,32.039
              c-2.517,0-4.556-2.038-4.556-4.553c0-2.516,2.039-4.555,4.556-4.555c2.514,0,4.553,2.039,4.553,4.555
              C15.535,30.001,13.496,32.039,10.982,32.039z"/>
          </g>
        </svg>
      </div>
      
    );
  }

}

export default Group;