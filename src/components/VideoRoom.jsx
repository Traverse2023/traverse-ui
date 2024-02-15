import AgoraRTC from "agora-rtc-sdk-ng";
import {useEffect, useState} from "react";
import {VideoPlayer} from "./VideoPlayer.jsx";
import axios from "axios";
import {config, useClient, useMicrophoneAndCameraTracks} from "../config/AgoraConfig.js";

export const VideoRoom = (props) => {

    const client = useClient();
    const { setInCall, email, channelId } = props;
    const [start, setStart] = useState(false);
    // Holds user objects containing audio and video streams for all participants
    const [users, setUsers] = useState([]);
    // Holds local users audio and video tracks
    const {ready, tracks} = useMicrophoneAndCameraTracks();

    // handle user joined call event
    const handleUserJoined = async (user, mediaType) => {
        await client.subscribe(user, mediaType);

        if (mediaType === 'video') {
            setUsers((previousUsers) => [...previousUsers, user]);
        }

        if (mediaType === 'audio') {
            user.audioTrack.play();
        }
    };

    // Handle user unpublished media track event
    const handleUserUnpublished = (user, mediaType) => {
        if (mediaType === "audio") {
            if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
            setUsers((prevUsers) => {
                prevUsers.filter((user) => user.id !== user.uid);
            });
        }
    };

    // Handle user left call event
    const handleUserLeft = (user, mediaType) => {
        setUsers((prevUsers) => {
            prevUsers.filter((user) => user.id !== user.uid);
        });
    }

    const getAgoraToken = async () => {
        const res = await axios.get('http://localhost:8000/getAgoraToken/' + props.email + '/' + props.channel);
        const token = res.data.token;
        console.log("Token: " + token)
        return token;
    }

    useEffect(() => {

        let init = async (name) => {

            console.log("Opening video room..");
            console.log("ChannelID: " + props.channel);

            // Agora event listeners
            client.on('user-published', handleUserJoined);
            client.on('user-unpublished', handleUserUnpublished);
            client.on('user-left', handleUserLeft)

            // Try to get agora token and join channel
            try {
                const agoraToken = await getAgoraToken();
                await client.join(config.appId, name, agoraToken, null);
            } catch (e) {
                // TODO: error handling
                console.log(e)
            }
            // If tracks are ready publish them
            if (tracks) await client.publish(tracks)
            // All is ready-setStart state to true
            setStart(true);
        }

        // If user has allowed camera use and tracks are ready initialize
        if (ready && tracks) {
            try {
                init(channelId);
            } catch (e) {
                // TODO: error handling
                console.log(e);
            }
        }

        // cleanup call back. Disconnect and leave
        //     return () => {
        //         //close audio and video tracks
        //         for (let localTrack of localTracks) {
        //             localTrack.stop();
        //             localTrack.close();
        //         }
        //         client.off('user-published', handleUserJoined);
        //         client.off('user-left', handleUserLeft);
        //         client.unpublish(tracks).then(() => client.leave());
        //     };
    }, [channelId, client, ready, tracks]);

    return (
        <div>
            Video Room
            {users.map((user) => (
                <VideoPlayer key={user.uid} user={user}/>
            ))}
        </div>
    );


}




