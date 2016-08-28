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
var portal_directives_1 = require('@angular2-material/core/portal/portal-directives');
var tab_label_1 = require('./tab-label');
var tab_content_1 = require('./tab-content');
var tab_label_wrapper_1 = require('./tab-label-wrapper');
var ink_bar_1 = require('./ink-bar');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
// Due to a bug in the ChromeDriver, Angular 2 keyboard events are not triggered by `sendKeys`
// during E2E tests when using dot notation such as `(keydown.rightArrow)`. To get around this,
// we are temporarily using a single (keydown) handler.
// See: https://github.com/angular/angular/issues/9419
var RIGHT_ARROW = 39;
var LEFT_ARROW = 37;
var ENTER = 13;
/** Used to generate unique ID's for each tab component */
var nextId = 0;
/** A simple change event emitted on focus or selection changes. */
var MdTabChangeEvent = (function () {
    function MdTabChangeEvent() {
    }
    return MdTabChangeEvent;
}());
exports.MdTabChangeEvent = MdTabChangeEvent;
var MdTab = (function () {
    function MdTab() {
    }
    __decorate([
        core_1.ContentChild(tab_label_1.MdTabLabel), 
        __metadata('design:type', tab_label_1.MdTabLabel)
    ], MdTab.prototype, "label", void 0);
    __decorate([
        core_1.ContentChild(tab_content_1.MdTabContent), 
        __metadata('design:type', tab_content_1.MdTabContent)
    ], MdTab.prototype, "content", void 0);
    MdTab = __decorate([
        core_1.Directive({
            selector: 'md-tab'
        }), 
        __metadata('design:paramtypes', [])
    ], MdTab);
    return MdTab;
}());
exports.MdTab = MdTab;
/**
 * Material design tab-group component.  Supports basic tab pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://www.google.com/design/spec/components/tabs.html
 */
