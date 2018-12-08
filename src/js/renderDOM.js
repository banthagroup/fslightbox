module.exports = function (self, DOMObject) {
    let privateMethods = {

        renderNav: function (container) {
            self.data.nav = new DOMObject('div').addClassesAndCreate(['fslightbox-nav']);
            self.toolbar.renderToolbar(self.data.nav);

            if (self.data.slideCounter === true) {
                new self.slideCounterElem().renderSlideCounter(self.data.nav);
            }

            container.appendChild(self.data.nav);

        },

        createBTN: function(buttonContainer, container, d) {
            let btn = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn', 'button-style']);
            btn.appendChild(
                new self.SVGIcon().getSVGIcon('0 0 20 20', '1em', d)
            );
            buttonContainer.appendChild(btn);
            container.appendChild(buttonContainer);
        },

        renderSlideButtons: function (container) {
            if (self.data.slideButtons === false) {
                return false;
            }
            //render left btn
            let left_btn_container = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn-container','fslightbox-slide-btn-left-container']);
            this.createBTN(left_btn_container, container, 'M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z');

            //go to previous slide onclick
            left_btn_container.onclick = function () {
                self.appendMethods.previousSlideViaButton(self,self.data.slide);
            };

            let right_btn_container = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn-container', 'fslightbox-slide-btn-right-container']);
            this.createBTN(right_btn_container, container, 'M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z');
            // go to next slide on click
            right_btn_container.onclick = function () {
                self.appendMethods.nextSlideViaButton(self,self.data.slide);
            };
        }
    };

    //disable scrolling and add fix for jumping site if not mobile
    self.scrollbar.showScrollbar();
    self.element.id = "fslightbox-container";
    document.body.appendChild(self.element);

    //render slide buttons and nav(toolbar)
    privateMethods.renderNav(self.element);

    if(self.data.total_slides > 1) {
        privateMethods.renderSlideButtons(self.element);
    }

    self.data.mediaHolder = new self.mediaHolder();
    self.data.mediaHolder.renderHolder(self.element);
    self.element.classList.add(['fslightbox-fade-in-animation']);
    self.data.isfirstTimeLoad = true;
};