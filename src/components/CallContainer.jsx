import {
    useClientEvent,
    useJoin,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteAudioTracks,
    useRemoteUsers,
    useRTCClient
} from "agora-rtc-react";
import {useContext, useEffect, useState} from "react";
import {GroupContext} from "../context/group-context.jsx";
import axios from "axios";
import {AuthContext} from "../context/auth-context.js";
import VideoPlayer from "./VideoPlayer.jsx";
import PortableMedia from "./PortableMedia.jsx";

const CallContainer = () => {
    const auth = useContext(AuthContext)
    const {cameraOn} = useContext(GroupContext)
    const { isPortableMediaToggled, setIsPortableMediaToggled, selectedGroup, selectedTextChannel, selectedVoiceChannel, inCall, setInCall } = useContext(GroupContext);
    // Unique string to identify channel when creating agora token and connecting to agora
    const channelId = selectedGroup.groupId + "-" + selectedVoiceChannel;
    // Pulls existing client from AgoraProvider
    const client = useRTCClient();
    // Get local microphone tracks
    const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
    // Get auto updating remote user objects
    const remoteUsers = useRemoteUsers()

    const { audioTracks } = useRemoteAudioTracks(remoteUsers);

    usePublish([localMicrophoneTrack])

    const getAgoraToken = async () => {
        const res = await axios.get(import.meta.env.VITE_APP_BACKEND_URL+'getAgoraToken/' + auth.email + '/' + channelId);
        const token = res.data.token;
        console.log("Token:  " + token)
        return {
            appid: "056e7ee25ec24b4586f17ec177e121d1",
            channel: channelId,
            token: token,
        };
    }

    useJoin(async () => {

            return getAgoraToken();
        },
        inCall
    );

    audioTracks.map((track) => track.play())

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
        console.log('invoking isPortable', isPortableMediaToggled)
        console.log('invoking cameraOn', cameraOn)
    }, [cameraOn]);
    return (
        isPortableMediaToggled ?
            <PortableMedia />
        :
        cameraOn ?
            <VideoPlayer cameraOn={cameraOn} />
            :
            null
    )
}

export default CallContainer