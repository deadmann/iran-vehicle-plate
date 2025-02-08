import templateHTML from './templates/iran-vehicle-plate.html'; // Mark it as raw text
import templateCss from './css/iran-vehicle-plate.css'; // No need to import as a string; Rollup will handle it.

class IranVehiclePlate extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Variables to store the original dimensions.
        this._originalWidth = null;
        this._originalHeight = null;
    }

    // noinspection JSUnusedGlobalSymbols
    connectedCallback() {
        // Perform initial setup when the element is added to the DOM
        this.render();

        // Wait briefly to ensure the content is rendered and measured.
        setTimeout(() => {
            const plateElement = this.shadowRoot.querySelector('.plate');
            // If not already stored, record the original dimensions.
            if (!this._originalWidth || !this._originalHeight) {
                const rect = plateElement.getBoundingClientRect();
                this._originalWidth = rect.width;
                this._originalHeight = rect.height;
                console.log('Original dimensions:', this._originalWidth, this._originalHeight);
            }
            // Read user-specified width and height attributes (in pixels).
            const desiredWidthAttr = this.getAttribute('width');
            const desiredHeightAttr = this.getAttribute('height');
            const desiredWidth = desiredWidthAttr ? parseFloat(desiredWidthAttr) : null;
            const desiredHeight = desiredHeightAttr ? parseFloat(desiredHeightAttr) : null;

            if (desiredWidth || desiredHeight) {
                this.scaleToFit(desiredWidth, desiredHeight);
            }

            this.setContent()
        }, 0);
    }

    // noinspection JSUnusedGlobalSymbols
    static get observedAttributes() {
        return ['width', 'height', 'left-part', 'alphabet-part', 'right-part', 'code-part'];
    }

    // noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
    attributeChangedCallback(name, oldValue, newValue) {
        // When attributes change, re-scale using the stored original dimensions.
        if (this._originalWidth && this._originalHeight) {
            const desiredWidth = this.getAttribute('width') ? parseFloat(this.getAttribute('width')) : null;
            const desiredHeight = this.getAttribute('height') ? parseFloat(this.getAttribute('height')) : null;
            this.scaleToFit(desiredWidth, desiredHeight);
        }

        this.setContent();
    }

    render() {
        // Render the content into the shadow DOM.
        this.shadowRoot.innerHTML = `
      <style>
        ${templateCss}
      </style>
      <div class="plate">
        ${templateHTML}
      </div>
    `;
    }

    calculateScaleFactor(desiredWidth, desiredHeight) {
        // Use the original dimensions stored after initial rendering.
        const originalWidth = this._originalWidth;
        const originalHeight = this._originalHeight;

        let scaleFactor;
        if (desiredWidth && desiredHeight) {
            const scaleW = desiredWidth / originalWidth;
            const scaleH = desiredHeight / originalHeight;
            scaleFactor = Math.min(scaleW, scaleH);
        } else if (desiredWidth) {
            scaleFactor = desiredWidth / originalWidth;
        } else if (desiredHeight) {
            scaleFactor = desiredHeight / originalHeight;
        } else {
            scaleFactor = 1;
        }
        return scaleFactor;
    }

    applyScaling(scaleFactor) {
        const plateElement = this.shadowRoot.querySelector('.plate');
        // Apply the scale transformation.
        plateElement.style.transform = `scale(${scaleFactor})`;
        plateElement.style.transformOrigin = 'top left';

        // Update the host element’s size so that it occupies the correct space.
        const scaledWidth = this._originalWidth * scaleFactor;
        const scaledHeight = this._originalHeight * scaleFactor;
        this.style.display = 'inline-block';
        this.style.width = `${scaledWidth}px`;
        this.style.height = `${scaledHeight}px`;
    }

    scaleToFit(desiredWidth, desiredHeight) {
        const scaleFactor = this.calculateScaleFactor(desiredWidth, desiredHeight);
        this.applyScaling(scaleFactor);
    }

    setContent() {
        // SET CONTENT
        const plateElem = this.shadowRoot.querySelector('.plate');
        if(plateElem == null)
            return;

        const leftDataElem = plateElem.querySelector('.left-data');
        const alphabetElem = plateElem.querySelector('.alphabet-data');
        const rightElem = plateElem.querySelector('.right-data');
        const codeElem = plateElem.querySelector('.code-data');

        const leftPartData = this.getAttribute('left-part')
        const alphabetPartData = this.getAttribute('alphabet-part')
        const rightPartData = this.getAttribute('right-part')
        const codePartData = this.getAttribute('code-part')

        leftDataElem.textContent = this.convertNumberToPersian(leftPartData);
        alphabetElem.textContent = this.convertNumberToPersian(alphabetPartData);
        rightElem.textContent = this.convertNumberToPersian(rightPartData);
        codeElem.textContent = this.convertNumberToPersian(codePartData);
    }

    convertNumberToPersian(num) {
        if(num == undefined || num == null)
            return '';

        const persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
        return num.toString().replace(/\d/g, digit => persianDigits[digit]);
    }
}
customElements.define('iran-vehicle-plate', IranVehiclePlate);

export default IranVehiclePlate;