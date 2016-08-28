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
var core_2 = require('@angular2-material/core/core');
var MdTooltip = (function () {
    function MdTooltip(_overlay, _elementRef, _viewContainerRef, _changeDetectionRef) {
        this._overlay = _overlay;
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        this._changeDetectionRef = _changeDetectionRef;
        this.visible = false;
        /** Allows the user to define the position of the tooltip relative to the parent element */
        this._position = 'below';
    }
    Object.defineProperty(MdTooltip.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (value) {
            if (value !== this._position) {
                this._position = value;
                this._createOverlay();
                this._updatePosition();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTooltip.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (value) {
            this._message = value;
            this._updatePosition();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Create overlay on init
     * TODO: @internal
     */
    MdTooltip.prototype.ngOnInit = function () {
        this._createOverlay();
    };
    /**
     * Create the overlay config and position strategy
     */
    MdTooltip.prototype._createOverlay = function () {
        var _this = this;
        if (this._overlayRef) {
            if (this.visible) {
                // if visible, hide before destroying
                this.hide().then(function () { return _this._createOverlay(); });
            }
            else {
                // if not visible, dispose and recreate
                this._overlayRef.dispose();
                this._overlayRef = null;
                this._createOverlay();
            }
        }
        else {
            var origin = this._getOrigin();
            var position = this._getOverlayPosition();
            var strategy = this._overlay.position().connectedTo(this._elementRef, origin, position);
            var config = new core_2.OverlayState();
            config.positionStrategy = strategy;
            this._overlay.create(config).then(function (ref) {
                _this._overlayRef = ref;
            });
        }
    };
    /**
     * Returns the origin position based on the user's position preference
     */
    MdTooltip.prototype._getOrigin = function () {
        switch (this.position) {
            case 'before': return { originX: 'start', originY: 'center' };
            case 'after': return { originX: 'end', originY: 'center' };
            case 'above': return { originX: 'center', originY: 'top' };
            case 'below': return { originX: 'center', originY: 'bottom' };
        }
    };
    /**
     * Returns the overlay position based on the user's preference
     */
    MdTooltip.prototype._getOverlayPosition = function () {
        switch (this.position) {
            case 'before': return { overlayX: 'end', overlayY: 'center' };
            case 'after': return { overlayX: 'start', overlayY: 'center' };
            case 'above': return { overlayX: 'center', overlayY: 'bottom' };
            case 'below': return { overlayX: 'center', overlayY: 'top' };
        }
    };
    /**
     * Shows the tooltip on mouse enter
     * @param event
     */
    MdTooltip.prototype._handleMouseEnter = function (event) {
        this.show();
    };
    /**
     * Hides the tooltip on mouse leave
     * @param event
     */
    MdTooltip.prototype._handleMouseLeave = function (event) {
        this.hide();
    };
    /**
     * Shows the tooltip and returns a promise that will resolve when the tooltip is visible
     */
    MdTooltip.prototype.show = function () {
        var _this = this;
        if (!this.visible && this._overlayRef && !this._overlayRef.hasAttached()) {
            this.visible = true;
            var promise = this._overlayRef.attach(new core_2.ComponentPortal(TooltipComponent, this._viewContainerRef));
            promise.then(function (ref) {
                ref.instance.message = _this.message;
                _this._updatePosition();
            });
            return promise;
        }
    };
    /**
     * Hides the tooltip and returns a promise that will resolve when the tooltip is hidden
     */
    MdTooltip.prototype.hide = function () {
        if (this.visible && this._overlayRef && this._overlayRef.hasAttached()) {
            this.visible = false;
            return this._overlayRef.detach();
        }
    };
    /**
     * Shows/hides the tooltip and returns a promise that will resolve when it is done
     */
    MdTooltip.prototype.toggle = function () {
        if (this.visible) {
            return this.hide();
        }
        else {
            return this.show();
        }
    };
    /**
     * Updates the tooltip's position
     */
    MdTooltip.prototype._updatePosition = function () {
        if (this._overlayRef) {
            this._changeDetectionRef.detectChanges();
            this._overlayRef.updatePosition();
        }
    };
    __decorate([
        core_1.Input('tooltip-position'), 
        __metadata('design:type', String)
    ], MdTooltip.prototype, "position", null);
    __decorate([
        core_1.Input('md-tooltip'), 
        __metadata('design:type', Object)
    ], MdTooltip.prototype, "message", null);
    MdTooltip = __decorate([
        core_1.Directive({
            selector: '[md-tooltip]',
            host: {
                '(mouseenter)': '_handleMouseEnter($event)',
                '(mouseleave)': '_handleMouseLeave($event)',
            }
        }), 
        __metadata('design:paramtypes', [core_2.Overlay, core_1.ElementRef, core_1.ViewContainerRef, core_1.ChangeDetectorRef])
    ], MdTooltip);
    return MdTooltip;
}());
exports.MdTooltip = MdTooltip;
var TooltipComponent = (function () {
    function TooltipComponent() {
    }
    TooltipComponent = __decorate([
        core_1.Component({            selector: 'md-tooltip-component',
            template: "<div class=\"md-tooltip\">{{message}}</div>",
            styles: [":host { pointer-events: none; } .md-tooltip { background: rgba(97, 97, 97, 0.9); color: white; padding: 0 8px; border-radius: 2px; font-family: Roboto, \"Helvetica Neue\", sans-serif; font-size: 10px; margin: 14px; height: 22px; line-height: 22px; } "],
        }), 
        __metadata('design:paramtypes', [])
    ], TooltipComponent);
    return TooltipComponent;
}());
exports.TooltipComponent = TooltipComponent;
/** @deprecated */
exports.MD_TOOLTIP_DIRECTIVES = [MdTooltip];
var MdTooltipModule = (function () {
    function MdTooltipModule() {
    }
    MdTooltipModule = __decorate([
        core_1.NgModule({
            imports: [core_2.OverlayModule],
            exports: [exports.MD_TOOLTIP_DIRECTIVES, TooltipComponent],
            declarations: [exports.MD_TOOLTIP_DIRECTIVES, TooltipComponent],
            entryComponents: [TooltipComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], MdTooltipModule);
    return MdTooltipModule;
}());
exports.MdTooltipModule = MdTooltipModule;
//# sourceMappingURL=tooltip.js.map