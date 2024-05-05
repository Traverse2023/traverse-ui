import React, {useContext} from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "../../components/Modal";
import ServerOptsOverlay, {
    titleOverlayTargetHandler,
} from "./ServerOptsOverlay";

import VoiceChannel from "./VoiceChannel.jsx";
import TextChannel from "./TextChannel.jsx";
import MediaControls from "./MediaControls.jsx";

//TODO - change this to a tsx file and import group-context.jsx
import {GroupContext} from "../../context/group-context.tsx";

const SubGroupSelector = () => {

    const [show, setShow] = React.useState(false);
    const target = React.useRef(null);
    const [createModal, setCreateModal] = React.useState(false);
    const {channelUsersMap, selectedGroup} = useContext(GroupContext);

    return (
        <div className="subGroupSelector">
            <h4 className="groupTitle">
                {selectedGroup.groupName}
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
                <TextChannel channelName="general"/>
                <TextChannel channelName="plans"/>
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
                {[...channelUsersMap?.keys()].map(channelName => <VoiceChannel channelName={channelName} users={channelUsersMap} />)}
            </div>
            <div className="bottom-tab">
                <MediaControls />
            </div>
        </div>
    );
};

export default SubGroupSelector;
