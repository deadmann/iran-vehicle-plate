import templateHTML from './templates/iran-license-plate.html'; // Mark it as raw text
import templateCss from './css/iran-license-plate.css'; // No need to import as a string; Rollup will handle it.

class IranLicensePlate extends HTMLElement {
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
        }, 0);
    }

    static get observedAttributes() {
        return ['width', 'height'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // When attributes change, re-scale using the stored original dimensions.
        if (this._originalWidth && this._originalHeight) {
            const desiredWidth = this.getAttribute('width') ? parseFloat(this.getAttribute('width')) : null;
            const desiredHeight = this.getAttribute('height') ? parseFloat(this.getAttribute('height')) : null;
            this.scaleToFit(desiredWidth, desiredHeight);
        }
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
}
customElements.define('iran-license-plate', IranLicensePlate);

export default IranLicensePlate;