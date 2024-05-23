import {UID,
    useClientEvent,
    useJoin,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteAudioTracks,
    useRemoteUsers,
    useRTCClient
} from "agora-rtc-react";
import {useContext, useEffect} from "react";
import {GroupContext} from "../context/group-context.jsx";
import PortableMedia from "./PortableMedia.jsx";
import {VideoPlayerEnum} from "../hooks/call-hook";
import {getAgoraRTCToken} from "../api/main-service";

const CallContainer = () => {

    const { currentUserUid, setCurrentUserUid, videoPlayerType, setVideoPlayerType, cameraOn, selectedGroup, selectedTextChannel, selectedVoiceChannel, inCall, setInCall, isMuted, agoraConfig, setAgoraConfig, setSpeakerUid } = useContext(GroupContext);
    // Unique string to identify channel when creating agora token and connecting to agora
    // @ts-ignore
    const channelId = selectedGroup.groupId + "-" + selectedVoiceChannel;
    // Pulls existing client from AgoraProvider
    const client = useRTCClient();
    // Get local microphone tracks
    const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
    // Get auto updating remote user objects
    const remoteUsers = useRemoteUsers()

    const { audioTracks } = useRemoteAudioTracks(remoteUsers);

    usePublish([localMicrophoneTrack])

    useEffect(() => {
        if (typeof isMuted === "boolean" ) {
            localMicrophoneTrack?.setMuted(isMuted)
        }
    }, [isMuted]);

    useEffect(() => {
        //@ts-ignore
        getToken().then(config => setAgoraConfig(config))
    }, [selectedVoiceChannel]);

    useEffect(() => {
        console.log('Agora config: ', agoraConfig);
    }, [agoraConfig]);

    const getToken = async () => {
        // @ts-ignore
        const res = await getAgoraRTCToken(channelId);
        const token: string = res.data.token;
        setCurrentUserUid(res.data.uid)
        console.log("Token:  " + token, "invoking uid: ", res.data.uid)
        return {
            appid: "056e7ee25ec24b4586f17ec177e121d1",
            channel: channelId,
            token: token,
            uid: res.data.uid
        };
    }

    useJoin(async () => {
            return getToken();
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
        console.log("user joined", user.uid);
    });

    useClientEvent(client, "volume-indicator", volumes => {
        console.log("this user's volume", currentUserUid)
        volumes.forEach(volume => {
            console.log("uid", volume.uid, "level", volume.level)
            if (volume.level > 40) {
                setSpeakerUid(volume.uid)
            }
        })
    })

    function getUserAudioVolume(uid: UID) {
        // Get the remote audio stream associated with the user ID
        const user = client.remoteUsers.find(user => user.uid === uid);

        return user?.audioTrack?.getVolumeLevel()

    }

    useClientEvent(client, "user-published", (user, mediaType) => {
        console.log("user-published", user, mediaType)
    })
    useEffect(() => {
        console.log('invoking videoPlayerType', videoPlayerType)
        console.log('invoking cameraOn', cameraOn)
    }, [cameraOn]);
    return (
        inCall ?
            (() => {
                switch (videoPlayerType) {
                    case VideoPlayerEnum.PORTABLE:
                        return <PortableMedia />
                    default:
                        return null
                }
            })()
        :
            null
    )
}

export default CallContainer