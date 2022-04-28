'use strict';

function hover (e) {
		 
	 e.addEventListener("mouseover", function( event ) {   
		event.target.style.color = "rgb(59 210 171)";
		e.addEventListener("mouseout", function( event ) {   
			event.target.style.color = "rgb(17, 100, 102)";
		 }, false);

	 }, false);
	 
}
function hoverbacgr (e) {
	e.addEventListener("mouseover", function( event ) {   
	  event.target.style.background = "rgb(59 210 171)"
	}, false);

	e.addEventListener("mouseout", function( event ) {   
		event.target.style.background = "#ffcb9a";
	 }, false);
	
}

class Button {

	constructor(kbd,params) {
		this.kbd=kbd;
		this.pressed=false;
		({ch:this.ch,a:this.action,l:this.label,code:this.code}=params);
		this.label=this.label || this.action;

		this.element=document.createElement("button");
		this.element.classList.add('btn');
		this.element.style.color   ="#2c3531" 
		this.element.style.borderRadius  ="4px " 
		this.element.style.background ="#ffcb9a"  
		this.element.style.padding ="10px"
		this.element.style.margin ="3px"
		this.element.style.minWidth ="40px"
		this.element.style.textAlign ="center"
		this.element.style.cursor ="pointer"
		this.element.style.fontSize ="18px"
		this.element.style.fontWeight ="bold"

		hoverbacgr(this.element) 
	
		if (this.action)
			this.element.classList.add('btn-action');
		else if (this.ch && this.ch==" ")
			this.element.classList.add('btn-space');

		this.refresh();
		this.element.addEventListener('mousedown',(e)=>this.keyDown(e));
		this.element.addEventListener('mouseup',(e)=>this.keyUp(e));
	}

	refresh() {
		if (this.ch) {
			this.element.innerHTML=this.chCurr();
		} else {
			this.element.innerHTML=this.label;
		}
		this.element.classList.toggle('btn-pressed',this.pressed);
		if (this.action=="CapsLock")
			this.element.classList.toggle('btn-on',this.kbd.caps);
	}

	chCurr() {
		let c=null;
		if (this.ch) {
			c=this.ch;
			if (this.ch.length>1)
				c=c[this.kbd.lng];
			if (this.kbd.caps)
				c=c.toUpperCase();
		}	
		return c;
	}

	keyDown(e) {
		this.pressed=true;
		let t=this.kbd.dom.textarea;
		if (this.ch) {
			t.setRangeText(this.chCurr(),t.selectionStart,t.selectionEnd,'end');
		}
		else if (this.action=="Enter") {
			t.setRangeText('\r\n',t.selectionStart,t.selectionEnd);
		}
		else if (this.action=="Backspace") {
			if (t.selectionStart!=t.selectionEnd)
				t.setRangeText('');
			else if (t.selectionStart>0)
				t.setRangeText('',t.selectionStart-1,t.selectionStart,'end');
		}
		else if (this.action=="Del") {
			let ss=t.selectionStart;
			// console.log(1,t.selectionStart,ss);
			if (t.selectionStart!=t.selectionEnd)
				t.setRangeText('');
			else
				t.setRangeText('',t.selectionStart,t.selectionStart+1,'start');
			// console.log(2,t.selectionStart,ss);
			t.selectionStart=ss;
			// console.log(3,t.selectionStart,ss);
		}
		else if (this.action=="CapsLock" || this.action=="Shift") {
			this.kbd.changeCaps();
		}
		this.kbd.changeLngCheck()
		this.refresh();
		e.preventDefault();
	}

	keyUp(e) {
		this.pressed=false;
		if (this.action=="Shift") {
			this.kbd.changeCaps();
		}

		this.refresh();
		e.preventDefault();
	}

}

class Keyboard {

	constructor(cfg,state) {
		({lngs:this.lngs,lngSwitch:this.lngSwitch}=cfg);
		({caps:this.caps,lng:this.lng}=state);

		this.dom={
			container:document.createElement("div"),
			textarea:document.createElement("textarea"),
			btns:document.createElement("div"),
		}
		// this.dom.container.classList.add('container');
		this.dom.textarea.classList.add('textarea');
		this.dom.textarea.setAttribute('autofocus',1);
		this.dom.btns.classList.add('btns');


// working on styles
		this.dom.container.style.maxWidth = "800px" 
		this.dom.container.style.padding = "20px"
		this.dom.container.style.margin = "auto"

		this.dom.btns.style.background  ="rgb(17, 100, 102)" 
		this.dom.btns.style.border  ="3px solid black" 
		this.dom.btns.style.borderRadius  ="4px " 
		this.dom.btns.style.padding ="5px 10px"


		this.dom.textarea.style.padding ="5px 10px"
		this.dom.textarea.style.background  ="rgb(209, 232, 226)" 
		this.dom.textarea.style.color   ="rgb(17, 100, 102)" 
		this.dom.textarea.style.display ="block"
		this.dom.textarea.style.width ="100%"
		this.dom.textarea.style.height ="20vh"
		this.dom.textarea.style.borderRadius  ="4px " 
		this.dom.textarea.style.fontSize ="18px"
		this.dom.textarea.style.fontWeight ="bold"


		this.btns={};

		cfg.btns.forEach(r=>{
			let row=document.createElement("div");
			
			row.style.margin = "0 -3px"
			row.style.display = "flex"
			row.style.justifyContent = 'stretch'

			r.forEach(b=>{
				let button=new Button(this,b);
				this.btns[button.code]=button;
				row.appendChild(button.element);
			});
			this.dom.btns.appendChild(row);
		})
		this.dom.container.appendChild(this.dom.textarea);		
		this.dom.container.appendChild(this.dom.btns);

		document.body.appendChild(this.dom.container);

		this.btns['ShiftRight'].element.style.width=(this.btns['ArrowRight'].element.clientWidth+6+this.btns['ControlRight'].element.clientWidth)+"px";
		this.btns['ShiftRight'].element.style.flexGrow=0;
		this.btns['ArrowUp'].element.style.width=this.btns['ArrowDown'].element.clientWidth+"px";
		this.btns['ArrowUp'].element.style.flexGrow=0;

		setTimeout(()=>{this.dom.container.classList.add('visible');},0);

		document.addEventListener('keydown',(e)=>{
			if (this.btns[e.code]) {
				this.btns[e.code].keyDown(e);
				e.preventDefault();				
			}			
			else
				console.warn(e);
		});
		document.addEventListener('keyup',(e)=>{
			if (this.btns[e.code]) {
				this.btns[e.code].keyUp(e);
				e.preventDefault();
			}
			else
				console.warn(e);
		});

	}

