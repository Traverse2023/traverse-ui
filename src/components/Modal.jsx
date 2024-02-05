import React from "react";

const Modal = ({ show, setModalStatus, style, children }) => {
    React.useEffect(() => {
        console.log(show);
    }, [show]);
    if (show) {
        return (
            <div id="myModal" className="modal">
                <div className="modal-content" style={style}>
                    <span
                        className="close"
                        onClick={() => setModalStatus(false)}
                    >
                        &times;
                    </span>
                    {children}
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default Modal;
