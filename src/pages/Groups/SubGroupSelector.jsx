import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "../../components/Modal";
import ServerOptsOverlay, {
    titleOverlayTargetHandler,
} from "./ServerOptsOverlay";

const SubGroupSelector = () => {
    const [show, setShow] = React.useState(false);
    const target = React.useRef(null);

    const [createModal, setCreateModal] = React.useState(false);

    return (
        <div className="subGroupSelector">
            <h4 className="groupTitle">
                rox's server
                <span
                    ref={target}
                    onClick={() =>
                        titleOverlayTargetHandler(target, show, setShow)
                    }
                    className="downArrow"
                >
                    &#8735;
                </span>
                <ServerOptsOverlay
                    target={target}
                    show={show}
                    placement="bottom"
                />
            </h4>
            <div className="text-channel">
                <div className="text-channel-header">
                    <button className="extend">{">"}</button>
                    <p className="channels-title">TEXT CHANNELS</p>

                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                            <Tooltip className="tooltip">
                                Create Channel
                            </Tooltip>
                        }
                    >
                        <button
                            onClick={() => {
                                setCreateModal(true);
                            }}
                            className="add-channel-btn"
                        >
                            +
                        </button>
                    </OverlayTrigger>
                    <Modal show={createModal} setModalStatus={setCreateModal}>
                        <p>Some text in the Modal..</p>
                    </Modal>
                </div>
                <div className="channel">
                    <h1>#</h1>
                    <h6>general</h6>
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                            <Tooltip className="tooltip">Edit Channel</Tooltip>
                        }
                    >
                        <button>*</button>
                    </OverlayTrigger>
                </div>
                <div className="channel">
                    <h1>#</h1>
                    <h6>plans</h6>
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                            <Tooltip className="tooltip">Edit Channel</Tooltip>
                        }
                    >
                        <button>*</button>
                    </OverlayTrigger>
                    {/* <button>*</button> */}
                </div>
            </div>
            <div className="text-channel">
                <div className="text-channel-header">
                    <button className="extend">{">"}</button>
                    <p className="channels-title">VOICE CHANNELS</p>

                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                            <Tooltip className="tooltip">
                                Create Channel
                            </Tooltip>
                        }
                    >
                        <button className="add-channel-btn">+</button>
                    </OverlayTrigger>
                </div>
                <div className="channel">
                    <h1>#</h1>
                    <h6>general</h6>
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                            <Tooltip className="tooltip">Edit Channel</Tooltip>
                        }
                    >
                        <button>*</button>
                    </OverlayTrigger>
                    {/* <button>*</button> */}
                </div>
            </div>
            {/* </div> */}
            <div className="bottom-tab">
                <button>Mute</button>
                <button>Deafen</button>
            </div>
        </div>
    );
};

export default SubGroupSelector;
