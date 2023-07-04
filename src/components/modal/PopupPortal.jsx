import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

function createPortalWrapper() {
    const element = document.createElement("div");
    element.id = "portal-wrapper";
    return element;
};
const portalElement = createPortalWrapper();

const PopupPortal = ({ children }) => {
    useEffect(() => {
        document.body.appendChild(portalElement);
    }, []);

    return createPortal(
        <div className="modal">{children}</div>
    , portalElement);
};

export default PopupPortal;