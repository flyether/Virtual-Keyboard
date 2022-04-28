
// const VIRTUALKEYBORD = {
//    basics: {
//        main: null,
//        wrapper: null,
//        textareaS: null,
//        h1: null,
//        explanations: null,
//        keys: []

//    },
//    internals: {
//        value: "",
//        capsLock: false,
//        changeLan:false,
//    },
//    Handlers: {
//       input: null,
//       onclose: null
//   },


//    starting() {
//       // создаем оосновную оболочку клавы и техтареа для ввода
//        this.basics.h1= document.createElement("h1");
//        this.basics.main = document.createElement("div");
      
//        this.basics.explanations = document.createElement("div");
//        this.basics.textareaS = document.createElement("textarea");
//        this.basics.wrapper = document.createElement("div");

      
//        // стилей чутка
//        this.basics.main.style.height = '900px';
//        this.basics.main.style.width = '900px';
//        this.basics.main.style.backgroundColor = "rgb(181 231 211)";
//        this.basics.main.style.margin = 'auto';
       
//        this.basics.h1.style.color = "red";
//        this.basics.h1.innerHTML = "RSS Виртуальная клавиатура";
//        this.basics.explanations.innerHTML = "Клавиатура создана в операционной системе Windows Для переключения языка комбинация: левыe ctrl и alt";



//        this.basics.wrapper.classList.add("keyboard__keys");
//        this.basics.wrapper.style.backgroundColor = "#31678990";
//       //  добавится функция сосздающая клавишы
//        this.basics.wrapper.appendChild(this._createKeys());

//        //оформим техтареа
//        this.basics.textareaS.classList.add("use-keyboard-input");
//        this.basics.textareaS.style.backgroundColor = "#300060";
//        this.basics.textareaS.style.width = '300px';
//        this.basics.textareaS.style.height = '250px';
//        this.basics.textareaS.style.margin = '20px auto 20px 300px';
//        this.basics.textareaS.style.color= '#ffff';


//        this.basics.keys = this.basics.wrapper.querySelectorAll(".keyboard__key");

//        // добовляем в дом 
//        this.basics.main.appendChild(this.basics.wrapper);
//        this.basics.main.appendChild( this.basics.textareaS )
//        this.basics.main.appendChild( this.basics.explanations )
//        this.basics.main.appendChild( this.basics.h1)

//        document.body.appendChild(this.basics.main);
     




//        // функция для вводатекста при фокусе текстареа

//        document.querySelectorAll(".use-keyboard-input").forEach(element => {
//            element.addEventListener("focus", () => {
//                this.open(element.value, currentValue => {
//                    element.value = currentValue;
//                });
//            });
//        });
//    },
  
     
//   // создаем клавишы
//    _createKeys() {
//        const fragment = document.createDocumentFragment();
//        var keyLayout = [
//           "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace", "delete",
//           "tab","q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
//            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter", 
//            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
//            "ctrl", "space", "alt", "CL"
//        ];
//     //    var keyRussian = [
//     //      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace", "delete",
//     //      "tab","й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
//     //       "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э" ,"enter", 
//     //       "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", " ю", ".", "?",
//     //       "ctrl", "space", "alt"
//     //   ];

//        // создаем клавиши в html
//        const createIconHTML = (icon_name) => {
//            return `<i class="icons">${icon_name}</i>`;
//        };
      
       
//        keyLayout.forEach(key => {
//            const keyElement = document.createElement("button");
//            // перенос на другую строку
//            const insertLineBreak = ["delete", "p", "enter", "?"].indexOf(key) !== -1;

//            // добавляем атрибуты и классы
//            keyElement.setAttribute("type", "button");
//            keyElement.classList.add("keyboard__key");
//            keyElement.style.backgroundColor= "#CDDC39";
//            keyElement.style.fontSize = "30px";
//            keyElement.style.textAlign = "center";
//            keyElement.style.borderRadius = "6px" 
       

//            switch (key) {

//                case "backspace":
//                    keyElement.classList.add("keyboard__key--wide");
//                    keyElement.innerHTML = createIconHTML("backspace");

//                    keyElement.addEventListener("click", () => {
//                        this.internals.value = this.internals.value.substring(0, this.internals.value.length - 1);
//                        this._triggerEvent("input");
//                    });

//                    break;
//                    case "tab":
//                      keyElement.classList.add("keyboard__key--wide");
//                      keyElement.innerHTML = createIconHTML("tab");
  
                     
  
