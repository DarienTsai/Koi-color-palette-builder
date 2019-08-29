/**
 * Popup for share link
 * Author: Darien Tsai
 * Date: 8/23/19
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

//Share box
class Share extends Component{

  render(){
    return(
      <div id="sharePalette" className="hidden">
        
        <div id="popup">
          <h3>Links Generated!</h3>
          <div id="wrap">
            
            <div id="linkGen"> 
              <p>Workspace</p>    
              <input id="link" type="text" value={this.props.link} onChange={()=>{return}}/>
              <button id="copyBtn" onClick={this.click}>Copy and Close</button>
            </div>

            <div id="exGen">
              <p>Export Sheet</p>
              <input id="exLink" type="text" value={this.props.export} onChange={()=>{return}}/>
              <button id="copyBtnEx" onClick={this.ex}>Copy and Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  click = () =>{
    let link = ReactDOM.findDOMNode(document.getElementById('link'));
    link.select();
    document.execCommand("copy");
    ReactDOM.findDOMNode(document.getElementById('sharePalette')).className = "hidden";
  }

  ex = () =>{
    let link = ReactDOM.findDOMNode(document.getElementById('exLink'));
    link.select();
    document.execCommand("copy");
    ReactDOM.findDOMNode(document.getElementById('sharePalette')).className = "hidden";
  }

}

export default Share;