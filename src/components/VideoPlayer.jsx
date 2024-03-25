
import {useContext, useEffect, useState} from "react";
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

    // useEffect(() => {
    //     console.log('invoking videoTracks', videoTracks)
    //     console.log('invoking remoteUsers', remoteUsers)
    // }, [videoTracks])

    const [page, setPage] = useState(0);
    const max = 4

    // const remoteUsers = useRemoteUsers()
    // const {localCameraTrack} = useLocalCameraTrack()
    // const {videoTracks} = useRemoteVideoTracks(remoteUsers)

    useEffect(() => {
        console.log('invoking localTrack', localCameraTrack)
        console.log('invoking remoteUsers', remoteUsers)
        console.log('invoking remoteTracks', videoTracks)
    }, [localCameraTrack, remoteUsers, videoTracks])

    const next = () => {
        setPage((prev) => {
            return prev + 1;
        });
    };

    const prev = () => {
        setPage((prev) => {
            return prev - 1;
        });
    };


    const currentChildren = () => {
        let x = []
        if (page === 0) {
            x = [<LocalVideoTrack track={localCameraTrack} play={true} style={{width: "300px", height: "200px", zIndex: "99999999999999"}}/>];
        }
        console.log('invoking videoTracks in curr children', remoteUsers)
        for (let i = page * max; i < page * max + max; i++) {
            if (i >= page * max && i < page * max + max && i < remoteUsers.length) {
                console.log('invoking videoTrack', remoteUsers[i])
                x.push(<RemoteVideoTrack track={remoteUsers[i].videoTrack} play={true}  style={{width: "300px", height: "200px", zIndex: "99999999999999"}}/>);
            }
        }
        console.log('invoking x', x)
        return x;
    };
    return (
        <div style={{margin: "0 auto",
            display: "flex", justifyContent: "center",
            alignItems: "center", gap: "10px",
            color: "white",
            flexWrap: "wrap", position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black', top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
            {currentChildren()}
            Page {page + 1}
            {page > 0 && <button style={{color: "white"}} onClick={prev}>Prev</button>}
            {remoteUsers.length+1 > (page + 1) * max && <button style={{color: "white"}} onClick={next}>Next</button>}
            {/*<LocalVideoTrack track={localCameraTrack} play={true} style={{width: "300px", height: "200px", zIndex: "99999999999999"}}/>*/}
            {/*<LocalVideoTrack track={localCameraTrack} play={true} style={{width: "300px", height: "200px", zIndex: "99999999999999"}}/>*/}
            {/*<LocalVideoTrack track={localCameraTrack} play={true}/>*/}
            {/*<VideoTrackPagination localTrack={localCameraTrack} remoteTracks={videoTracks} max={4}/>*/}
            {/*{remoteUsers.map(user => (*/}
            {/*    <>*/}
            {/*        <RemoteVideoTrack track={user.videoTrack} play={true}/>*/}
            {/*        <label>User</label>*/}
            {/*    </>*/}
            {/*))}*/}
        </div>
    )
}

export default VideoPlayer
