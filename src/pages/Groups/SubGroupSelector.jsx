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
import MediaControls from "./MediaControls.jsx";
import {
    useClientEvent, useJoin,
    useLocalMicrophoneTrack, usePublish,
    useRemoteAudioTracks,
    useRemoteUsers,
    useRTCClient
} from "agora-rtc-react";
import useSound from "use-sound";
import axios from "axios";

const SubGroupSelector = () => {
    const [show, setShow] = React.useState(false);
    const target = React.useRef(null);
    const [rtcProps, setRtcProps] = React.useState(null)
    const [createModal, setCreateModal] = React.useState(false);
    const auth = useContext(AuthContext)
    // const { chatsSocketApi } = useContext(SocketContext)
    const [channelUsersMap, setChannelUsersMap] = useState(new Map(["general", "announcements", "events"].map(channelName => [channelName, []])))
    // const [play] = useSound("/audio/joincall.wav");
    const joinCallSound = new Audio("/audio/joincall.wav")
    const leaveCallSound = new Audio("/audio/leavecall.wav")

    // const [play] = useSound("/audio/leavecall.wav")
    const { chatsSocketApi } = useContext(SocketContext);
    const { selectedGroup, selectedTextChannel, selectedVoiceChannel, inCall, setInCall } = useContext(GroupContext);
    // Unique string to identify channel when creating agora token and connecting to agora
    const channelId = selectedGroup.groupId + "-" + selectedVoiceChannel;
    // Pulls existing client from AgoraProvider
    const client = useRTCClient();
    // Get local microphone tracks
    const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
    // Get auto updating remote user objects
    const remoteUsers = useRemoteUsers()

    const { audioTracks } = useRemoteAudioTracks(remoteUsers);

    useEffect(() => {
        console.log('invoking cUsersMap', channelUsersMap)
    }, [channelUsersMap]);

    useEffect(() => {
        const response = ['general', 'announcements', 'events']
        setChannelUsersMap(new Map(response.map(channelName => [channelName, []])))
        // Map("general": [{user.email,...}])
        chatsSocketApi.joinCallListener((member, channelName) => {
            console.log(member, channelName, "joining call");
            joinCallSound.play()
            addUser(channelName, member);
        })
        chatsSocketApi.disconnectCallListener((member, channelName) => {
            leaveCallSound.play()
            removeUser(channelName, member)
        })
    }, []);

    const addUser = (channelName, user) => {
        // If channel doesn't exist, create a new map
        console.log('invoking addUser', channelName, user, channelUsersMap)
        const updatedChannels = new Map(channelUsersMap); // Copy the map to avoid directly mutating state
        // if (!updatedChannels.has(channelName)) {
        //     updatedChannels.set(channelName, new Map());
        //
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
        console.log('invoking updatedChannels', updatedChannels)
        console.log('invoking channelname', channelName)
        console.log('invoking user', user)
        updatedChannels.get(channelName).push(user);
        console.log('added to new channel', channelName)
        setChannelUsersMap(updatedChannels);
    };

    useEffect(() => {
        if (!inCall) {
            console.log("removing self from voice channel")
            removeUser(selectedVoiceChannel, {
                email: auth.email
            })

        }
    }, [inCall]);

    const removeUser = (channelName, user) => {
        const updatedChannels = new Map(channelUsersMap);

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
        console.log(user.email, 'disconnected from', channelName)
        setChannelUsersMap(updatedChannels);
    }

    useEffect(() => {
        console.log('channels map', channelUsersMap)
    }, [channelUsersMap])



    usePublish([localMicrophoneTrack])

    const getAgoraToken = async () => {
        const res = await axios.get('http://load-balancer-for-main-service-1482477395.us-east-1.elb.amazonaws.com/getAgoraToken/' + auth.email + '/' + channelId);
        const token = res.data.token;
        console.log("Token:  " + token)
        return {
            appid: "056e7ee25ec24b4586f17ec177e121d1",
            channel: channelId,
            token: token,
        };
    }
//
    useJoin(async () => {

            return getAgoraToken();
        },
        inCall
    );

    audioTracks.map((track) => track.play())

    useEffect(() => {





        console.log("Remote users: " + remoteUsers);
        // localMicrophoneTrack.play()

    }, []);


    const disconnectVoiceChannel = async() => {
        setInCall(false);
        console.log('localmictrack', localMicrophoneTrack);
        // await localMicrophoneTrack?.setEnabled(false);
        await client.leave();
    }

    // const mute = async () => {
    //     console.log('mute')
    //     await localMicrophoneTrack?.setEnabled(false)
    //     //localMicrophoneTrack?.setEnabled(false).then(() => localMicrophoneTrack.setMuted(true)).catch(err => console.log(err))
    // }

    const joinVoiceChannel = async () => {
        await disconnectVoiceChannel();
        chatsSocketApi.joinCall({
            email: auth.email,
            firstName: auth.firstName,
            lastName: auth.lastName,
            pfpURL: auth.pfpURL
        }, selectedGroup, selectedVoiceChannel)
        setInCall(true);
    }

    useEffect(() => {
        if (selectedVoiceChannel) {
            joinVoiceChannel().then(res => console.log(res)).catch(err => console.log(err));
        }
    }, [selectedVoiceChannel])


    useClientEvent(client, "user-left", (user) => {
        console.log("user-left")
    })

    useClientEvent(client, "user-unpublished", (user, mediaType) => {
        console.log("user-unpublished")
    });

    useClientEvent(client, "user-joined", (user) => {
        console.log("user joined", user.uid, user);
    });

    useClientEvent(client, "user-published", (user, mediaType) => {
        console.log("user-published", user, mediaType)
    })




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
                {[...channelUsersMap.keys()].map(channelName => <VoiceChannel channelName={channelName} users={channelUsersMap} />)}
            </div>
            {/* </div> */}
            <div className="bottom-tab">
                <MediaControls />
            </div>
        </div>
    );
};

export default SubGroupSelector;
