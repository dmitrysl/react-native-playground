import { ElementRef, EventEmitter, ViewContainerRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MdMenu } from './menu-directive';
import { Overlay } from '@angular2-material/core/core';
/**
 * This directive is intended to be used in conjunction with an md-menu tag.  It is
 * responsible for toggling the display of the provided menu instance.
 */
export declare class MdMenuTrigger implements AfterViewInit, OnDestroy {
    private _overlay;
    private _element;
    private _viewContainerRef;
    private _portal;
    private _overlayRef;
    private _menuOpen;
    menu: MdMenu;
    onMenuOpen: EventEmitter<{}>;
    onMenuClose: EventEmitter<{}>;
    constructor(_overlay: Overlay, _element: ElementRef, _viewContainerRef: ViewContainerRef);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    menuOpen: boolean;
    toggleMenu(): Promise<void>;
    openMenu(): Promise<void>;
    closeMenu(): Promise<void>;
    destroyMenu(): void;
    private _setIsMenuOpen(isOpen);
    /**
     *  This method checks that a valid instance of MdMenu has been passed into
     *  md-menu-trigger-for.  If not, an exception is thrown.
     */
    private _checkMenu();
    /**
     *  This method creates the overlay from the provided menu's template and saves its
     *  OverlayRef so that it can be attached to the DOM when openMenu is called.
     */
    private _createOverlay();
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @returns OverlayState
     */
    private _getOverlayConfig();
    /**
     * This method builds the position strategy for the overlay, so the menu is properly connected
     * to the trigger.
     * @returns ConnectedPositionStrategy
     */
    private _getPosition();
}
