import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import React, {createContext, useContext, useEffect, useRef} from "react";
import {SocketContext} from "../../context/friends-socket-context.js";
import {AuthContext} from "../../context/auth-context.js";
import {GroupContext} from "../../context/group-context.js";
import AgoraRTC from 'agora-rtc-sdk-ng';
import axios from "axios";
import {
    RemoteUser,
    useJoin,
    useLocalMicrophoneTrack,
    usePublish,
    useRTCClient,
    useRemoteUsers,
    useClientEvent, AgoraRTCProvider,
} from "agora-rtc-react";

import { IMicrophoneAudioTrack, ICameraVideoTrack } from "agora-rtc-sdk-ng";

const VoiceChannel = ({channelName, channels, addUser}) => {
    const { chatsSocketApi } = useContext(SocketContext)
    const auth = useContext(AuthContext)
    const groupControl = useContext(GroupContext)

    const agoraEngine = useRTCClient(AgoraRTC.createClient({ codec: "vp8", mode: 'rtc' }))
    const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
    const remoteUsers = useRemoteUsers();
    usePublish([localMicrophoneTrack]);

    useEffect(() => {
        // console.log('24configuid', config.uid)
        chatsSocketApi.joinCallListener((member, channelName) => {
            console.log(member, "joining call")
            addUser(channelName, member)
        })
    }, []);
    const joinVoiceChannel = () => {
        joinAgoraChannel()
        chatsSocketApi.joinCall({
            email: auth.email,
            firstName: auth.firstName,
            lastName: auth.lastName,
            pfp: auth.pfpURL
        }, groupControl.selectedGroup, channelName)
    }

    const localStreamRef = useRef(null);

    useClientEvent(agoraEngine, "user-joined", (user) => {
        console.log("The user" , user.uid , " has joined the channel");
    });

    useClientEvent(agoraEngine, "user-left", (user) => {
        console.log("The user" , user.uid , " has left the channel");
    });

    useClientEvent(agoraEngine, "user-published", (user, mediaType) => {
        console.log("The user" , user.uid , " has published media in the channel");
    });

    const joinAgoraChannel = async () => {
        axios.get('http://localhost:8000/getAgoraToken/' + auth.email + '/' + groupControl.selectedGroup.groupId + '-' +channelName).then(response => {
            const appId = '056e7ee25ec24b4586f17ec177e121d1';
            const token = response.data.token
            const uid = 0
            console.log('token', token)
            console.log('uuid', uid)
            const client = AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' });

            useJoin({
                appid: "056e7ee25ec24b4586f17ec177e121d1",
                channel: groupControl.selectedGroup.groupId + '-' + channelName,
                token: token,
                uid: uid,
            });


        })
    };
    const AgoraContext = createContext(null);
    const AgoraProvider = ({ children, localMicrophoneTrack }) => (
        <AgoraContext.Provider value={{ localMicrophoneTrack, children }}>
            {children}
        </AgoraContext.Provider>
    );

    return (
        <>
            <div className="channel" onClick={joinVoiceChannel}>
                <div id="local_stream" ref={localStreamRef}></div>
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
                <AgoraRTCProvider client={agoraEngine}>
                    <AgoraProvider localMicrophoneTrack={localMicrophoneTrack}>
                        {children}
                        {remoteUsers.map((remoteUser) => (
                            <div key={remoteUser.uid}>
                                <RemoteUser user={remoteUser} playVideo={false} playAudio={true} />
                            </div>
                        ))}
                    </AgoraProvider>
                </AgoraRTCProvider>
            </div>
        </>
    )
}


export default VoiceChannel