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
var menu_directive_1 = require('./menu-directive');
var menu_errors_1 = require('./menu-errors');
var core_2 = require('@angular2-material/core/core');
/**
 * This directive is intended to be used in conjunction with an md-menu tag.  It is
 * responsible for toggling the display of the provided menu instance.
 */
var MdMenuTrigger = (function () {
    function MdMenuTrigger(_overlay, _element, _viewContainerRef) {
        this._overlay = _overlay;
        this._element = _element;
        this._viewContainerRef = _viewContainerRef;
        this._menuOpen = false;
        this.onMenuOpen = new core_1.EventEmitter();
        this.onMenuClose = new core_1.EventEmitter();
    }
    MdMenuTrigger.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._checkMenu();
        this.menu.close.subscribe(function () { return _this.closeMenu(); });
    };
    MdMenuTrigger.prototype.ngOnDestroy = function () { this.destroyMenu(); };
    Object.defineProperty(MdMenuTrigger.prototype, "menuOpen", {
        get: function () { return this._menuOpen; },
        enumerable: true,
        configurable: true
    });
    MdMenuTrigger.prototype.toggleMenu = function () {
        return this._menuOpen ? this.closeMenu() : this.openMenu();
    };
    MdMenuTrigger.prototype.openMenu = function () {
        var _this = this;
        return this._createOverlay()
            .then(function () { return _this._overlayRef.attach(_this._portal); })
            .then(function () { return _this._setIsMenuOpen(true); });
    };
    MdMenuTrigger.prototype.closeMenu = function () {
        var _this = this;
        if (!this._overlayRef) {
            return Promise.resolve();
        }
        return this._overlayRef.detach()
            .then(function () { return _this._setIsMenuOpen(false); });
    };
    MdMenuTrigger.prototype.destroyMenu = function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    };
    // set state rather than toggle to support triggers sharing a menu
    MdMenuTrigger.prototype._setIsMenuOpen = function (isOpen) {
        this._menuOpen = isOpen;
        this.menu._setClickCatcher(isOpen);
        this._menuOpen ? this.onMenuOpen.emit(null) : this.onMenuClose.emit(null);
    };
    /**
     *  This method checks that a valid instance of MdMenu has been passed into
     *  md-menu-trigger-for.  If not, an exception is thrown.
     */
    MdMenuTrigger.prototype._checkMenu = function () {
        if (!this.menu || !(this.menu instanceof menu_directive_1.MdMenu)) {
            throw new menu_errors_1.MdMenuMissingError();
        }
    };
    /**
     *  This method creates the overlay from the provided menu's template and saves its
     *  OverlayRef so that it can be attached to the DOM when openMenu is called.
     */
    MdMenuTrigger.prototype._createOverlay = function () {
        var _this = this;
        if (this._overlayRef) {
            return Promise.resolve();
        }
        this._portal = new core_2.TemplatePortal(this.menu.templateRef, this._viewContainerRef);
        return this._overlay.create(this._getOverlayConfig())
            .then(function (overlay) { return _this._overlayRef = overlay; });
    };
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @returns OverlayState
     */
    MdMenuTrigger.prototype._getOverlayConfig = function () {
        var overlayState = new core_2.OverlayState();
        overlayState.positionStrategy = this._getPosition();
        return overlayState;
    };
    /**
     * This method builds the position strategy for the overlay, so the menu is properly connected
     * to the trigger.
     * @returns ConnectedPositionStrategy
     */
    MdMenuTrigger.prototype._getPosition = function () {
        var positionX = this.menu.positionX === 'before' ? 'end' : 'start';
        var positionY = this.menu.positionY === 'above' ? 'bottom' : 'top';
        return this._overlay.position().connectedTo(this._element, { originX: positionX, originY: positionY }, { overlayX: positionX, overlayY: positionY });
    };
    __decorate([
        core_1.Input('md-menu-trigger-for'), 
        __metadata('design:type', menu_directive_1.MdMenu)
    ], MdMenuTrigger.prototype, "menu", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MdMenuTrigger.prototype, "onMenuOpen", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MdMenuTrigger.prototype, "onMenuClose", void 0);
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', Promise)
    ], MdMenuTrigger.prototype, "toggleMenu", null);
    MdMenuTrigger = __decorate([
        core_1.Directive({
            selector: '[md-menu-trigger-for]',
            host: { 'aria-haspopup': 'true' },
            providers: [core_2.OVERLAY_PROVIDERS],
            exportAs: 'mdMenuTrigger'
        }), 
        __metadata('design:paramtypes', [core_2.Overlay, core_1.ElementRef, core_1.ViewContainerRef])
    ], MdMenuTrigger);
    return MdMenuTrigger;
}());
exports.MdMenuTrigger = MdMenuTrigger;
//# sourceMappingURL=menu-trigger.js.map