var MdTabGroup = (function () {
    function MdTabGroup(_zone) {
        this._zone = _zone;
        this._isInitialized = false;
        this._selectedIndex = 0;
        this._onFocusChange = new core_1.EventEmitter();
        this._onSelectChange = new core_1.EventEmitter();
        this._focusIndex = 0;
        this._groupId = nextId++;
    }
    Object.defineProperty(MdTabGroup.prototype, "selectedIndex", {
        get: function () {
            return this._selectedIndex;
        },
        set: function (value) {
            if (value != this._selectedIndex) {
                this._selectedIndex = value;
                if (this._isInitialized) {
                    this._onSelectChange.emit(this._createChangeEvent(value));
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTabGroup.prototype, "_selectedIndexChange", {
        /** Output to enable support for two-way binding on `selectedIndex`. */
        get: function () {
            return this.selectChange.map(function (event) { return event.index; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTabGroup.prototype, "focusChange", {
        get: function () {
            return this._onFocusChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTabGroup.prototype, "selectChange", {
        get: function () {
            return this._onSelectChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Waits one frame for the view to update, then upates the ink bar
     * Note: This must be run outside of the zone or it will create an infinite change detection loop
     * TODO: internal
     */
    MdTabGroup.prototype.ngAfterViewChecked = function () {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            window.requestAnimationFrame(function () {
                _this._updateInkBar();
            });
        });
        this._isInitialized = true;
    };
    /** Tells the ink-bar to align itself to the current label wrapper */
    MdTabGroup.prototype._updateInkBar = function () {
        this._inkBar.toArray()[0].alignToElement(this._currentLabelWrapper);
    };
    Object.defineProperty(MdTabGroup.prototype, "_currentLabelWrapper", {
        /**
         * Reference to the current label wrapper; defaults to null for initial render before the
         * ViewChildren references are ready.
         */
        get: function () {
            return this._labelWrappers && this._labelWrappers.length
                ? this._labelWrappers.toArray()[this.selectedIndex].elementRef.nativeElement
                : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTabGroup.prototype, "focusIndex", {
        /** Tracks which element has focus; used for keyboard navigation */
        get: function () {
            return this._focusIndex;
        },
        /** When the focus index is set, we must manually send focus to the correct label */
        set: function (value) {
            this._focusIndex = value;
            if (this._isInitialized) {
                this._onFocusChange.emit(this._createChangeEvent(value));
            }
            if (this._labelWrappers && this._labelWrappers.length) {
                this._labelWrappers.toArray()[value].focus();
            }
        },
        enumerable: true,
        configurable: true
    });
    MdTabGroup.prototype._createChangeEvent = function (index) {
        var event = new MdTabChangeEvent;
        event.index = index;
        if (this._tabs && this._tabs.length) {
            event.tab = this._tabs.toArray()[index];
        }
        return event;
    };
    /** Returns a unique id for each tab label element */
    MdTabGroup.prototype._getTabLabelId = function (i) {
        return "md-tab-label-" + this._groupId + "-" + i;
    };
    /** Returns a unique id for each tab content element */
    MdTabGroup.prototype._getTabContentId = function (i) {
        return "md-tab-content-" + this._groupId + "-" + i;
    };
    MdTabGroup.prototype.handleKeydown = function (event) {
        switch (event.keyCode) {
            case RIGHT_ARROW:
                this.focusNextTab();
                break;
            case LEFT_ARROW:
                this.focusPreviousTab();
                break;
            case ENTER:
                this.selectedIndex = this.focusIndex;
                break;
        }
    };
    /** Increment the focus index by 1; prevent going over the number of tabs */
    MdTabGroup.prototype.focusNextTab = function () {
        if (this._labelWrappers && this.focusIndex < this._labelWrappers.length - 1) {
            this.focusIndex++;
        }
    };
    /** Decrement the focus index by 1; prevent going below 0 */
    MdTabGroup.prototype.focusPreviousTab = function () {
        if (this.focusIndex > 0) {
            this.focusIndex--;
        }
    };
    __decorate([
        core_1.ContentChildren(MdTab), 
        __metadata('design:type', core_1.QueryList)
    ], MdTabGroup.prototype, "_tabs", void 0);
    __decorate([
        core_1.ViewChildren(tab_label_wrapper_1.MdTabLabelWrapper), 
        __metadata('design:type', core_1.QueryList)
    ], MdTabGroup.prototype, "_labelWrappers", void 0);
    __decorate([
        core_1.ViewChildren(ink_bar_1.MdInkBar), 
        __metadata('design:type', core_1.QueryList)
    ], MdTabGroup.prototype, "_inkBar", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], MdTabGroup.prototype, "selectedIndex", null);
    __decorate([
        core_1.Output('selectedIndexChange'), 
        __metadata('design:type', Observable_1.Observable)
    ], MdTabGroup.prototype, "_selectedIndexChange", null);
    __decorate([
        core_1.Output('focusChange'), 
        __metadata('design:type', Observable_1.Observable)
    ], MdTabGroup.prototype, "focusChange", null);
    __decorate([
        core_1.Output('selectChange'), 
        __metadata('design:type', Observable_1.Observable)
    ], MdTabGroup.prototype, "selectChange", null);
    MdTabGroup = __decorate([
        core_1.Component({            selector: 'md-tab-group',
            template: "<div class=\"md-tab-header\" role=\"tablist\" (keydown)=\"handleKeydown($event)\"> <div class=\"md-tab-label\" role=\"tab\" md-tab-label-wrapper *ngFor=\"let tab of _tabs; let i = index\" [id]=\"_getTabLabelId(i)\" [tabIndex]=\"selectedIndex == i ? 0 : -1\" [attr.aria-controls]=\"_getTabContentId(i)\" [attr.aria-selected]=\"selectedIndex == i\" [class.md-active]=\"selectedIndex == i\" (click)=\"focusIndex = selectedIndex = i\"> <template [portalHost]=\"tab.label\"></template> </div> <md-ink-bar></md-ink-bar> </div> <div class=\"md-tab-body-wrapper\"> <div class=\"md-tab-body\" role=\"tabpanel\" *ngFor=\"let tab of _tabs; let i = index\" [id]=\"_getTabContentId(i)\" [class.md-active]=\"selectedIndex == i\" [attr.aria-labelledby]=\"_getTabLabelId(i)\"> <template [ngIf]=\"selectedIndex == i\"> <template [portalHost]=\"tab.content\"></template> </template> </div> </div> ",
            styles: [":host { display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column; flex-direction: column; font-family: Roboto, \"Helvetica Neue\", sans-serif; } /** The top section of the view; contains the tab labels */ .md-tab-header { overflow: hidden; position: relative; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -ms-flex-direction: row; flex-direction: row; border-bottom: 1px solid #e0e0e0; -ms-flex-negative: 0; flex-shrink: 0; } /** Wraps each tab label */ .md-tab-label { line-height: 48px; height: 48px; padding: 0 12px; font-size: 14px; font-family: Roboto, \"Helvetica Neue\", sans-serif; font-weight: 500; cursor: pointer; box-sizing: border-box; color: currentColor; opacity: 0.6; min-width: 160px; text-align: center; } .md-tab-label:focus { outline: none; opacity: 1; background-color: rgba(178, 223, 219, 0.3); } /** The bottom section of the view; contains the tab bodies */ .md-tab-body-wrapper { position: relative; overflow: hidden; -webkit-box-flex: 1; -ms-flex-positive: 1; flex-grow: 1; display: -webkit-box; display: -ms-flexbox; display: flex; } /** Wraps each tab body */ .md-tab-body { display: none; overflow: auto; box-sizing: border-box; -webkit-box-flex: 1; -ms-flex-positive: 1; flex-grow: 1; -ms-flex-negative: 1; flex-shrink: 1; } .md-tab-body.md-active { display: block; } /** The colored bar that underlines the active tab */ md-ink-bar { position: absolute; bottom: 0; height: 2px; background-color: #009688; -webkit-transition: 350ms ease-out; transition: 350ms ease-out; } "],
        }), 
        __metadata('design:paramtypes', [core_1.NgZone])
    ], MdTabGroup);
    return MdTabGroup;
}());
exports.MdTabGroup = MdTabGroup;
/** @deprecated */
exports.MD_TABS_DIRECTIVES = [MdTabGroup, tab_label_1.MdTabLabel, tab_content_1.MdTabContent, MdTab];
exports.TABS_INTERNAL_DIRECTIVES = [ink_bar_1.MdInkBar, tab_label_wrapper_1.MdTabLabelWrapper];
var MdTabsModule = (function () {
    function MdTabsModule() {
    }
    MdTabsModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, portal_directives_1.PortalModule],
            exports: [exports.MD_TABS_DIRECTIVES],
            declarations: [exports.MD_TABS_DIRECTIVES, exports.TABS_INTERNAL_DIRECTIVES],
        }), 
        __metadata('design:paramtypes', [])
    ], MdTabsModule);
    return MdTabsModule;
}());
exports.MdTabsModule = MdTabsModule;
//# sourceMappingURL=tabs.js.map