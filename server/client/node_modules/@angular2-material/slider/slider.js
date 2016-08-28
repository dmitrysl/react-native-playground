"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var field_value_1 = require('@angular2-material/core/annotations/field-value');
var apply_transform_1 = require('@angular2-material/core/style/apply-transform');
var core_2 = require('@angular2-material/core/core');
/**
 * Visually, a 30px separation between tick marks looks best. This is very subjective but it is
 * the default separation we chose.
 */
var MIN_AUTO_TICK_SEPARATION = 30;
var MdSlider = (function () {
    function MdSlider(elementRef) {
        /** A renderer to handle updating the slider's thumb and fill track. */
        this._renderer = null;
        /** The dimensions of the slider. */
        this._sliderDimensions = null;
        this.disabled = false;
        /** The miniumum value that the slider can have. */
        this._min = 0;
        /** The maximum value that the slider can have. */
        this._max = 100;
        /** The percentage of the slider that coincides with the value. */
        this._percent = 0;
        /** The values at which the thumb will snap. */
        this.step = 1;
        /**
         * Whether or not the thumb is sliding.
         * Used to determine if there should be a transition for the thumb and fill track.
         * TODO: internal
         */
        this.isSliding = false;
        /**
         * Whether or not the slider is active (clicked or sliding).
         * Used to shrink and grow the thumb as according to the Material Design spec.
         * TODO: internal
         */
        this.isActive = false;
        /** Indicator for if the value has been set or not. */
        this._isInitialized = false;
        /** Value of the slider. */
        this._value = 0;
        this._renderer = new SliderRenderer(elementRef);
    }
    Object.defineProperty(MdSlider.prototype, "min", {
        get: function () {
            return this._min;
        },
        set: function (v) {
            // This has to be forced as a number to handle the math later.
            this._min = Number(v);
            // If the value wasn't explicitly set by the user, set it to the min.
            if (!this._isInitialized) {
                this.value = this._min;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "max", {
        get: function () {
            return this._max;
        },
        set: function (v) {
            this._max = Number(v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            this._value = Number(v);
            this._isInitialized = true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Once the slider has rendered, grab the dimensions and update the position of the thumb and
     * fill track.
     * TODO: internal
     */
    MdSlider.prototype.ngAfterContentInit = function () {
        this._sliderDimensions = this._renderer.getSliderDimensions();
        this.snapToValue();
        this._updateTickSeparation();
    };
    /** TODO: internal */
    MdSlider.prototype.onClick = function (event) {
        if (this.disabled) {
            return;
        }
        this.isActive = true;
        this.isSliding = false;
        this._renderer.addFocus();
        this.updateValueFromPosition(event.clientX);
        this.snapToValue();
    };
    /** TODO: internal */
    MdSlider.prototype.onSlide = function (event) {
        if (this.disabled) {
            return;
        }
        // Prevent the slide from selecting anything else.
        event.preventDefault();
        this.updateValueFromPosition(event.center.x);
    };
    /** TODO: internal */
    MdSlider.prototype.onSlideStart = function (event) {
        if (this.disabled) {
            return;
        }
        event.preventDefault();
        this.isSliding = true;
        this.isActive = true;
        this._renderer.addFocus();
        this.updateValueFromPosition(event.center.x);
    };
    /** TODO: internal */
    MdSlider.prototype.onSlideEnd = function () {
        this.isSliding = false;
        this.snapToValue();
    };
    /** TODO: internal */
    MdSlider.prototype.onResize = function () {
        this.isSliding = true;
        this._sliderDimensions = this._renderer.getSliderDimensions();
        // Skip updating the value and position as there is no new placement.
        this._renderer.updateThumbAndFillPosition(this._percent, this._sliderDimensions.width);
    };
    /** TODO: internal */
    MdSlider.prototype.onBlur = function () {
        this.isActive = false;
    };
    /**
     * When the value changes without a physical position, the percentage needs to be recalculated
     * independent of the physical location.
     * This is also used to move the thumb to a snapped value once sliding is done.
     */
    MdSlider.prototype.updatePercentFromValue = function () {
        this._percent = this.calculatePercentage(this.value);
    };
    /**
     * Calculate the new value from the new physical location. The value will always be snapped.
     */
    MdSlider.prototype.updateValueFromPosition = function (pos) {
        var offset = this._sliderDimensions.left;
        var size = this._sliderDimensions.width;
        // The exact value is calculated from the event and used to find the closest snap value.
        this._percent = this.clamp((pos - offset) / size);
        var exactValue = this.calculateValue(this._percent);
        // This calculation finds the closest step by finding the closest whole number divisible by the
        // step relative to the min.
        var closestValue = Math.round((exactValue - this.min) / this.step) * this.step + this.min;
        // The value needs to snap to the min and max.
        this.value = this.clamp(closestValue, this.min, this.max);
        this._renderer.updateThumbAndFillPosition(this._percent, this._sliderDimensions.width);
    };
    /**
     * Snaps the thumb to the current value.
     * Called after a click or drag event is over.
     */
    MdSlider.prototype.snapToValue = function () {
        this.updatePercentFromValue();
        this._renderer.updateThumbAndFillPosition(this._percent, this._sliderDimensions.width);
    };
    /**
     * Calculates the separation in pixels of tick marks. If there is no tick interval or the interval
     * is set to something other than a number or 'auto', nothing happens.
     */
    MdSlider.prototype._updateTickSeparation = function () {
        if (this._tickInterval == 'auto') {
            this._updateAutoTickSeparation();
        }
        else if (Number(this._tickInterval)) {
            this._updateTickSeparationFromInterval();
        }
    };
    /**
     * Calculates the optimal separation in pixels of tick marks based on the minimum auto tick
     * separation constant.
     */
    MdSlider.prototype._updateAutoTickSeparation = function () {
        // We're looking for the multiple of step for which the separation between is greater than the
        // minimum tick separation.
        var sliderWidth = this._sliderDimensions.width;
        // This is the total "width" of the slider in terms of values.
        var valueWidth = this.max - this.min;
        // Calculate how many values exist within 1px on the slider.
        var valuePerPixel = valueWidth / sliderWidth;
        // Calculate how many values exist in the minimum tick separation (px).
        var valuePerSeparation = valuePerPixel * MIN_AUTO_TICK_SEPARATION;
        // Calculate how many steps exist in this separation. This will be the lowest value you can
        // multiply step by to get a separation that is greater than or equal to the minimum tick
        // separation.
        var stepsPerSeparation = Math.ceil(valuePerSeparation / this.step);
        // Get the percentage of the slider for which this tick would be located so we can then draw
        // it on the slider.
        var tickPercentage = this.calculatePercentage((this.step * stepsPerSeparation) + this.min);
        // The pixel value of the tick is the percentage * the width of the slider. Use this to draw
        // the ticks on the slider.
        this._renderer.drawTicks(sliderWidth * tickPercentage);
    };
    /**
     * Calculates the separation of tick marks by finding the pixel value of the tickInterval.
     */
    MdSlider.prototype._updateTickSeparationFromInterval = function () {
        // Force tickInterval to be a number so it can be used in calculations.
        var interval = this._tickInterval;
        // Calculate the first value a tick will be located at by getting the step at which the interval
        // lands and adding that to the min.
        var tickValue = (this.step * interval) + this.min;
        // The percentage of the step on the slider is needed in order to calculate the pixel offset
        // from the beginning of the slider. This offset is the tick separation.
        var tickPercentage = this.calculatePercentage(tickValue);
        this._renderer.drawTicks(this._sliderDimensions.width * tickPercentage);
    };
    /**
     * Calculates the percentage of the slider that a value is.
     */
    MdSlider.prototype.calculatePercentage = function (value) {
        return (value - this.min) / (this.max - this.min);
    };
    /**
     * Calculates the value a percentage of the slider corresponds to.
     */
    MdSlider.prototype.calculateValue = function (percentage) {
        return this.min + (percentage * (this.max - this.min));
    };
    /**
     * Return a number between two numbers.
     */
    MdSlider.prototype.clamp = function (value, min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        return Math.max(min, Math.min(value, max));
    };
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(),
        core_1.HostBinding('class.md-slider-disabled'),
        core_1.HostBinding('attr.aria-disabled'), 
        __metadata('design:type', Boolean)
    ], MdSlider.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MdSlider.prototype, "step", void 0);
    __decorate([
        core_1.Input('tick-interval'), 
        __metadata('design:type', Object)
    ], MdSlider.prototype, "_tickInterval", void 0);
    __decorate([
        core_1.Input(),
        core_1.HostBinding('attr.aria-valuemin'), 
        __metadata('design:type', Object)
    ], MdSlider.prototype, "min", null);
    __decorate([
        core_1.Input(),
        core_1.HostBinding('attr.aria-valuemax'), 
        __metadata('design:type', Object)
    ], MdSlider.prototype, "max", null);
    __decorate([
        core_1.Input(),
        core_1.HostBinding('attr.aria-valuenow'), 
        __metadata('design:type', Object)
    ], MdSlider.prototype, "value", null);
    MdSlider = __decorate([
        core_1.Component({            selector: 'md-slider',
            host: {
                'tabindex': '0',
                '(click)': 'onClick($event)',
                '(slide)': 'onSlide($event)',
                '(slidestart)': 'onSlideStart($event)',
                '(slideend)': 'onSlideEnd()',
                '(window:resize)': 'onResize()',
                '(blur)': 'onBlur()',
            },
            template: "<div class=\"md-slider-wrapper\"> <div class=\"md-slider-container\" [class.md-slider-sliding]=\"isSliding\" [class.md-slider-active]=\"isActive\"> <div class=\"md-slider-track-container\"> <div class=\"md-slider-track\"></div> <div class=\"md-slider-track md-slider-track-fill\"></div> <div class=\"md-slider-tick-container\"></div> <div class=\"md-slider-last-tick-container\"></div> </div> <div class=\"md-slider-thumb-container\"> <div class=\"md-slider-thumb-position\"> <div class=\"md-slider-thumb\"></div> </div> </div> </div> </div> ",
            styles: ["/** * Uses a container height and an item height to center an item vertically within the container. */ /** * Positions the thumb based on its width and height. */ md-slider { height: 20px; min-width: 128px; position: relative; padding: 0; display: inline-block; outline: none; vertical-align: middle; } md-slider *, md-slider *::after { box-sizing: border-box; } /** * Exists in order to pad the slider and keep everything positioned correctly. * Cannot be merged with the .md-slider-container. */ .md-slider-wrapper { width: 100%; height: 100%; padding-left: 8px; padding-right: 8px; } /** * Holds the isActive and isSliding classes as well as helps with positioning the children. * Cannot be merged with .md-slider-wrapper. */ .md-slider-container { position: relative; } .md-slider-track-container { width: 100%; position: absolute; top: 9px; height: 2px; } .md-slider-track { position: absolute; left: 0; right: 0; height: 100%; background-color: rgba(0, 0, 0, 0.26); } .md-slider-track-fill { -webkit-transition-duration: 400ms; transition-duration: 400ms; -webkit-transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1); transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1); -webkit-transition-property: width, height; transition-property: width, height; background-color: #9c27b0; } .md-slider-tick-container, .md-slider-last-tick-container { position: absolute; left: 0; right: 0; height: 100%; } .md-slider-thumb-container { position: absolute; left: 0; top: 50%; -webkit-transform: translate3d(-50%, -50%, 0); transform: translate3d(-50%, -50%, 0); -webkit-transition-duration: 400ms; transition-duration: 400ms; -webkit-transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1); transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1); -webkit-transition-property: left, bottom; transition-property: left, bottom; } .md-slider-thumb-position { -webkit-transition: -webkit-transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1); transition: -webkit-transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1); transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1); transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1), -webkit-transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1); } .md-slider-thumb { z-index: 1; position: absolute; top: 0px; left: -10px; width: 20px; height: 20px; border-radius: 20px; -webkit-transform: scale(0.7); transform: scale(0.7); -webkit-transition: -webkit-transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1); transition: -webkit-transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1); transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1); transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1), -webkit-transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1); } .md-slider-thumb::after { content: ''; position: absolute; width: 20px; height: 20px; border-radius: 20px; border-width: 3px; border-style: solid; -webkit-transition: inherit; transition: inherit; background-color: #9c27b0; border-color: #9c27b0; } .md-slider-sliding .md-slider-thumb-position, .md-slider-sliding .md-slider-track-fill { -webkit-transition: none; transition: none; cursor: default; } .md-slider-active .md-slider-thumb { -webkit-transform: scale(1); transform: scale(1); } .md-slider-disabled .md-slider-thumb::after { background-color: rgba(0, 0, 0, 0.26); border-color: rgba(0, 0, 0, 0.26); } "],
            encapsulation: core_1.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], MdSlider);
    return MdSlider;
}());
exports.MdSlider = MdSlider;
/**
 * Renderer class in order to keep all dom manipulation in one place and outside of the main class.
 */
var SliderRenderer = (function () {
    function SliderRenderer(elementRef) {
        this._sliderElement = elementRef.nativeElement;
    }
    /**
     * Get the bounding client rect of the slider track element.
     * The track is used rather than the native element to ignore the extra space that the thumb can
     * take up.
     */
    SliderRenderer.prototype.getSliderDimensions = function () {
        var trackElement = this._sliderElement.querySelector('.md-slider-track');
        return trackElement.getBoundingClientRect();
    };
    /**
     * Update the physical position of the thumb and fill track on the slider.
     */
    SliderRenderer.prototype.updateThumbAndFillPosition = function (percent, width) {
        // A container element that is used to avoid overwriting the transform on the thumb itself.
        var thumbPositionElement = this._sliderElement.querySelector('.md-slider-thumb-position');
        var fillTrackElement = this._sliderElement.querySelector('.md-slider-track-fill');
        var position = percent * width;
        fillTrackElement.style.width = position + "px";
        apply_transform_1.applyCssTransform(thumbPositionElement, "translateX(" + position + "px)");
    };
    /**
     * Focuses the native element.
     * Currently only used to allow a blur event to fire but will be used with keyboard input later.
     */
    SliderRenderer.prototype.addFocus = function () {
        this._sliderElement.focus();
    };
    /**
     * Draws ticks onto the tick container.
     */
    SliderRenderer.prototype.drawTicks = function (tickSeparation) {
        var tickContainer = this._sliderElement.querySelector('.md-slider-tick-container');
        var tickContainerWidth = tickContainer.getBoundingClientRect().width;
        // An extra element for the last tick is needed because the linear gradient cannot be told to
        // always draw a tick at the end of the gradient. To get around this, there is a second
        // container for ticks that has a single tick mark on the very right edge.
        var lastTickContainer = this._sliderElement.querySelector('.md-slider-last-tick-container');
        // Subtract 1 from the tick separation to center the tick.
        // TODO: Evaluate the rendering performance of using repeating background gradients.
        tickContainer.style.background = "repeating-linear-gradient(to right, black, black 2px, " +
            ("transparent 2px, transparent " + (tickSeparation - 1) + "px)");
        // Add a tick to the very end by starting on the right side and adding a 2px black line.
        lastTickContainer.style.background = "linear-gradient(to left, black, black 2px, transparent " +
            "2px, transparent)";
        // If the second to last tick is too close (a separation of less than half the normal
        // separation), don't show it by decreasing the width of the tick container element.
        if (tickContainerWidth % tickSeparation < (tickSeparation / 2)) {
            tickContainer.style.width = tickContainerWidth - tickSeparation + 'px';
        }
    };
    return SliderRenderer;
}());
exports.SliderRenderer = SliderRenderer;
/** @deprecated */
exports.MD_SLIDER_DIRECTIVES = [MdSlider];
var MdSliderModule = (function () {
    function MdSliderModule() {
    }
    MdSliderModule = __decorate([
        core_1.NgModule({
            exports: exports.MD_SLIDER_DIRECTIVES,
            declarations: exports.MD_SLIDER_DIRECTIVES,
            providers: [
                { provide: platform_browser_1.HAMMER_GESTURE_CONFIG, useClass: core_2.MdGestureConfig },
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], MdSliderModule);
    return MdSliderModule;
}());
exports.MdSliderModule = MdSliderModule;
//# sourceMappingURL=slider.js.map