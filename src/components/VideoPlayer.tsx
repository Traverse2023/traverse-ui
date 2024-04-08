import {useContext, useEffect, useState} from "react";
import {GroupContext} from "../context/group-context.jsx";
import {
    LocalVideoTrack,
    RemoteVideoTrack,
    useLocalCameraTrack,
    usePublish,
    useRemoteUsers,
    useRemoteVideoTracks
} from 'agora-rtc-react'
import {VideoPlayerEnum} from "../hooks/call-hook.js";

const VideoPlayer = () => {

    const { videoPlayerType, setVideoPlayerType } = useContext(GroupContext)

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
    const max = 10

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
        // @ts-ignore
        let x = []
        if (page === 0) {
            x = [<LocalVideoTrack track={localCameraTrack} play={true} style={{width: "300px", height: "200px", zIndex: "99999999999999"}}/>];
        }
        console.log('invoking videoTracks in curr children', remoteUsers)
        for (let i = page * max; i < page * max + max; i++) {
            if (i >= page * max && i < page * max + max && i < remoteUsers.length) {
                console.log('invoking videoTrack', remoteUsers[i])
                console.log('invoking i', i)
                x.push(<RemoteVideoTrack track={remoteUsers[i].videoTrack} play={true}  style={{width: "300px", height: "200px", zIndex: "99999999999999"}}/>);
            }
        }
        // @ts-ignore
        console.log('invoking x', x)
        // @ts-ignore
        return x;
    };

    let videoPlayerStyle = {}

    if (videoPlayerType === VideoPlayerEnum.FIT) {
        videoPlayerStyle = {
            display: "flex", justifyContent: "center",
            alignItems: "center", gap: "10px",
            color: "white",
            flexWrap: "wrap", backgroundColor: 'black'
        }
    } else if (videoPlayerType === VideoPlayerEnum.FULL) {
        videoPlayerStyle = {
            margin: "0 auto",
            display: "flex", justifyContent: "center",
            alignItems: "center", gap: "10px",
            color: "white",
            flexWrap: "wrap", position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black', top: "50%", left: "50%", transform: "translate(-50%, -50%)"
        }
    }

    return (
        // <div style={{margin: "0 auto",
        //     display: "flex", justifyContent: "center",
        //     alignItems: "center", gap: "10px",
        //     color: "white",
        //     flexWrap: "wrap", position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black', top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
        // <div style={{margin: "0 auto",
        //     display: "flex", justifyContent: "center",
        //     alignItems: "center", gap: "10px",
        //     color: "white",
        //     top: "0",
        //     bottom: "0",
        //     right: "calc((100vw - (200px + 240px + 5fr)) / 2)",
        //     flexWrap: "wrap", position: 'absolute', width: '60%', height: '40%', backgroundColor: 'black'}}>
        <div style={videoPlayerStyle}>
            {currentChildren()}
            Page {page + 1}
            {page > 0 && <button style={{color: "black"}} onClick={prev}>Prev</button>}
            {remoteUsers.length+1 > (page + 1) * max && <button style={{color: "white"}} onClick={next}>Next</button>}
            {
                (() => {
                    switch (videoPlayerType){
                        case VideoPlayerEnum.FIT:
                            return <button onClick={() => {setVideoPlayerType(VideoPlayerEnum.FULL)}}>Full Screen</button>
                        case VideoPlayerEnum.FULL:
                            return <button onClick={() => {setVideoPlayerType(VideoPlayerEnum.FIT)}}>Fit Screen</button>
                        default:
                            return null
                    }
                })()
            }
            <button onClick={() => setVideoPlayerType(VideoPlayerEnum.PORTABLE)}>Pop Out</button>

        </div>
    )
}

export default VideoPlayer
