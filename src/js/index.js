"use strict";

/**
 * @constructor
 */
function fsLightboxObject() {

    this.data = {
        running: false,
        slide: 1,
        total_slides: 1,
        renderSlideButtons: true,
    };

    /**
     * @type {fsLightboxObject}
     */
    let self = this;


    this.init = function () {
        this.renderDOM();
    };


    this.clear = function () {
        document.getElementById('fslightbox-container').remove();
    };

    /**
     * Generate dom element with classes
     * @constructor
     */
    function DOMObject(tag) {
        this.elem = document.createElement(tag);

        this.addClassesAndCreate = function (classes) {
            for (let index in classes) {
                this.elem.classList.add(classes[index]);
            }
            return this.elem
        }
    }

    /**
     * SVGIcon object
     * @returns {Element}
     * @constructor
     */
    this.SVGIcon = function () {
        this.svg = document.createElementNS('http://www.w3.org/2000/svg',"svg");
        this.path = document.createElementNS('http://www.w3.org/2000/svg',"path");
        this.svg.setAttributeNS(null, 'class', 'fslightbox-svg-icon');
        this.svg.setAttributeNS(null, 'viewBox', '0 0 20 20');

        this.getSVGIcon = function (d) {
            this.path.setAttributeNS(null, 'd', d);
            this.svg.appendChild(this.path);
            return this.svg;
        }
    };

    this.renderDOM = function () {

        let privateMethods = {
            renderNav: function (container) {
                let nav = new DOMObject('div').addClassesAndCreate(['fslightbox-nav']);
                container.appendChild(nav);
                createSlideNumber(nav);
                createToolbar(nav);
            },
            renderSlideButtons: function (container) {
                if(self.data.renderSlideButtons === false) {
                    return false;
                }

                //render left btn
                let left_btn_container = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn-container']);
                let btn = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn', 'button-style']);
                btn.appendChild(
                    new self.SVGIcon().getSVGIcon('M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z')
                );
                left_btn_container.appendChild(btn);
                container.appendChild(left_btn_container);

                //render right btn
                let right_btn_container = createElem('div', ['fslightbox-slide-btn-container', 'fslightbox-slide-btn-right-container']);
                btn = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn', 'button-style']);
                btn.appendChild(
                    new self.SVGIcon().getSVGIcon('M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z')
                );
                right_btn_container.appendChild(btn);
                container.appendChild(right_btn_container);

            }
        };


        //disable scrolling
        document.body.classList.add('fslightbox-open');

        //create container
        let container = new DOMObject('div').addClassesAndCreate(['fslightbox-container']);
        container.id = "fslightbox-container";
        document.body.appendChild(container);

        //render slide buttons and nav(toolbar)
        privateMethods.renderSlideButtons(container);
        privateMethods.renderNav(container);


        //create media holder
        let media_holder = createElem('div', ['fslightbox-media-holder']);
        media_holder.style.height = window.innerHeight + 'px';
        window.onresize = function () {
            media_holder.style.height = window.innerHeight + 'px';
        };
        container.appendChild(media_holder);

        let image = createElem('img', ['fslightbox-single-source']);
        image.src = 'images/4.jpeg';
        media_holder.appendChild(image);
    };
}

let fsLightbox = new fsLightboxObject();
!function () {
    //fsLightbox.init();
}(document, window);
