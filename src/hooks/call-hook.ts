import {useState,  useEffect, useContext} from "react";
import {SocketContext} from "../context/friends-socket-context.js";
import {useRTCClient} from "agora-rtc-react";
import {useAuth} from "./useAuth";


export enum VideoPlayerEnum {
    PORTABLE,
    FIT,
    FULL
}

export const useCall = (selectedGroup: any) => {
    const {user} = useAuth();
    //call states
    const [inCall, setInCall] = useState(false)
    const [channelUsersMap, setChannelUsersMap] = useState(new Map(["general", "announcements", "events"].map(channelName => [channelName, []])))
    const [agoraConfig, setAgoraConfig] = useState({appid: "", channel: "", token: "", uid: undefined})

    useEffect(() => {
        console.log('invoking agoraconfighook', agoraConfig)
    }, [agoraConfig]);

    //voice call states
    const [selectedVoiceChannel, setSelectedVoiceChannel] = useState(null)
    const [isMuted, setIsMuted] = useState(false)
    const [speakerUid, setSpeakerUid] = useState(null)
    const [currentUserUid, setCurrentUserUid] = useState(null)

    //video call states
    const [cameraOn, setCameraOn] = useState(false)

    const [videoPlayerType, setVideoPlayerType] = useState<VideoPlayerEnum>(VideoPlayerEnum.FIT)

    const [shareScreen, setShareScreen] = useState(false)

    const { chatsSocketApi } = useContext(SocketContext);
    const joinCallSound = new Audio("/audio/joincall.wav")
    const leaveCallSound = new Audio("/audio/leavecall.wav")
    const client = useRTCClient()
    const disconnectVoiceChannel = async() => {
        setInCall(false);
        // console.log('localmictrack', localMicrophoneTrack);
        // await localMicrophoneTrack?.setEnabled(false);
        await client.leave();
    }
    const joinVoiceChannel = async () => {
        await disconnectVoiceChannel();
        client.enableAudioVolumeIndicator()
        // @ts-ignore
        chatsSocketApi.joinCall({
            email: user?.username,
            firstName: user?.firstName,
            lastName: user?.lastName,
            pfpURL: user?.pfpUrl,
            agoraUid: agoraConfig.uid
        }, selectedGroup, selectedVoiceChannel)
        setInCall(true);
    }

    useEffect(() => {
        if (selectedVoiceChannel) {
            joinVoiceChannel().then(res => console.log(res)).catch(err => console.log(err));
        }
    }, [selectedVoiceChannel])


    useEffect(() => {
        if (!inCall) {
            console.log("removing self from voice channel")
            removeUser(selectedVoiceChannel, {
                id: user?.id
            })

        }
    }, [inCall]);

    const removeUser = (channelName: any, user: any) => {
        const updatedChannels = new Map(channelUsersMap);

        // @ts-ignore
        for (const [currChannelName, users] of updatedChannels) {
            console.log('going thru channels', currChannelName, users)
            for (let i = 0; i < users.length; i++) {
                const existingUser = users[i]
                if (existingUser.id === user.id) {
                    console.log('found user in this channel, deleting...')
                    users.splice(i, 1)
                    console.log('new array', users)
                    console.log('new map', updatedChannels)
                    break
                }
            }
        }
        console.log(user.id, 'disconnected from', channelName)
        setChannelUsersMap(updatedChannels);
    }
    const addUser = (channelName: any, user: any) => {
        // If channel doesn't exist, create a new map
        console.log('invoking addUser', channelName, user, channelUsersMap)
        const updatedChannels = new Map(channelUsersMap); // Copy the map to avoid directly mutating state
        // if (!updatedChannels.has(channelName)) {
        //     updatedChannels.set(channelName, new Map());
        //
        // Remove the user from any existing channels
        // @ts-ignore
        for (const [currChannelName, users] of updatedChannels) {
            console.log('going thru channels', currChannelName, users)
            for (let i = 0; i < users.length; i++) {
                const existingUser = users[i]
                if (existingUser.id === user.id) {
                    console.log('found user in this channel, deleting...')
                    users.splice(i, 1)
                    console.log('new array', users)
                    console.log('new map', updatedChannels)
                    break
                }
            }
        }
        // Add the user object to the map for the specified channel
        // @ts-ignore
        updatedChannels.get(channelName).push(user);
        setChannelUsersMap(updatedChannels);
    };

    useEffect(() => {
        const response = ['general', 'announcements', 'events']
        setChannelUsersMap(new Map(response.map(channelName => [channelName, []])))
        // Map("general": [{user.email,...}])
        // @ts-ignore
        chatsSocketApi?.joinCallListener((member, channelName) => {
            console.log(member, channelName, "joining call");
            joinCallSound.play()
            addUser(channelName, member);
        })
        // @ts-ignore
        chatsSocketApi?.disconnectCallListener((member, channelName) => {
            leaveCallSound.play()
            removeUser(channelName, member)
        })
    }, [chatsSocketApi]);


    return { shareScreen, setShareScreen, currentUserUid, setCurrentUserUid, speakerUid, setSpeakerUid, cameraOn, setCameraOn, selectedVoiceChannel, setSelectedVoiceChannel, inCall, setInCall, isMuted, setIsMuted, channelUsersMap, videoPlayerType, setVideoPlayerType, agoraConfig, setAgoraConfig };
};
