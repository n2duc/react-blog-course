import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

function createPortalWrapper() {
    const element = document.createElement("div");
    element.id = "portal-wrapper";
    return element;
};
const portalElement = createPortalWrapper();

const PopupPortal = () => {
    useEffect(() => {
        document.body.appendChild(portalElement);
    }, []);

    const renderContent = (
        <div></div>
    );
    return createPortal(renderContent, portalElement);
};

export default PopupPortal;