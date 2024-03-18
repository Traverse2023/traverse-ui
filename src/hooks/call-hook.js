import React, {useState, useCallback, useEffect, useContext} from "react";
import {SocketContext} from "../context/friends-socket-context.js";
import {useRTCClient} from "agora-rtc-react";
import {AuthContext} from "../context/auth-context.js";

export const useCall = (selectedGroup) => {
    const auth = useContext(AuthContext)
    const [selectedVoiceChannel, setSelectedVoiceChannel] = useState(null)

    const [inCall, setInCall] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [cameraOn, setCameraOn] = useState(false)
    const [channelUsersMap, setChannelUsersMap] = useState(new Map(["general", "announcements", "events"].map(channelName => [channelName, []])))
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
        chatsSocketApi.joinCall({
            email: auth.email,
            firstName: auth.firstName,
            lastName: auth.lastName,
            pfpURL: auth.pfpURL
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
                email: auth.email
            })

        }
    }, [inCall]);

    const removeUser = (channelName, user) => {
        const updatedChannels = new Map(channelUsersMap);

        for (const [currChannelName, users] of updatedChannels) {
            console.log('going thru channels', currChannelName, users)
            for (let i = 0; i < users.length; i++) {
                const existingUser = users[i]
                if (existingUser.email === user.email) {
                    console.log('found user in this channel, deleting...')
                    users.splice(i, 1)
                    console.log('new array', users)
                    console.log('new map', updatedChannels)
                    break
                }
            }
        }
        console.log(user.email, 'disconnected from', channelName)
        setChannelUsersMap(updatedChannels);
    }
    const addUser = (channelName, user) => {
        // If channel doesn't exist, create a new map
        console.log('invoking addUser', channelName, user, channelUsersMap)
        const updatedChannels = new Map(channelUsersMap); // Copy the map to avoid directly mutating state
        // if (!updatedChannels.has(channelName)) {
        //     updatedChannels.set(channelName, new Map());
        //
        // Remove the user from any existing channels
        for (const [currChannelName, users] of updatedChannels) {
            console.log('going thru channels', currChannelName, users)
            for (let i = 0; i < users.length; i++) {
                const existingUser = users[i]
                if (existingUser.email === user.email) {
                    console.log('found user in this channel, deleting...')
                    users.splice(i, 1)
                    console.log('new array', users)
                    console.log('new map', updatedChannels)
                    break
                }
            }
        }
        // Add the user object to the map for the specified channel
        updatedChannels.get(channelName).push(user);
        setChannelUsersMap(updatedChannels);
    };

    useEffect(() => {
        const response = ['general', 'announcements', 'events']
        setChannelUsersMap(new Map(response.map(channelName => [channelName, []])))
        // Map("general": [{user.email,...}])
        chatsSocketApi?.joinCallListener((member, channelName) => {
            console.log(member, channelName, "joining call");
            joinCallSound.play()
            addUser(channelName, member);
        })
        chatsSocketApi?.disconnectCallListener((member, channelName) => {
            leaveCallSound.play()
            removeUser(channelName, member)
        })
    }, [chatsSocketApi]);


    return { cameraOn, setCameraOn, selectedVoiceChannel, setSelectedVoiceChannel, inCall, setInCall, isMuted, setIsMuted, channelUsersMap };
};