	changeCaps() {
		this.caps=!this.caps;
		localStorage.setItem('caps',this.caps);
		this.refreshBtns();
	}

	changeLngCheck() {
		let ch=true;
		this.lngSwitch.forEach(b=>{
			if (!this.btns[b].pressed)
				ch=false;
		})
		if (ch) {
			this.lng++;
			if (this.lng>this.lngs.length-1)
				this.lng=0;;
			localStorage.setItem('lng',this.lng);
			this.refreshBtns();
		}
	}

	refreshBtns() {
		for (let b in this.btns)
			this.btns[b].refresh();
	}

}


const kbCfg={
	btns:[
		[{ch:'`ё',code:'Backquote'},{ch:'1',code:'Digit1'},{ch:'2',code:'Digit2'},{ch:'3',code:'Digit3'},{ch:'4',code:'Digit4'},
			{ch:'5',code:'Digit5'},{ch:'5',code:'Digit5'},{ch:'6',code:'Digit6'},{ch:'7',code:'Digit7'},{ch:'8',code:'Digit8'},
			{ch:'9',code:'Digit9'},{ch:'0',code:'Digit0'},{ch:'-',code:'Minus'},{ch:'=',code:'Equal'},{a:'Backspace',code:'Backspace'},],
		[{a:'Tab',code:'Tab'}, {ch:'qй',code:'KeyQ'}, {ch:'wц',code:'KeyW'}, {ch:'eу',code:'KeyE'}, {ch:'rк',code:'KeyR'},
			{ch:'tе',code:'KeyT'}, {ch:'yн',code:'KeyY'}, {ch:'uг',code:'KeyU'}, {ch:'iш',code:'KeyI'}, {ch:'oщ',code:'KeyO'},
			{ch:'pз',code:'KeyP'}, {ch:'[х',code:'BracketLeft'}, {ch:']ъ',code:'BracketRight'},{ch:'\\',code:'Backslash'}, {a:'Del',code:'Delete'},],
		[{a:'CapsLock',code:'CapsLock'}, {ch:'aф',code:'KeyA'}, {ch:'sы',code:'KeyS'}, {ch:'dв',code:'KeyD'}, {ch:'fа',code:'KeyF'},
			{ch:'gп',code:'KeyG'}, {ch:'hр',code:'KeyH'}, {ch:'jо',code:'KeyJ'}, {ch:'kл',code:'KeyK'}, {ch:'lд',code:'KeyL'},
			{ch:';ж',code:'Semicolon'}, {ch:'\'э',code:'Quote'}, {a:'Enter',code:'Enter'},],
		[{a:'Shift',code:'ShiftLeft'}, {ch:'zя',code:'KeyZ'}, {ch:'xч',code:'KeyX'}, {ch:'cс',code:'KeyC'}, {ch:'vм',code:'KeyV'},
		  {ch:'bи',code:'KeyB'}, {ch:'nт',code:'KeyN'}, {ch:'mь',code:'KeyM'}, {ch:',б',code:'Comma'}, {ch:'.ю',code:'Period'},
		  {ch:'/.',code:'Slash'}, {a:'Up',l:'▲',code:'ArrowUp'}, {a:'Shift',code:'ShiftRight'},],
		[{a:'Ctrl',code:'ControlLeft'} ,{a:'Win',code:'OSLeft'}, {a:'Alt',code:'AltLeft'}, {ch:' ',code:'Space'}, {a:'Alt',code:'AltRight'},
			{a:'Left',l:'◄',code:'ArrowLeft'},{a:'Down',l:'▼',code:'ArrowDown'},{a:'Right',l:'►',code:'ArrowRight'},{a:'Ctrl',code:'ControlRight'}, ]
	],
	lngs:['en','ru'],
	lngSwitch:['ControlLeft','AltLeft'],
};

let state={
	caps:(localStorage.getItem('caps')=== 'true')||false,
	lng:parseInt(localStorage.getItem('lng'))||0,
};

const keyboard=new Keyboard(kbCfg,state);
let h1= document.createElement("h1");
h1.style.color = "rgb(17, 100, 102)";
h1.innerHTML = "RSS Виртуальная клавиатура";
h1.style.textAlign="center";

let p=document.createElement('p');
p.innerHTML='Клавиатура создана в операционной системе Windows<br>Для переключения языка комбинация: левыe ctrl и alt';
p.style.textAlign="center";
p.style.color = "rgb(17, 100, 102)";
keyboard.dom.container.appendChild(h1);
keyboard.dom.container.appendChild(p);

// document.h1[0].insertRule('h1:hover{color:red}', 0); 
var test = document.getElementById("test");
  
  
hover (h1) 