// TODO(kara): keyboard events for menu navigation
// TODO(kara): prevent-close functionality
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var menu_errors_1 = require('./menu-errors');
var MdMenu = (function () {
    function MdMenu(posX, posY) {
        this._showClickCatcher = false;
        this.positionX = 'after';
        this.positionY = 'below';
        this.close = new core_1.EventEmitter;
        if (posX) {
            this._setPositionX(posX);
        }
        if (posY) {
            this._setPositionY(posY);
        }
    }
    Object.defineProperty(MdMenu.prototype, "classList", {
        /**
         * This method takes classes set on the host md-menu element and applies them on the
         * menu template that displays in the overlay container.  Otherwise, it's difficult
         * to style the containing menu from outside the component.
         * @param classes list of class names
         */
        set: function (classes) {
            this._classList = classes.split(' ').reduce(function (obj, className) {
                obj[className] = true;
                return obj;
            }, {});
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This function toggles the display of the menu's click catcher element.
     * This element covers the viewport when the menu is open to detect clicks outside the menu.
     * TODO: internal
     */
    MdMenu.prototype._setClickCatcher = function (bool) {
        this._showClickCatcher = bool;
    };
    MdMenu.prototype._setPositionX = function (pos) {
        if (pos !== 'before' && pos !== 'after') {
            throw new menu_errors_1.MdMenuInvalidPositionX();
        }
        this.positionX = pos;
    };
    MdMenu.prototype._setPositionY = function (pos) {
        if (pos !== 'above' && pos !== 'below') {
            throw new menu_errors_1.MdMenuInvalidPositionY();
        }
        this.positionY = pos;
    };
    MdMenu.prototype._emitCloseEvent = function () {
        this.close.emit(null);
    };
    __decorate([
        core_1.ViewChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], MdMenu.prototype, "templateRef", void 0);
    __decorate([
        core_1.Input('class'), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], MdMenu.prototype, "classList", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MdMenu.prototype, "close", void 0);
    MdMenu = __decorate([
        core_1.Component({            selector: 'md-menu',
            host: { 'role': 'menu' },
            template: "<template> <div class=\"md-menu\" [ngClass]=\"_classList\" (click)=\"_emitCloseEvent()\"> <ng-content></ng-content> </div> </template> <div class=\"md-menu-click-catcher\" *ngIf=\"_showClickCatcher\" (click)=\"_emitCloseEvent()\"></div>",
            styles: ["/** * A collection of mixins and CSS classes that can be used to apply elevation to a material * element. * See: https://www.google.com/design/spec/what-is-material/elevation-shadows.html * Examples: * * * .md-foo { *   @include $md-elevation(2); * *   &:active { *     @include $md-elevation(8); *   } * } * * <div id=\"external-card\" class=\"md-elevation-z2\"><p>Some content</p></div> * * For an explanation of the design behind how elevation is implemented, see the design doc at * https://goo.gl/Kq0k9Z. */ /** * The css property used for elevation. In most cases this should not be changed. It is exposed * as a variable for abstraction / easy use when needing to reference the property directly, for * example in a will-change rule. */ /** The default duration value for elevation transitions. */ /** The default easing value for elevation transitions. */ /** * Applies the correct css rules to an element to give it the elevation specified by $zValue. * The $zValue must be between 0 and 24. */ /** * Returns a string that can be used as the value for a transition property for elevation. * Calling this function directly is useful in situations where a component needs to transition * more than one property. * * .foo { *   transition: md-elevation-transition-property-value(), opacity 100ms ease; *   will-change: $md-elevation-property, opacity; * } */ /** * Applies the correct css rules needed to have an element transition between elevations. * This mixin should be applied to elements whose elevation values will change depending on their * context (e.g. when active or disabled). */ /** * This mixin overrides default button styles like the gray background, * the border, and the outline. */ /* This mixin ensures an element spans the whole viewport.*/ /** * This mixin will ensure that lines that overflow the container will * hide the overflow and truncate neatly with an ellipsis. */ /** * This mixin provides all md-line styles, changing secondary font size * based on whether the list is in dense mode. */ /** * This mixin provides base styles for the wrapper around md-line * elements in a list. */ /** * This mixin normalizes default element styles, e.g. font weight for heading text. */ .md-menu { box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); min-width: 112px; max-width: 280px; max-height: calc(100vh + 48px); overflow: auto; -webkit-overflow-scrolling: touch; background: white; padding-top: 8px; padding-bottom: 8px; } [md-menu-item] { background: transparent; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; outline: none; border: none; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -ms-flex-direction: row; flex-direction: row; -webkit-box-align: center; -ms-flex-align: center; align-items: center; height: 48px; padding: 0 16px; font-size: 16px; font-family: Roboto, \"Helvetica Neue\", sans-serif; text-align: start; text-decoration: none; color: rgba(0, 0, 0, 0.87); } [md-menu-item][disabled] { color: rgba(0, 0, 0, 0.38); cursor: default; } [md-menu-item]:hover:not([disabled]) { background: rgba(0, 0, 0, 0.04); } button[md-menu-item] { width: 100%; } .md-menu-click-catcher { position: fixed; top: 0; left: 0; right: 0; bottom: 0; } "],
            encapsulation: core_1.ViewEncapsulation.None,
            exportAs: 'mdMenu'
        }),
        __param(0, core_1.Attribute('x-position')),
        __param(1, core_1.Attribute('y-position')), 
        __metadata('design:paramtypes', [String, String])
    ], MdMenu);
    return MdMenu;
}());
exports.MdMenu = MdMenu;
//# sourceMappingURL=menu-directive.js.map