import AgoraRTC from "agora-rtc-sdk-ng";
import {useEffect, useState} from "react";
import {VideoPlayer} from "./VideoPlayer.jsx";
import axios from "axios";


const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8',
});

export const VideoRoom = (props) => {

    const [users, setUsers] = useState([]);
    const [localTracks, setLocalTracks] = useState([]);

    const handleUserJoined = async (user, mediaType) => {
        await client.subscribe(user, mediaType);

        if (mediaType === 'video') {
            setUsers((previousUsers) => [...previousUsers, user]);
        }

        if (mediaType === 'audio') {
            user.audioTrack.play()
        }
    };
    const getAgoraToken = async () => {
        const res = await axios.get('http://localhost:8000/getAgoraToken/' + props.email + '/' + props.channel);
        const token = res.data.token;
        console.log("Token: " + token)
        return token;
    }

    const handleUserLeft = (user) => {
        setUsers((previousUsers) =>
            previousUsers.filter((u) => u.uid !== user.uid)
        );
    };

    useEffect(() => {
        console.log("Open video room..");
        console.log("AppID: " + '056e7ee25ec24b4586f17ec177e121d1');
        console.log("ChannelID: " + props.channel);

        client.on('user-published', handleUserJoined);
        client.on('user-left', handleUserLeft);

        getAgoraToken().then((token) =>
            client.join('056e7ee25ec24b4586f17ec177e121d1', props.channel, token, null))
            .then((uid) =>
                Promise.all([
                    AgoraRTC.createMicrophoneAndCameraTracks(),
                    uid,
                ])
            )
            .then(([tracks, uid]) => {
                const [audioTrack, videoTrack] = tracks;
                setLocalTracks([audioTrack, videoTrack]);
                setUsers((previousUsers) => [
                    ...previousUsers,
                    {
                        uid,
                        videoTrack,
                        audioTrack,
                    },
                ]);
                client.publish([audioTrack, videoTrack]).then(r => console.log("Tracks published"));
            });

        // cleanup call back. Disconnect and leave
        return () => {
            //close audio and video track
            for (let localTrack of localTracks) {
                localTrack.stop();
                localTrack.close();
            }
            client.off('user-published', handleUserJoined);
            client.off('user-left', handleUserLeft);
            //client.unpublish(localTracks).then(() => client.leave());
        };
    }, []);
    return (
        <div>
            Video Room
            {users.map((user) => (
                <VideoPlayer key={user.uid} user={user}/>
            ))}
        </div>
    );

}


