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
var common_1 = require('@angular/common');
var core_2 = require('@angular2-material/core/core');
var menu_directive_1 = require('./menu-directive');
var menu_item_1 = require('./menu-item');
var menu_trigger_1 = require('./menu-trigger');
var menu_directive_2 = require('./menu-directive');
exports.MdMenu = menu_directive_2.MdMenu;
var menu_item_2 = require('./menu-item');
exports.MdMenuItem = menu_item_2.MdMenuItem;
exports.MdMenuAnchor = menu_item_2.MdMenuAnchor;
var menu_trigger_2 = require('./menu-trigger');
exports.MdMenuTrigger = menu_trigger_2.MdMenuTrigger;
/** @deprecated */
exports.MD_MENU_DIRECTIVES = [menu_directive_1.MdMenu, menu_item_1.MdMenuItem, menu_trigger_1.MdMenuTrigger, menu_item_1.MdMenuAnchor];
var MdMenuModule = (function () {
    function MdMenuModule() {
    }
    MdMenuModule = __decorate([
        core_1.NgModule({
            imports: [core_2.OverlayModule, common_1.CommonModule],
            exports: exports.MD_MENU_DIRECTIVES,
            declarations: exports.MD_MENU_DIRECTIVES,
        }), 
        __metadata('design:paramtypes', [])
    ], MdMenuModule);
    return MdMenuModule;
}());
exports.MdMenuModule = MdMenuModule;
//# sourceMappingURL=menu.js.map