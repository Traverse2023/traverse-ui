import React, {useContext, useEffect, useState} from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "../../components/Modal";
import ServerOptsOverlay, {
    titleOverlayTargetHandler,
} from "./ServerOptsOverlay";
import cloneDeep from 'lodash/cloneDeep';

import {GroupContext} from "../../context/group-context";
import {AuthContext} from "../../context/auth-context";
import {SocketContext} from "../../context/friends-socket-context";
import VoiceChannel from "./VoiceChannel.jsx";

const SubGroupSelector = () => {
    const [show, setShow] = React.useState(false);
    const target = React.useRef(null);
    const [rtcProps, setRtcProps] = React.useState(null)
    const [createModal, setCreateModal] = React.useState(false);
    const auth = useContext(AuthContext)
    const groupControl = useContext(GroupContext)
    // const { chatsSocketApi } = useContext(SocketContext)
    const [channels, setChannels] = useState(new Map())

    const [selectedChannel, setSelectedChannel] = useState("");

    useEffect(() => {
        const response = ['general', 'announcements', 'events']
        setChannels(new Map(response.map(channelName => [channelName, []])))
        // Map("general": [{user.email,...}])
    }, []);

    const addUser = (channelName, user) => {
        // If channel doesn't exist, create a new map
        const updatedChannels = new Map(channels); // Copy the map to avoid directly mutating state
        // if (!updatedChannels.has(channelName)) {
        //     updatedChannels.set(channelName, new Map());
        // }

        // Remove the user from any existing channels
        for (const [currChannelName, users] of updatedChannels) {
            console.log('going thru channels', currChannelName, users)
            for (let i = 0; i < users.length; i++) {
                const existingUser = users[i]
                if (existingUser.email === user.email) {
                    console.log('found user in this channel, deleting...')
                    users.splice(i, 1)
                    console.log('new array', users)
                    console.log('new map', updatedChannels)
                    break
                }
            }
        }

        // Add the user object to the map for the specified channel
        updatedChannels.get(channelName).push(user);
        console.log('added to new channel', channelName)
        setChannels(updatedChannels);
    };

    useEffect(() => {
        console.log('channels map', channels)
    }, [channels])


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
                    {/*<Modal show={joined} setModalStatus={setJoined} className="modal-content-full">*/}
                    {/*    /!*<AgoraRTCProvider client={agoraEngine}>*!/*/}
                    {/*    /!*    <AgoraManager config={config} >*!/*/}
                    {/*    /!*    </AgoraManager>*!/*/}
                    {/*    /!*</AgoraRTCProvider>*!/*/}
                    {/*    /!*{rtcProps?.token}*!/*/}
                    {/*    /!*{joined && rtcProps && <AgoraUIKit  rtcProps={rtcProps} callbacks={callbacks}/>}*!/*/}
                    {/*</Modal>*/}
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
                {[...channels.keys()].map(channelName => <VoiceChannel channelName={channelName} channels={channels} addUser={addUser} setSelectedChannel={setSelectedChannel} />)}
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
