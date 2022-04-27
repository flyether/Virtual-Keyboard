
const VIRTUALKEYBORD = {
   basics: {
       main: null,
       wrapper: null,
       textareaS: null,
       h1: null,
       explanations: null,
       keys: []

   },
   internals: {
       value: "",
       capsLock: false
   },
   Handlers: {
      input: null,
      onclose: null
  },


   starting() {
      // создаем оосновную оболочку клавы и техтареа для ввода
       this.basics.h1= document.createElement("h1");
       this.basics.main = document.createElement("div");
      
       this.basics.explanations = document.createElement("div");
       this.basics.textareaS = document.createElement("textarea");
       this.basics.wrapper = document.createElement("div");

      
       // стилей чутка
       this.basics.main.style.height = '900px';
       this.basics.main.style.width = '900px';
       this.basics.main.style.backgroundColor = "rgb(181 231 211)";
       this.basics.main.style.margin = 'auto';
       
       this.basics.h1.style.color = "red";
       this.basics.h1.innerHTML = "RSS Виртуальная клавиатура";
       this.basics.explanations.innerHTML = "Клавиатура создана в операционной системе Windows Для переключения языка комбинация: левыe ctrl и alt";



       this.basics.wrapper.classList.add("keyboard__keys");
       this.basics.wrapper.style.backgroundColor = "#31678990";
      //  добавится функция сосздающая клавишы
       this.basics.wrapper.appendChild(this._createKeys());

       //оформим техтареа
       this.basics.textareaS.classList.add("use-keyboard-input");
       this.basics.textareaS.style.backgroundColor = "#300060";
       this.basics.textareaS.style.width = '300px';
       this.basics.textareaS.style.height = '250px';
       this.basics.textareaS.style.margin = '20px auto 20px 300px';
       this.basics.textareaS.style.color= '#ffff';


       this.basics.keys = this.basics.wrapper.querySelectorAll(".keyboard__key");

       // добовляем в дом 
       this.basics.main.appendChild(this.basics.wrapper);
       this.basics.main.appendChild( this.basics.textareaS )
       this.basics.main.appendChild( this.basics.explanations )
       this.basics.main.appendChild( this.basics.h1)

       document.body.appendChild(this.basics.main);
     




       // функция для вводатекста при фокусе текстареа

       document.querySelectorAll(".use-keyboard-input").forEach(element => {
           element.addEventListener("focus", () => {
               this.open(element.value, currentValue => {
                   element.value = currentValue;
               });
           });
       });
   },
  
     
  // создаем клавишы
   _createKeys() {
       const fragment = document.createDocumentFragment();
       let keyLayout = [
          "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace", "delete",
          "tab","q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
           "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter", 
           "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
           "ctrl", "space", "alt", "CL"
       ];
       let keyRussian = [
         "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace", "delete",
         "tab","й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
          "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э" ,"enter", 
          "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", " ю", ".", "?",
          "ctrl", "space", "alt"
      ];

       // создаем клавиши в html
       const createIconHTML = (icon_name) => {
           return `<i class="icons">${icon_name}</i>`;
       };
      
       
       keyLayout.forEach(key => {
           const keyElement = document.createElement("button");
           // перенос на другую строку
           const insertLineBreak = ["delete", "p", "enter", "?"].indexOf(key) !== -1;

           // добавляем атрибуты и классы
           keyElement.setAttribute("type", "button");
           keyElement.classList.add("keyboard__key");
           keyElement.style.backgroundColor= "#CDDC39";
           keyElement.style.fontSize = "30px";
           keyElement.style.textAlign = "center";
           keyElement.style.borderRadius = "6px" 

           switch (key) {

               case "backspace":
                   keyElement.classList.add("keyboard__key--wide");
                   keyElement.innerHTML = createIconHTML("backspace");

                   keyElement.addEventListener("click", () => {
                       this.internals.value = this.internals.value.substring(0, this.internals.value.length - 1);
                       this._triggerEvent("input");
                   });

                   break;
                   case "tab":
                     keyElement.classList.add("keyboard__key--wide");
                     keyElement.innerHTML = createIconHTML("tab");
  
                     
  
                     break;
                     case "delete":
                        keyElement.classList.add("keyboard__key--wide");
                        keyElement.innerHTML = createIconHTML("delete");
     
                        
     
                        break;
                        case "ctrl":
                           keyElement.classList.add("keyboard__key--wide");
                           keyElement.innerHTML = createIconHTML("ctrl");
        
                           
        
                           break;
                           case "CL":
                            keyElement.classList.add("keyboard__key--wide");
                            keyElement.innerHTML = createIconHTML("Cange Language");
         
                            keyElement.addEventListener("click", () => {
                               keyLayout = keyRussian; 
                                
                            });
                            break;

               case "caps":
                   keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                   keyElement.innerHTML = createIconHTML("Caps Lock");

                   keyElement.addEventListener("click", () => {
                       this._toggleCapsLock();
                       keyElement.classList.toggle("keyboard__key--active", this.internals.capsLock);
                   });

                   break;

               case "enter":
                   keyElement.classList.add("keyboard__key--wide");
                   keyElement.innerHTML = createIconHTML("Enter");

                   keyElement.addEventListener("click", () => {
                       this.internals.value += "\n";
                       this._triggerEvent("input");
                   });

                   break;

               case "space":
                   keyElement.classList.add("keyboard__key--extra-wide");
                   keyElement.innerHTML = createIconHTML("space");

                   keyElement.addEventListener("click", () => {
                       this.internals.value += " ";
                       this._triggerEvent("input");
                   });

                   break;

               case "shift":
                   keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                   keyElement.innerHTML = createIconHTML("shift");

                   keyElement.addEventListener("click", () => {
                       this.close();
                       this._triggerEvent("onclose");
                   });

                   break;

               default:
                   keyElement.textContent = key.toLowerCase();
                   keyElement.style.width = '50px';
                   keyElement.addEventListener("click", () => {
                       this.internals.value += this.internals.capsLock ? key.toUpperCase() : key.toLowerCase();
                       this._triggerEvent("input");

                   });

                   break;
           }

           fragment.appendChild(keyElement);

           if (insertLineBreak) {
               fragment.appendChild(document.createElement("br"));
           }
       });

       return fragment;
   },

   _triggerEvent(handlerName) {
       if (typeof this.Handlers[handlerName] == "function") {
           this.Handlers[handlerName](this.internals.value);
       }
   },

   _toggleCapsLock() {
       this.internals.capsLock = !this.internals.capsLock;

       for (const key of this.basics.keys) {
           if (key.childElementCount === 0) {
               key.textContent = this.internals.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
           }
       }
   },
   open(initialValue, input, onclose) {
       this.internals.value = initialValue || "";
       this.Handlers.input = input;
       this.Handlers.onclose = onclose;
     
   },

   close() {
       this.internals.value = "";
       this.Handlers.input = input;
       this.Handlers.onclose = onclose;
    
   }
};

window.addEventListener("DOMContentLoaded", function () {
   VIRTUALKEYBORD .starting();
});
