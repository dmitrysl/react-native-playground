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
/**
 * This directive is intended to be used inside an md-menu tag.
 * It exists mostly to set the role attribute.
 */
var MdMenuItem = (function () {
    function MdMenuItem() {
    }
    MdMenuItem = __decorate([
        core_1.Directive({
            selector: 'button[md-menu-item]',
            host: { 'role': 'menuitem' }
        }), 
        __metadata('design:paramtypes', [])
    ], MdMenuItem);
    return MdMenuItem;
}());
exports.MdMenuItem = MdMenuItem;
/**
 * This directive is intended to be used inside an md-menu tag.
 * It sets the role attribute and adds support for the disabled property to anchors.
 */
var MdMenuAnchor = (function () {
    function MdMenuAnchor() {
    }
    Object.defineProperty(MdMenuAnchor.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = (value === false || value === undefined) ? null : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdMenuAnchor.prototype, "isAriaDisabled", {
        get: function () {
            return String(this.disabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdMenuAnchor.prototype, "tabIndex", {
        get: function () {
            return this.disabled ? -1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    MdMenuAnchor.prototype.checkDisabled = function (event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    __decorate([
        core_1.HostBinding('attr.disabled'),
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MdMenuAnchor.prototype, "disabled", null);
    __decorate([
        core_1.HostBinding('attr.aria-disabled'), 
        __metadata('design:type', String)
    ], MdMenuAnchor.prototype, "isAriaDisabled", null);
    __decorate([
        core_1.HostBinding('tabIndex'), 
        __metadata('design:type', Number)
    ], MdMenuAnchor.prototype, "tabIndex", null);
    MdMenuAnchor = __decorate([
        core_1.Directive({
            selector: 'a[md-menu-item]',
            host: {
                'role': 'menuitem',
                '(click)': 'checkDisabled($event)'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdMenuAnchor);
    return MdMenuAnchor;
}());
exports.MdMenuAnchor = MdMenuAnchor;
//# sourceMappingURL=menu-item.js.map