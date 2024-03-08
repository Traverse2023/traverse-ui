import {
    useClientEvent,
    useJoin,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteAudioTracks,
    useRemoteUsers,
    useRTCClient
} from "agora-rtc-react";
import {useContext, useState} from "react";
import {GroupContext} from "../context/group-context.jsx";
import axios from "axios";
import {AuthContext} from "../context/auth-context.js";
import VideoPlayer from "./VideoPlayer.jsx";

const CallContainer = () => {
    const auth = useContext(AuthContext)
    const [cameraOn, setCameraOn] = useState(false)
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

    usePublish([localMicrophoneTrack])

    const getAgoraToken = async () => {
        const res = await axios.get('http://localhost:8000/getAgoraToken/' + auth.email + '/' + channelId);
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
    return (
        cameraOn ?
        <VideoPlayer cameraOn={cameraOn} />
            :
            null
    )
}

export default CallContainer