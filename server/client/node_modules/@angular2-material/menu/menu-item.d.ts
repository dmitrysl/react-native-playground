/**
 * This directive is intended to be used inside an md-menu tag.
 * It exists mostly to set the role attribute.
 */
export declare class MdMenuItem {
}
/**
 * This directive is intended to be used inside an md-menu tag.
 * It sets the role attribute and adds support for the disabled property to anchors.
 */
export declare class MdMenuAnchor {
    _disabled: boolean;
    disabled: boolean;
    isAriaDisabled: string;
    tabIndex: number;
    checkDisabled(event: Event): void;
}
