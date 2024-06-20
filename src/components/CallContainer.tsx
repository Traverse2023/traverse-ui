import {
    FetchArgs, UID,
    useClientEvent,
    useJoin, useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteAudioTracks,
    useRemoteUsers,
    useRTCClient
} from "agora-rtc-react";
import {useContext, useEffect, useState} from "react";
import {GroupContext} from "../context/group-context.jsx";

import PortableMedia from "./PortableMedia.jsx";
import {VideoPlayerEnum} from "../hooks/call-hook";
import {getAgoraRTCToken} from "../api/main-service";

const CallContainer = () => {
    const { inCall, setCurrentUserUid, videoPlayerType, cameraOn, selectedGroup, selectedVoiceChannel, isMuted, agoraConfig, setAgoraConfig, setSpeakerUid } = useContext(GroupContext);
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

    // const [uid, setUid] = useState(null)
    // const [agoraConfig, setAgoraConfig] = useState<FetchArgs>({appid: "", channel: "", token: "", uid: undefined})

    useEffect(() => {
        //@ts-ignore
        getToken().then((config) => setAgoraConfig(config))
    }, [selectedVoiceChannel]);

    useEffect(() => {
        console.log('53agoraConfig', agoraConfig)
    }, [agoraConfig]);

    useEffect(() => {
        console.log('invoking cameraOn2', cameraOn)
    }, [cameraOn]);

    const getToken = async () => {
        const res = await getAgoraRTCToken(channelId);
        const token = res.data.token;
        setCurrentUserUid(res.data.uid)
        console.log("Token:  " + token, "invoking uid: ", res.data.uid)
        return {
            appid: "056e7ee25ec24b4586f17ec177e121d1",
            channel: channelId,
            token: token,
            uid: res.data.uid
        };
    }

    useJoin(async() => {
        return getToken()
    },  inCall);

    audioTracks.map((track) => track.play())

    useClientEvent(client, "user-left", (user) => {
        console.log("user-left")
    })

    useClientEvent(client, "user-unpublished", (user, mediaType) => {
        console.log("user-unpublished")
    });

    useClientEvent(client, "user-joined", (user) => {
        console.log("user joined", user.uid);
        // console.log('this user', uid)
    });

    useClientEvent(client, "volume-indicator", volumes => {
        let isAnyoneSpeaking = false
        const speakerPromise  = () => new Promise((res, rej) => {
            volumes.forEach(volume => {
                if (volume.level > 40) {
                    setSpeakerUid(volume.uid)
                    res(true)
                }
            })
            res(false)
        })

        speakerPromise().then(isAnyoneSpeaking => {
            if (!isAnyoneSpeaking) {
                setSpeakerUid(null)
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