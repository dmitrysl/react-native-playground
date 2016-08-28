import { EventEmitter, TemplateRef } from '@angular/core';
import { MenuPositionX, MenuPositionY } from './menu-positions';
export declare class MdMenu {
    _showClickCatcher: boolean;
    _classList: Object;
    positionX: MenuPositionX;
    positionY: MenuPositionY;
    templateRef: TemplateRef<any>;
    constructor(posX: MenuPositionX, posY: MenuPositionY);
    /**
     * This method takes classes set on the host md-menu element and applies them on the
     * menu template that displays in the overlay container.  Otherwise, it's difficult
     * to style the containing menu from outside the component.
     * @param classes list of class names
     */
    classList: string;
    close: EventEmitter<{}>;
    /**
     * This function toggles the display of the menu's click catcher element.
     * This element covers the viewport when the menu is open to detect clicks outside the menu.
     * TODO: internal
     */
    _setClickCatcher(bool: boolean): void;
    private _setPositionX(pos);
    private _setPositionY(pos);
    private _emitCloseEvent();
}
