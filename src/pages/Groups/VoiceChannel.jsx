import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import React, { useContext, useEffect, useState} from "react";
import {SocketContext} from "../../context/friends-socket-context.js";
import {AuthContext} from "../../context/auth-context.js";
import {GroupContext} from "../../context/group-context.js";
import axios from "axios";
import {
    useJoin, useRTCClient, useClientEvent, useIsConnected, useRemoteAudioTracks,
    useRemoteUsers, useLocalMicrophoneTrack, usePublish, useLocalCameraTrack, useRemoteVideoTracks, useTrackEvent,
} from "agora-rtc-react";

const VoiceChannel = ({channelName, channels, addUser}) => {
    const client = useRTCClient();

    const { localMicrophoneTrack : localAudioTrack}  = useLocalMicrophoneTrack();
    const { localCameraTrack: videoTrack } = useLocalCameraTrack();

    const remoteUsers = useRemoteUsers();

    const videoTracks = useRemoteVideoTracks(remoteUsers);
    const audioTracks = useRemoteAudioTracks(remoteUsers);

    usePublish([localAudioTrack, videoTrack], true, client)
    const [ready, setReady] = useState(true);



    const { chatsSocketApi } = useContext(SocketContext)
    const auth = useContext(AuthContext)
    const groupControl = useContext(GroupContext)

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

    useEffect(() => {
        chatsSocketApi.joinCallListener((member, channelName) => {
            console.log(member, "joining call")
            addUser(channelName, member)
        })
        setReady(true);
        console.log(remoteUsers);
        console.log(localAudioTrack);
        console.log(client);

    }, []);

    useEffect(() =>{
        console.log('rAT', audioTracks);
    }, [videoTracks, remoteUsers])

    const getAgoraToken = async () => {
        const res = await axios.get('http://localhost:8000/getAgoraToken/' + auth.email + '/' + channelName);
        const token = res.data.token;
        console.log("Token: " + token)
        return token;
    }

    useJoin(
        {
            appid: "056e7ee25ec24b4586f17ec177e121d1",
            channel: "general",
            token: "007eJxTYHCur/k18etd7rsbthf4zVrAx7mx98P21XJ7uwr4v2lF6QoqMBiYmqWap6YamaYmG5kkmZhamKUZmqcmG5qbpxoaGaYYNjVeSm0IZGTo8i1gZWSAQBCfnSE9NS+1KDGHgQEA8vghCw",
        },
        ready
    );

    const joinVoiceChannel = async () => {
        chatsSocketApi.joinCall({
            email: auth.email,
            firstName: auth.firstName,
            lastName: auth.lastName,
            pfp: auth.pfpURL
        }, groupControl.selectedGroup, channelName)
    }

    return (
        <>
            <div className="channel" onClick={joinVoiceChannel}>
                <h1>#</h1>
                <h6>{channelName}</h6>
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
            <div style={{paddingLeft: "30px", marginTop: '-5px', paddingBottom: "5px"}}>
                {channels.get(channelName)?.map(member => (
                    <div style={{display: "flex", alignItems: "center", alignContent: "center", paddingTop: "15px"}}>
                        <img src={member.pfp} style={{width: '20px', paddingRight: "10px"}}/>
                        <div style={{textAlign: "center", fontSize: "14px"}}>{member.firstName+' '+member.lastName}</div>
                    </div>
                ))}
            </div>
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