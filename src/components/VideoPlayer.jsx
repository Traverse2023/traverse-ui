
import {useContext, useEffect} from "react";
import {GroupContext} from "../context/group-context.jsx";
import axios from "axios";
import {AuthContext} from "../context/auth-context.js";
import {
    LocalVideoTrack,
    RemoteVideoTrack,
    useLocalCameraTrack,
    usePublish,
    useRemoteUsers,
    useRemoteVideoTracks
} from 'agora-rtc-react'
import VideoTrackPagination from "../pages/Groups/VideoTrackPagination.jsx";

const VideoPlayer = ({cameraOn}) => {

    useEffect(() => {
        console.log('videoplayer rendered')
    }, []);

    const {localCameraTrack} = useLocalCameraTrack()
    usePublish([localCameraTrack])

    const remoteUsers = useRemoteUsers()
    const {videoTracks} = useRemoteVideoTracks(remoteUsers)

    useEffect(() => {
        console.log('videoTracks', videoTracks)
        console.log('remoteUsers', remoteUsers)
    }, [videoTracks, remoteUsers])
    return (
        <div style={{position: 'absolute', width: '500px', height: '300px', backgroundColor: 'blue'}}>
            <LocalVideoTrack track={localCameraTrack} play={true}/>
            {/*<VideoTrackPagination localTrack={localCameraTrack} remoteTracks={videoTracks} max={4}/>*/}
            {videoTracks.map(track => (
                <>
                    <RemoteVideoTrack track={track} play={true}/>
                    <label>User</label>
                </>
            ))}
        </div>
    )
}

export default VideoPlayer
