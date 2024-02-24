import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import React, {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../context/friends-socket-context.js";
import {AuthContext} from "../../context/auth-context.js";
import {GroupContext} from "../../context/group-context.js";
import axios from "axios";
import {
    useClientEvent,
    useJoin,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteAudioTracks,
    useRemoteUsers,
    useRTCClient,
} from "agora-rtc-react";
import useSound from "use-sound";

const VoiceChannel = ({ channelName, users }) => {


    // useEffect(() => {
    //     chatsSocketApi.disconnectCall({email: auth.email},groupControl.selectedGroup, channelName)
    // }, [groupControl.triggerDisconnect])
    //i think i got it below, i did users.get(channelName) on lineok reload on voice again not working
    //discord
    useEffect(() => {

    })

    // if (deviceLoading) return <div>Loading devices...</div>;

    const { setSelectedVoiceChannel } = useContext(GroupContext);

    return (
        <>
            <div className="channel" onClick={() => setSelectedVoiceChannel(channelName)}>
                <h1>#</h1>
                <h6>{channelName}</h6>
                <OverlayTrigger
                    placement="top"
                    delay={{show: 250, hide: 400}}
                    overlay={
                        <Tooltip className="tooltip">Edit Channel</Tooltip>
                    }
                >
                    <button>*</button>
                </OverlayTrigger>
                {/* <button>*</button> */}

            </div>
            <div style={{paddingLeft: "30px", marginTop: '-5px', paddingBottom: "5px"}}>
                {users.get(channelName)?.map(member => (
                    <div style={{display: "flex", alignItems: "center", alignContent: "center", paddingTop: "15px"}}>
                        <img src={member.pfpURL} style={{width: '20px', paddingRight: "10px"}}/>
                        <div style={{
                            textAlign: "center",
                            fontSize: "14px"
                        }} onClick={() => console.log(member.firstName)}>{member.firstName + ' ' + member.lastName}</div>
                    </div>
                ))}
            </div>
            {/*<button onClick={mute}>Mute</button>*/}
            {/*{joined ? <Room*/}
            {/*    cameraOn={cameraOn}*/}
            {/*    micOn={micOn}*/}
            {/*    renderRemoteUsers={() => <RenderRemoteUsers audioTracks={remoteAudioTracks} />}*/}
            {/*/>: null}*/}
            {/*{joined ?*/}
            {/*    <>*/}
            {/*        <LocalAudioTrack*/}
            {/*            track={localAudioTrack}*/}
            {/*            muted={false}*/}
            {/*            play={false}*/}
            {/*        />*/}
            {/*        {remoteAudioTracks?.map(track => (*/}
            {/*            <RemoteAudioTrack key={track.getUserId()} play={true} track={track} />*/}
            {/*        ))}*/}
            {/*    </>*/}
            {/*: null}*/}
        </>
    )
}


export default VoiceChannel