import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {SocketContext} from "../../context/friends-socket-context.js";
import {AuthContext} from "../../context/auth-context.js";
import {GroupContext} from "../../context/group-context.js";
import axios from "axios";
import {
    useJoin, useRTCClient, useClientEvent, useIsConnected, useRemoteAudioTracks,
    useRemoteUsers,
    useRemoteVideoTracks, LocalAudioTrack, RemoteAudioTrack, useLocalMicrophoneTrack, usePublish,
} from "agora-rtc-react";
import {Room} from "./Room.jsx";
import {RenderRemoteUsers} from "./RemoteUsers.jsx";

const VoiceChannel = ({channelName, channels, addUser}) => {
    const [joined, setJoined] = useState(false)
    const [localTrackReady, setLocalTrackReady] = useState(false)
    const isConnected = useIsConnected();
    useEffect(()=> {
        console.log('isConnected', isConnected)
    }, [isConnected, joined])
    const { chatsSocketApi } = useContext(SocketContext)
    const auth = useContext(AuthContext)
    const groupControl = useContext(GroupContext)

    const [micOn, setMic] = useState(true);
    const [cameraOn, setCamera] = useState(false);

    const remoteUsers = useRemoteUsers();
    // const { videoTracks } = useRemoteVideoTracks(remoteUsers);
    const { audioTracks : remoteAudioTracks } = useRemoteAudioTracks(remoteUsers);
    useEffect(() =>{
        console.log('rAT', remoteAudioTracks)
    }, [remoteAudioTracks])
    remoteAudioTracks.map(track => track.play());

    const client = useRTCClient();
    useClientEvent(client, "user-joined", (user) => {
        console.log("user joined", user.uid)
        setLocalTrackReady(true)
    });

    useEffect(() => {
        // console.log('24configuid', config.uid)
        chatsSocketApi.joinCallListener((member, channelName) => {
            console.log(member, "joining call")
            addUser(channelName, member)
        })
    }, []);

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
            token: "007eJxTYCi8Y+Lwck5FxmLzbgf/39PK3PV2zVwoksml/sH90Ofc228UGAxMzVLNU1ONTFOTjUySTEwtzNIMzVOTDc3NUw2NDFMM0z6dS20IZGRwOPeZmZEBAkF8dob01LzUosQcBgYA+vEiRw==",
        },
        joined
    );
    const joinVoiceChannel = async () => {
        setJoined(true)
        chatsSocketApi.joinCall({
            email: auth.email,
            firstName: auth.firstName,
            lastName: auth.lastName,
            pfp: auth.pfpURL
        }, groupControl.selectedGroup, channelName)
    }

    const { localMicrophoneTrack: localAudioTrack } = useLocalMicrophoneTrack(micOn);
    console.log('localTrack', localAudioTrack)
    usePublish([localAudioTrack], localTrackReady, client)

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
            {joined ?
                <>
                    <LocalAudioTrack
                        track={localAudioTrack}
                        muted={false}
                        play={false}
                    />
                    {remoteAudioTracks?.map(track => (
                        <RemoteAudioTrack key={track.getUserId()} play={true} track={track} />
                    ))}
                </>
            : null}
        </>
    )
}


export default VoiceChannel