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

const VoiceChannel = ({ channelName, channels, addUser, removeUser }) => {
    const [play] = useSound("/audio/joincall.wav");
    const { chatsSocketApi } = useContext(SocketContext)
    const auth = useContext(AuthContext)
    const { selectedGroup } = useContext(GroupContext);
    const [inCall, setInCall] = useState(false)
    // Unique string to identify channel when creating agora token and connecting to agora
    const channelId = selectedGroup.groupId + "-" + channelName;

    // Pulls existing client from AgoraProvider
    const client = useRTCClient();

    // Get local microphone tracks
    const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
    // Get auto updating remote user objects
    const remoteUsers = useRemoteUsers();

    // useEffect(() => {
    //     if (inCall) groupControl.setInCall(true)
    // }, [inCall]);

    const { audioTracks } = useRemoteAudioTracks(remoteUsers);

    usePublish([localMicrophoneTrack])

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

    const getAgoraToken = async () => {
        const res = await axios.get('http://127.0.0.1:8000/getAgoraToken/' + auth.email + '/' + channelId);
        const token = res.data.token;
        console.log("Token:  " + token)
        return {
            appid: "056e7ee25ec24b4586f17ec177e121d1",
            channel: channelId,
            token: token,
        };
    }

    useJoin(async () => {
        console.log()
            return getAgoraToken();
    },
        inCall
    );

    audioTracks.map((track) => track.play())

    const deviceLoading = isLoadingMic;

    const deviceUnavailable = !localMicrophoneTrack;


    useEffect(() => {
        chatsSocketApi.joinCallListener((member, channelName) => {
            console.log(member, "joining call");
            // play()
            addUser(channelName, member);
        })

        chatsSocketApi.disconnectCallListener((member, channelName) => {
            removeUser(channelName, member)
        })

        console.log("Remote users: " + remoteUsers);
        // localMicrophoneTrack.play()

    }, []);


    useEffect(() => {
        console.log('rAT', audioTracks);
    }, [remoteUsers])

    const disconnectVoiceChannel = async() => {
        setInCall(false);
        console.log('localmictrack', localMicrophoneTrack);
        await localMicrophoneTrack?.setEnabled(false);
        await client.leave();
    }

    // const mute = async () => {
    //     console.log('mute')
    //     await localMicrophoneTrack?.setEnabled(false)
    //     //localMicrophoneTrack?.setEnabled(false).then(() => localMicrophoneTrack.setMuted(true)).catch(err => console.log(err))
    // }

    const joinVoiceChannel = async () => {
        // setSelectedChannel(channelName);
        await disconnectVoiceChannel();

        chatsSocketApi.joinCall({
            email: auth.email,
            firstName: auth.firstName,
            lastName: auth.lastName,
            pfpURL: auth.pfpURL
        }, selectedGroup, channelName)
        setInCall(true);
    }

    // useEffect(() => {
    //     chatsSocketApi.disconnectCall({email: auth.email},groupControl.selectedGroup, channelName)
    // }, [groupControl.triggerDisconnect])






    // if (deviceLoading) return <div>Loading devices...</div>;

    return (
        <>
            <div className="channel" onClick={joinVoiceChannel}>
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
                {channels.get(channelName)?.map(member => (
                    <div style={{display: "flex", alignItems: "center", alignContent: "center", paddingTop: "15px"}}>
                        <img src={member.pfpURL} style={{width: '20px', paddingRight: "10px"}}/>
                        <div style={{
                            textAlign: "center",
                            fontSize: "14px"
                        }} onClick={() => console.log(member)}>{member.firstName + ' ' + member.lastName}</div>
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