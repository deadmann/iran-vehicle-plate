var IranLicensePlate=function(){"use strict";var e=".iran-license-plate{background-color:#ddd;border:.08em solid #333;border-radius:.2em;box-shadow:inset .05em .05em .1em rgba(0,0,0,.3),inset -.05em -.05em .1em #fff,.05em .05em .1em rgba(0,0,0,.3);color:#282f25;display:inline-block;font-family:Markazi Text;height:1.2em;line-height:1.1em;margin:0 auto;min-width:6.8em;text-align:center}.iran-license-plate>.blue-column{background-color:#042591;float:left;height:inherit;position:relative;width:.7em}.iran-license-plate>.blue-column>.flag{margin:.1em}.iran-license-plate>.blue-column>.flag :first-child{background-color:green;height:.1em}.iran-license-plate>.blue-column>.flag :nth-child(2){background-color:#fff;height:.1em}.iran-license-plate>.blue-column>.flag :nth-child(3){background-color:red;height:.1em}.iran-license-plate>.blue-column>.text{bottom:.5em;color:#fff;font-family:sans-serif;font-size:.2em;left:.5em;line-height:1em;position:absolute;text-align:left}.iran-license-plate>span{display:inline-block;float:left;font-size:1.3em;margin:0 .1em;padding:.05em;text-shadow:.02em .02em .03em rgba(0,0,0,.3),-.03em -.03em .02em #fff}.iran-license-plate>.alphabet-column{line-height:.5em;margin:0}.iran-license-plate>.iran-column{border-left:.08em solid #333;float:right;height:inherit;text-align:center;width:1.2em}.iran-license-plate>.iran-column>span{display:block;font-size:.3em;line-height:1em}.iran-license-plate>.iran-column>strong{font-size:1.1em;font-weight:400;line-height:.9em;text-shadow:.03em .03em .03em rgba(0,0,0,.3),-.04em -.04em .02em #fff}";!function(e,t){void 0===t&&(t={});var i=t.insertAt;if(e&&"undefined"!=typeof document){var n=document.head||document.getElementsByTagName("head")[0],l=document.createElement("style");l.type="text/css","top"===i&&n.firstChild?n.insertBefore(l,n.firstChild):n.appendChild(l),l.styleSheet?l.styleSheet.cssText=e:l.appendChild(document.createTextNode(e))}}(e);class t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._originalWidth=null,this._originalHeight=null}connectedCallback(){this.render(),setTimeout((()=>{const e=this.shadowRoot.querySelector(".plate");if(!this._originalWidth||!this._originalHeight){const t=e.getBoundingClientRect();this._originalWidth=t.width,this._originalHeight=t.height,console.log("Original dimensions:",this._originalWidth,this._originalHeight)}const t=this.getAttribute("width"),i=this.getAttribute("height"),n=t?parseFloat(t):null,l=i?parseFloat(i):null;(n||l)&&this.scaleToFit(n,l)}),0)}static get observedAttributes(){return["width","height"]}attributeChangedCallback(e,t,i){if(this._originalWidth&&this._originalHeight){const e=this.getAttribute("width")?parseFloat(this.getAttribute("width")):null,t=this.getAttribute("height")?parseFloat(this.getAttribute("height")):null;this.scaleToFit(e,t)}}render(){this.shadowRoot.innerHTML=`\n      <style>\n        ${e}\n      </style>\n      <div class="plate">\n        <div class="iran-license-plate">\r\n    <div class="blue-column">\r\n        <div class="flag">\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n        </div>\r\n        <div class="text">\r\n            <div>I.R.</div>\r\n            <div>IRAN</div>\r\n        </div>\r\n    </div>\r\n\r\n    <span>\r\n      ۲۶\r\n    </span>\r\n    <span class="alphabet-column">\r\n      ی\r\n    </span>\r\n    <span>\r\n      ۸۳۷\r\n    </span>\r\n    <div class="iran-column">\r\n        <span>ایــران</span>\r\n        <strong>۲۰</strong>\r\n    </div>\r\n</div>\n      </div>\n    `}calculateScaleFactor(e,t){const i=this._originalWidth,n=this._originalHeight;let l;if(e&&t){const a=e/i,s=t/n;l=Math.min(a,s)}else l=e?e/i:t?t/n:1;return l}applyScaling(e){const t=this.shadowRoot.querySelector(".plate");t.style.transform=`scale(${e})`,t.style.transformOrigin="top left";const i=this._originalWidth*e,n=this._originalHeight*e;this.style.display="inline-block",this.style.width=`${i}px`,this.style.height=`${n}px`}scaleToFit(e,t){const i=this.calculateScaleFactor(e,t);this.applyScaling(i)}}return customElements.define("iran-license-plate",t),t}();
//# sourceMappingURL=iran-license-plate.js.map
