import React from "react";
import Overlay from "react-bootstrap/Overlay";

const titleOverlayTargetHandler = (target, show, setShow) => {
    setShow(!show);
    if (show) {
        target.current.innerHTML = "&#8735;";
        target.current.classList = ["downArrow"];
    } else {
        target.current.innerHTML = "&#10005;";
        target.current.classList = ["X"];
    }
};

const ServerOptsOverlay = ({target, show}) => {
    return (
        <Overlay target={target.current} show={show} placement="bottom">
            {({
                placement: _placement,
                arrowProps: _arrowProps,
                show: _show,
                popper: _popper,
                hasDoneInitialMeasure: _hasDoneInitialMeasure,
                ...props
            }) => (
                <div
                    className="title-click-overlay"
                    {...props}
                    style={{
                        ...props.style,
                    }}
                >
                    <ul>
                        <li>Invite People</li>
                        <li>Create Channel</li>
                        <li>Create Event</li>
                        <li>CreateCategory</li>
                    </ul>
                </div>
            )}
        </Overlay>
    );
};

export { ServerOptsOverlay, titleOverlayTargetHandler };

