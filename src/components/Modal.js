import React from "react";

const Modal = ({ show, setModalStatus, children }) => {
    React.useEffect(() => {
        console.log(show);
    }, [show]);
    if (show) {
        return (
            <div id="myModal" className="modal">
                <div className="modal-content">
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
