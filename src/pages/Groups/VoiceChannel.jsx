import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import React, { useContext, useEffect, useState} from "react";
import {SocketContext} from "../../context/friends-socket-context.js";
import {AuthContext} from "../../context/auth-context.js";
import {GroupContext} from "../../context/group-context.js";
import axios from "axios";
import {
    useJoin,
    useClientEvent,
    useIsConnected,
    useRemoteAudioTracks,
    useRemoteUsers,
    useLocalMicrophoneTrack,
    usePublish,
    useLocalCameraTrack,
    useRemoteVideoTracks, useRTCClient,

} from "agora-rtc-react";

const VoiceChannel = ({channelName, channels, addUser}) => {
    const { chatsSocketApi } = useContext(SocketContext)
    const auth = useContext(AuthContext)
    const groupControl = useContext(GroupContext)

    const client = useRTCClient();

    // Local media tracks
    const { isLoading: isLoadingMic, localMicrophoneTrack }  = useLocalMicrophoneTrack();
    const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();

    const remoteUsers = useRemoteUsers();

    const isConnected = useIsConnected();

    const [token, setToken] = useState("");

    const [inCall, setInCall] = useState(false);

    const { videoTracks } = useRemoteVideoTracks(remoteUsers);
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);

    usePublish([localMicrophoneTrack, localCameraTrack])

    useJoin(
        {
            appid: "056e7ee25ec24b4586f17ec177e121d1",
            channel: "general ",
            token: token === "" ? null : token,
            uid: auth.email
        },
        inCall
    );

    audioTracks.map((track) => track.play())



    const getAgoraToken = async () => {
        const res = await axios.get('http://127.0.0.1:8000/getAgoraToken/' + auth.email + '/' + groupControl.selectedGroup + "-" + groupControl.selectedChannel);
        const token = res.data.token;
        console.log("Token: " + token)
        return token;
    }


    useEffect(() => {

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
        chatsSocketApi.joinCallListener((member, channelName) => {
            console.log(member, "joining call")
            addUser(channelName, member)
        })

        console.log(remoteUsers);

    }, []);


    useEffect(() =>{
        console.log('rAT', audioTracks);
    }, [videoTracks, remoteUsers])



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