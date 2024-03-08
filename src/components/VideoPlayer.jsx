
import {useContext} from "react";
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

const VideoPlayer = ({cameraOn}) => {
    const auth = useContext(AuthContext)

    const {localCameraTrack} = useLocalCameraTrack(cameraOn)

    const remoteUsers = useRemoteUsers()
    const {videoTracks} = useRemoteVideoTracks(remoteUsers)
    videoTracks.forEach(track=>track.play())
    usePublish([localCameraTrack])

    return (
        <div style={{position: 'absolute', width: '500px', height: '300px', backgroundColor: 'blue'}}>
            <LocalVideoTrack track={localCameraTrack} play={true}/>
            {videoTracks.map(track => (
                <>
                    <RemoteVideoTrack track={track} play={true}/>
                    <label>Isfar</label>
                </>
            ))}
        </div>
    )
}

export default VideoPlayer