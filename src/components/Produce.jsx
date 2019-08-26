/**
 * The finalization of a palette
 * Author: Darien Tsai
 * Date: 8-2-19
 */

import React, {Component} from 'react';

//Lets users share by link or export to pdf (and hopefully image)
class Produce extends Component{
  render(){
    return(
      <div id="produce">
        <button id="share" className="produce-btn" title="Share" onClick={this.props.actions.share}></button>
        <button id="export" className="produce-btn" title="Export" onClick={this.props.actions.export}></button>
      </div>
    )
  }
}

export default Produce;