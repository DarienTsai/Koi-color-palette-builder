/**
 * Color picker application component - contains the largest layout containers
 * Author: Darien Tsai
 * Date: 8/2/19
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import LeftBarHeader from './LeftBarHeader';
import Palette from './Palette';
import Group from './Group';
import Color from './Color';
import ColorPicker from './ColorPicker';
import Options from './Options';
import Comparator from './Comparator';
import Information from './Information';
import Produce from './Produce';
import Share from './Share';

//The overarching application
//Contains the three fundamental layout containers
class App extends Component{

  //Construct and Fields
  constructor(props){
    super(props);

    let groupGen = [];
    for(let i = 1; i < 13; i += 1){
      groupGen.push({
        occupied: false,
        name: "Group " + i,
        desc: "",
        currentColor: 0,
        keyCount: 0,
        keyNum: i,
        obj: <Group key={i} isFull="e" addedName={"Group " + i} onClick="" />,
        colors: [
          {
            name: "",
            notes: "",
            value: "None",
            obj: <Color key="0" addClass="active" val="New" />
          }
        ]
      });
    }

    this.state = {
      app: this,
      currentColor: "#6adef7",
      colorGroups: groupGen,
      currentGroup: 0,
      scroll: true,
      totalGroups: 0,
      totalColors: 0,
      currentCompare: "None",
      handleColorChange: this.pickerChange,
      handleColorChanged: this.pickerChanged,
      handleColorRem: this.removeColor,
      handleGroupRem: this.removeGroup,
      link: "",
      export: "",
      globals:{
        scrollC: this.scrollColor,
        scrollG: this.scrollGroup,
        clickG: this.manualGroupNav,
        keyR: this.setCompare
      },
      final:{
        share: this.share,
        export: this.export
      }
    };

  };

  componentDidMount(){
    if((typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)){
      alert("Koi is not optimized or does not support this device :(");
    }

    let groups = ReactDOM.findDOMNode(document.getElementById('color-groups-bar'));
    groups.childNodes[this.state.currentGroup].classList.add("a");

    var globals = this.state.globals;
    let initGroupText = ReactDOM.findDOMNode(document.getElementById('group-name'));
    initGroupText.value = "Group 1";

    window.addEventListener(
      'wheel',
      function(e){
        if(e.shiftKey){
          globals.scrollG(e);
        }
        else{
          globals.scrollC(e);
        }
      }
    );

    window.addEventListener(
      'keyup',
      function(e){
        if(e.code === "Enter"){
          globals.keyR();
        }

        else if(e.key === "Escape"){
          ReactDOM.findDOMNode(document.getElementById('sharePalette')).className = "hidden";
        }
      }
    );

    //Won't let me loop ;(
    groups.childNodes[0].addEventListener('click',function(e){globals.clickG(0);});
    groups.childNodes[1].addEventListener('click',function(e){globals.clickG(1);});
    groups.childNodes[2].addEventListener('click',function(e){globals.clickG(2);});
    groups.childNodes[3].addEventListener('click',function(e){globals.clickG(3);});
    groups.childNodes[4].addEventListener('click',function(e){globals.clickG(4);});
    groups.childNodes[5].addEventListener('click',function(e){globals.clickG(5);});
    groups.childNodes[6].addEventListener('click',function(e){globals.clickG(6);});
    groups.childNodes[7].addEventListener('click',function(e){globals.clickG(7);});
    groups.childNodes[8].addEventListener('click',function(e){globals.clickG(8);});
    groups.childNodes[9].addEventListener('click',function(e){globals.clickG(9);});
    groups.childNodes[10].addEventListener('click',function(e){globals.clickG(10);});
    groups.childNodes[11].addEventListener('click',function(e){globals.clickG(11);});

    this.parse();
  }
  
  render(){
    return(
      <React.Fragment>
        <div id="left-side" className="sidebar">
          <LeftBarHeader />
          <Palette colorGroups={this.state.colorGroups} currentG={this.state.currentGroup} removeC={this.state.handleColorRem} removeG={this.state.handleGroupRem} />
        </div>

        <div id="center-module">
          <ColorPicker handler={this.state.handleColorChange} afterHandler={this.state.handleColorChanged} color={this.state.currentColor} />
          <Options scroll={this.setScroll} />
        </div>

        <div id="right-side" className="sidebar">
          <Comparator currentColor={this.state.currentColor} compare={this.state.currentCompare}/>
          <Information groups={this.state.totalGroups} colors={this.state.totalColors} current={this.state.colorGroups[this.state.currentGroup]}/>
          <Produce actions={this.state.final} />
        </div>
        <Share link={this.state.link} export={this.state.export}/>
      </React.Fragment>
    )
  }

  //Functions
  pickerChange = (c, e) => {
    this.setState({currentColor: c.hex});
  }

  pickerChanged = (c, e) => {
    this.setState({currentColor: c.hex});
    ReactDOM.findDOMNode(document.getElementById('picker-color-name')).className = "find-name-buffer";
    setTimeout(() => {ReactDOM.findDOMNode(document.getElementById('picker-color-name')).className = "play-color-named";}, 10);
    if(this.state.colorGroups[this.state.currentGroup].currentColor === 0){
      this.addColor(c);
    }
    else{
      this.updateColor(c);
    }
  }

  setScroll = (e) => {
    let scroll = this.state.scroll;
    this.setState({scroll: !scroll});

    let scrollBtn = ReactDOM.findDOMNode(document.getElementById('control'));
    if(scrollBtn.classList.length === 0){
      scrollBtn.classList.add('control');
    }
    else{
      scrollBtn.classList.remove('control');
    }
  }

  scrollColor = (e) => {
    if(!this.state.scroll && e.isTrusted){return;}
    let colors = ReactDOM.findDOMNode(document.getElementById('colors-bar'));
    let groups = this.state.colorGroups;
    let current = groups[this.state.currentGroup];
    let CC = current.currentColor;
    this.updateColorInfo(CC);
    colors.childNodes[CC].classList.remove("active");
    const size = colors.childNodes.length;
    if(e.deltaY < 0){
      CC = (CC - 1) < 0 ? (size - 1) : (CC - 1);
    }
    else if(e.deltaY > 0){
      CC = (CC + 1) % size;
    }
    groups[this.state.currentGroup].currentColor = CC;
    this.setState({colorGroups: groups});
    colors.childNodes[CC].classList.add("active");
    this.displayNotes();
  }

  scrollGroup = (e) => {
    if(!this.state.scroll && e.isTrusted){return;}
    let groups = ReactDOM.findDOMNode(document.getElementById('color-groups-bar'));
    groups.childNodes[this.state.currentGroup].classList.remove("a");
    let CG = this.state.currentGroup;

    let colors = ReactDOM.findDOMNode(document.getElementById('colors-bar'));
    this.updateColorInfo(this.state.colorGroups[CG].currentColor);

    if(e.deltaY < 0){
      CG = (CG - 1) < 0 ? 11: (CG - 1);
    }
    else if(e.deltaY > 0){
      CG = (CG + 1) % 12;
    }
    this.updateGroupName(CG);
    this.setState({currentGroup: CG});
    groups.childNodes[CG].classList.add("a");

    colors = ReactDOM.findDOMNode(document.getElementById('colors-bar'));
    for(let i = 0; i < colors.childNodes.length; i += 1){
      colors.childNodes[i].classList.remove("active");
      colors.childNodes[i].childNodes[1].childNodes[0].value = this.state.colorGroups[this.state.currentGroup].colors[i].name;
    }
    this.displayNotes();
    colors.childNodes[this.state.colorGroups[this.state.currentGroup].currentColor].classList.add("active");
    this.colorListener();
  }

  colorListener = () => {
    let colors = ReactDOM.findDOMNode(document.getElementById('colors-bar'));
    console.log(colors.childNodes);
    for(let i = 0; i < colors.childNodes.length; i += 1){
      colors.childNodes[i].removeEventListener(
        'click',
        (e) => {this.manualColorNav(i);}
      );
      colors.childNodes[i].childNodes[0].childNodes[0].removeEventListener(
        'click',
        (e) => {this.setCompare();}
      );
      colors.childNodes[i].addEventListener(
        'click',
        (e) => {this.manualColorNav(i);}
      );
      colors.childNodes[i].childNodes[0].childNodes[0].addEventListener(
        'click',
        (e) => {console.log(colors); this.setCompare();}
      );
    }
  }

  manualGroupNav = (idx) => {
    const CG = this.state.currentGroup;
    const diff = idx - CG;
    const iter = Math.abs(diff);
    if (diff !== 0){
      for(let i = 0; i < iter; i += 1){
        this.scrollGroup({deltaY: diff, isTrusted: false});
      }
    }
  }

  manualColorNav = (idx) => {
    const CC = this.state.colorGroups[this.state.currentGroup].currentColor;
    const diff = idx - CC;
    const iter = Math.abs(diff);
    if (diff !== 0){
      for(let i = 0; i < iter; i += 1){
        this.scrollColor({deltaY: diff, isTrusted: false});
      }
    }
  }

  updateGroupName = (newGroupIndex) => {
    let g = this.state.colorGroups;
    const current = this.state.currentGroup;
    let currentGroupName = g[current].name;
    let currentGroupDesc = g[current].desc;

    let newText = ReactDOM.findDOMNode(document.getElementById('group-name'));
    currentGroupName = newText.value;

    g[current].name = currentGroupName;

    const reKey = g[current].keyNum;
    const reIsFull = g[current].obj.props.isFull;
    g[current].obj = <Group key={reKey} isFull={reIsFull} addedName={currentGroupName}/>;
    let newDesc = ReactDOM.findDOMNode(document.getElementById('group-description'));
    currentGroupDesc = newDesc.value;
    g[current].desc = currentGroupDesc;

    this.setState({colorGroups: g});
    newText.value = g[newGroupIndex].name;
     newDesc.value = g[newGroupIndex].desc;
  }

  bloatGroup = (status) => {
    let g = this.state.colorGroups;
    const current = this.state.currentGroup;

    const reKey = g[current].keyNum;
    const reName = g[current].obj.props.addedName;

    g[current].obj = <Group key={reKey} isFull={status + " a"} addedName={reName} />

    this.setState({colorGroups: g});
  }

  removeGroup = () => {
    let groups = this.state.colorGroups;
    const currentG = this.state.currentGroup;
    let colorCount = groups[currentG].colors.length - 1;
    if(colorCount === 0){return;}

    groups[currentG].colors.splice(1, colorCount);
    groups[currentG].currentColor = 0;
    const totalColors = this.state.totalColors - colorCount;
    let totalGroups = this.state.totalGroups - 1;

    groups[currentG].occupied = false;
    this.bloatGroup('e');
    this.setState({totalColors: totalColors, totalGroups: totalGroups, colorGroups: groups});
  }

  addColor = (c) => {
    let groups = this.state.colorGroups;
    let current = groups[this.state.currentGroup];
    const key = current.keyCount + 1;

    let regColors =  ReactDOM.findDOMNode(document.getElementById('colors-bar'));
    const name = regColors.childNodes[0].childNodes[1].childNodes[0].value;

    const newColor = {name: name, notes: "", value: c.hex, obj: <Color key={key} addClass="" val={c.hex}/>};
    regColors.childNodes[0].childNodes[1].childNodes[0].value = "";
    current.colors.splice(1, 0, newColor);
    if(!current.occupied){
      current.occupied = true;
      this.bloatGroup('g');
      const gInc = this.state.totalGroups + 1;
      this.setState({totalGroups: gInc});
    }
    current.keyCount = key;
    current.currentColor = 1;
    groups[this.state.currentGroup] = current;
    this.setState({colorGroups: groups});
    const cInc = this.state.totalColors + 1;
    this.setState({totalColors: cInc});
    regColors = ReactDOM.findDOMNode(document.getElementById('colors-bar'));
    for(let i = 0; i < regColors.childNodes.length; i += 1){
      regColors.childNodes[i].classList.remove('active');
    }
    this.colorListener();
    regColors.childNodes[1].classList.add('active');
    regColors.childNodes[1].childNodes[1].childNodes[0].value = name;
  }

  updateColor = (c) => {
    let groups = this.state.colorGroups;
    let current = groups[this.state.currentGroup];
    const key = current.keyCount + 1;
    const name = ReactDOM.findDOMNode(document.getElementById('colors-bar')).childNodes[current.currentColor].childNodes[1].childNodes[0].value;
    const newColor = {name: name, notes: "", value: c.hex, obj: <Color key={key} addClass="active" val={c.hex} dis={c.hex}/>};
    current.colors.splice(current.currentColor, 1, newColor);
    current.occupied = true;
    current.keyCount = key;
    groups[this.state.currentGroup] = current;
    this.updateColorInfo(current.currentColor);
    this.setState({colorGroups: groups});
    ReactDOM.findDOMNode(document.getElementById('colors-bar')).childNodes[current.currentColor].childNodes[1].childNodes[0].value = this.state.colorGroups[this.state.currentGroup].colors[this.state.colorGroups[this.state.currentGroup].currentColor].name;
    this.colorListener();
  }

  removeColor = () => {
    if(this.state.colorGroups[this.state.currentGroup].currentColor === 0){return;}
    this.scrollColor({deltaY: -1, isTrusted: false})

    let groups = this.state.colorGroups;
    const currentG = this.state.currentGroup;
    let remC = groups[currentG].currentColor + 1;

    groups[currentG].colors.splice(remC, 1);
    const totalColors = this.state.totalColors - 1
    let totalGroups = this.state.totalGroups;
    if(groups[currentG].colors.length === 1){
      groups[currentG].occupied = false;
      this.bloatGroup('e');
      totalGroups -= 1;
    }
    this.setState({totalColors: totalColors, totalGroups: totalGroups, colorGroups: groups});
    window.setTimeout(
      () => {this.colorListener()},
      1
    );
  }

  updateColorInfo = (idx) => {
    if(idx === 0){return;}
    let groups = this.state.colorGroups;
    let current = this.state.currentGroup;
    const name = ReactDOM.findDOMNode(document.getElementById('colors-bar')).childNodes[idx].childNodes[1].childNodes[0].value;
    groups[current].colors[idx].name = name;
    const notes = ReactDOM.findDOMNode(document.getElementById('color-notes')).value;
    groups[current].colors[idx].notes = notes;
    this.setState({colorGroups: groups});
  }

  displayNotes = () => {
    let notes = ReactDOM.findDOMNode(document.getElementById('color-notes'));
    const CG = this.state.currentGroup;
    notes.value = this.state.colorGroups[CG].colors[this.state.colorGroups[CG].currentColor].notes;
  }

  setCompare = () => {
    const groups = this.state.colorGroups;
    const cGroup = this.state.currentGroup;
    const cColor = groups[cGroup].currentColor;
    const selectedColor = groups[cGroup].colors[cColor].value;

    this.setState({currentCompare: selectedColor});
  }

  paletteString = () => {
    this.updateColorInfo(this.state.colorGroups[this.state.currentGroup].currentColor);
    this.updateGroupName(this.state.currentGroup);

    let name = ReactDOM.findDOMNode(document.getElementById('session')).value;
    if(typeof name !== "undefined"){
      name = name.length > 0 ? name : "My Color Palette";
    }
    else{name = "My Color Palette";}

    let author = ReactDOM.findDOMNode(document.getElementById('author')).value;
    if(typeof author !== "undefined"){
      author = author.length > 0 ? author : "Koii-sama";
    }
    else{author = "Koii-sama";}

    let userStr = name + "{/" + author + "{/";
    const groups = this.state.colorGroups;
    for(let i = 0; i < groups.length; i += 1){
      if(groups[i].colors.length > 1){
        userStr += "{$}" + groups[i].name + "{:}" + groups[i].desc;
        const colors = groups[i].colors;
        for(let j = 1; j < colors.length; j += 1){
          userStr += "{%}" + colors[j].name + "{:}" + colors[j].notes + "{&}" + parseInt(colors[j].value.substring(1), 16).toString(36);
        }
      }
    }
    userStr = userStr.split(' ').join('+');
    return userStr;
  }

  share = () => {
    const data = "#" + this.paletteString();
    this.setState({link: 'https://darientsai.github.io/Koi-color-palette-builder/index.html' + data});
    this.setState({export: 'https://darientsai.github.io/Koi-color-palette-builder/export.html' + data});
    ReactDOM.findDOMNode(document.getElementById('sharePalette')).className = "";
  }

  export = () => {
    const data = "#" + this.paletteString();
    window.open('export.html' + data, '_blank');
  }

  parse = () => {
    let data = window.location.hash.substring(1);
      if(
        data.includes("{/") &&
        data.includes("{$}") &&
        data.includes("{:}") &&
        data.includes("{&}") &&
        data.includes("{%}")
      ){
        let details = data.split("{/");

        const palette = details[0].split("+").join(' ');
        const author = details[1].split("+").join(' ');

        data = details[2].split("{$}");

        ReactDOM.findDOMNode(document.getElementById('session')).value = palette;
        ReactDOM.findDOMNode(document.getElementById('author')).value = author;
        window.location.hash = "";
        window.setTimeout(
          () =>{
                for(let i = 1; i < data.length; i += 1){
                  details = data[i].split("{%}");
                  let gName = details[0].split("{:}")[0].split("+").join(' ');
                  let gDesc = details[0].split("{:}")[1].split("+").join(' ');
                  let cName = "", cNote = "", cVal = "";
                  ReactDOM.findDOMNode(document.getElementById('group-name')).value = gName;
                  ReactDOM.findDOMNode(document.getElementById('group-description')).value = gDesc;
                  this.bloatGroup('g');
                  for(let j = 1; j < details.length; j += 1){
                    let cPartition = details[j].split("{:}");
                    cName = cPartition[0].split("+").join(' ');
                    cPartition = cPartition[1].split("{&}");
                    cNote = cPartition[0].split("+").join(' ');
                    cVal = parseInt(cPartition[1], 36).toString(16);
                    while(cVal.length < 6){cVal = "0" + cVal;}
                    cVal = "#" + cVal;

                    ReactDOM.findDOMNode(document.getElementById('colors-bar')).childNodes[0].childNodes[1].childNodes[0].value = cName;
                    ReactDOM.findDOMNode(document.getElementById('color-notes')).value = cNote;
                    this.addColor({hex: cVal});
                  }
                  this.manualGroupNav(i);
                }
                this.manualGroupNav(0);
          },
          1000
        );

      }
  }
  
}

export default App;