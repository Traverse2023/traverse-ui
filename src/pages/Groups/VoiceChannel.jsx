import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import React, {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../context/friends-socket-context.js";
import {AuthContext} from "../../context/auth-context.js";
import {GroupContext} from "../../context/group-context.tsx";
import axios from "axios";
import {
    useClientEvent,
    useJoin,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteAudioTracks,
    useRemoteUsers, useRemoteVideoTracks,
    useRTCClient,
} from "agora-rtc-react";
import useSound from "use-sound";

const VoiceChannel = ({ channelName, users }) => {

    const { setShowVideoView, setSelectedVoiceChannel, selectedVoiceChannel, speakerUid } = useContext(GroupContext);

    useEffect(() => {
        console.log('invoking speakerUidVC', speakerUid)
    }, [speakerUid])
    const remoteUsers = useRemoteUsers()
    const {videoTracks} = useRemoteVideoTracks(remoteUsers)
    const client = useRTCClient();
    function getUserAudioVolume(uid) {
        // Get the remote audio stream associated with the user ID
        console.log('here')
        const user = client.remoteUsers.find(user => {
            console.log(user)
            return user.uid === uid});

        return user?.audioTrack?.getVolumeLevel()

    }

    const [channelStyle, setChannelStyle] = React.useState("channel inactive");

    useEffect(() => {
        if (channelName == selectedVoiceChannel) {
            setChannelStyle("channel active");
        } else {
            setChannelStyle("channel inactive");
        }
    }, [selectedVoiceChannel])

    return (
        <>
            <div className={channelStyle} onClick={() => {
                if (selectedVoiceChannel === channelName) {
                    setShowVideoView(prevState => !prevState)
                }
                setSelectedVoiceChannel(channelName)
                console.log('invoking videoTracksinvoicechannel', videoTracks, remoteUsers)
            }}>
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
                        {
                            speakerUid === member.agoraUid ?
                                <img id={member.agoraUid} src={member.pfpURL} style={{width: '20px', paddingRight: "10px", border: 'solid 2px', borderColor: 'green'}}/>
                            :
                                <img id={member.agoraUid} src={member.pfpURL} style={{width: '20px', paddingRight: "10px"}}/>
                        }
                        <div style={{
                            textAlign: "center",
                            fontSize: "14px"
                        }} onClick={() => console.log('sound',getUserAudioVolume(member.agoraUid))}>{member.firstName + ' ' + member.lastName + ' ' + member.agoraUid}</div>
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