//                      break;
//                      case "delete":
//                         keyElement.classList.add("keyboard__key--wide");
//                         keyElement.innerHTML = createIconHTML("delete");
//                         keyElement.addEventListener("click", () => {
//                             this.internals.value = this.internals.value.substring(0, this.internals.value.length + 1);
//                             this._triggerEvent("input");
//                         });
                        
     
//                         break;
//                         case "ctrl":
//                            keyElement.classList.add("keyboard__key--wide");
//                            keyElement.innerHTML = createIconHTML("ctrl");
        
                           
        
//                            break;
//                            case "CL":
//                             keyElement.classList.add("keyboard__key--wide");
//                             keyElement.innerHTML = createIconHTML("Change Language");

//                             // keyElement.addEventListener("click", () => {
//                             //     this._changeLanguage();
//                             //     keyElement.classList.toggle("keyboard__key--active", this.internals.changeLan);
//                             // });
         
                            
//                             break;

//                case "caps":
//                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
//                    keyElement.innerHTML = createIconHTML("Caps Lock");
//                    keyElement.addEventListener("click", () => {
//                        this._toggleCapsLock();
//                        keyElement.classList.toggle("keyboard__key--active", this.internals.capsLock);
//                    });
//                    break;

//                case "enter":
//                    keyElement.classList.add("keyboard__key--wide");
//                    keyElement.innerHTML = createIconHTML("Enter");
//                    keyElement.addEventListener("click", () => {
//                        this.internals.value += "\n";
//                        this._triggerEvent("input");
//                    });

//                    break;

//                case "space":
//                    keyElement.classList.add("keyboard__key--extra-wide");
//                    keyElement.innerHTML = createIconHTML("space");

//                    keyElement.addEventListener("click", () => {
//                        this.internals.value += " ";
//                        this._triggerEvent("input");
//                    });

//                    break;

//                case "shift":
//                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
//                    keyElement.innerHTML = createIconHTML("shift");

//                    keyElement.addEventListener("click", () => {
//                        this.close();
//                        this._triggerEvent("onclose");
//                    });

//                    break;

//                default:
//                    keyElement.textContent = key.toLowerCase();
//                    keyElement.style.width = '50px';
//                    keyElement.addEventListener("click", () => {
//                        this.internals.value += this.internals.capsLock ? key.toUpperCase() : key.toLowerCase();
//                        this._triggerEvent("input");

//                    });

//                    break;
//            }

//            fragment.appendChild(keyElement);

//            if (insertLineBreak) {
//                fragment.appendChild(document.createElement("br"));
//            }
//        });

//        return fragment;
//    },

//    _triggerEvent(handlerName) {
//        if (typeof this.Handlers[handlerName] == "function") {
//            this.Handlers[handlerName](this.internals.value);
//        }
//    },

//    _toggleCapsLock() {
//        this.internals.capsLock = !this.internals.capsLock;

//        for (const key of this.basics.keys) {
//            if (key.childElementCount === 0) {
//                key.textContent = this.internals.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
//            }
//        }
//    },

   
// //    _changeLanguage() {

// //     this.internals.changeLan = !this.internals.changeLan;
// //      var keyRussian = [
// //             "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace", "delete",
// //             "tab","й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
// //              "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э" ,"enter", 
// //              "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", " ю", ".", "?",
// //              "ctrl", "space", "alt"
// //          ];
   
// //     for (const key of this.basics.keys) {
       
// //         if (key.childElementCount === 0) {
// //             key.textContent = this.internals.changeLan ? (keyLayout = keyRussian) : (keyLayout = keyLayout) ;
// //         }
// //     }

// //    },

//    open(initialValue, input, onclose) {
//        this.internals.value = initialValue || "";
//        this.Handlers.input = input;
//        this.Handlers.onclose = onclose;
     
//    },

//    close() {
//        this.internals.value = "";
//        this.Handlers.input = input;
//        this.Handlers.onclose = onclose;
    
//    }
// };

// window.addEventListener("DOMContentLoaded", function () {
//    VIRTUALKEYBORD .starting();
// });


'use strict';

class Button {

	constructor(kbd,params) {
		this.kbd=kbd;
		this.pressed=false;
		({ch:this.ch,a:this.action,l:this.label,code:this.code}=params);
		this.label=this.label || this.action;

		this.element=document.createElement("button");
		this.element.classList.add('btn');
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
		this.dom.container.classList.add('container');
		this.dom.textarea.classList.add('textarea');
		this.dom.textarea.setAttribute('autofocus',1);
		this.dom.btns.classList.add('btns');

		this.btns={};

		cfg.btns.forEach(r=>{
			let row=document.createElement("div");
			row.classList.add('btns-row');
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

let p=document.createElement('p');
p.innerHTML='Клавиатура создана в операционной системе Windows<br>Для переключения языка комбинация: левыe ctrl и alt';
p.style.textAlign="center";
keyboard.dom.container.appendChild(p);


